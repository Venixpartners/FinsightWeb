import { XMLParser } from "fast-xml-parser";

// Publisher feeds. A feed that fails or times out is skipped, never fatal.
export const FEEDS = [
  { source: "Nairametrics", url: "https://nairametrics.com/feed/" },
  { source: "BusinessDay", url: "https://businessday.ng/feed/" },
  { source: "Premium Times", url: "https://www.premiumtimesng.com/category/business/feed" },
  { source: "Business News Nigeria", url: "https://businessnews.com.ng/feed/" },
  { source: "Channels TV", url: "https://www.channelstv.com/category/business/feed/" },
  { source: "TheCable", url: "https://www.thecable.ng/category/business/feed" },
];

const TOPIC_PATTERNS = {
  economy:
    /\b(inflation|cpi|gdp|cbn|central bank|mpc|monetary|interest rate|naira|budget|tax|revenue|debt|imf|world bank|nbs|economy|economic|fiscal|reserves|unemployment|trade|exports?|imports?)\b/i,
  markets:
    /\b(ngx|stock|stocks|shares?|equit(y|ies)|market cap|bonds?|treasury|t-bills?|forex|fx|naira|dollar|exchange rate|crude|brent|oil price|gold|bitcoin|crypto|investors?|dividend|ipo|listing)\b/i,
  companies:
    /\b(plc|ltd|limited|company|companies|firm|ceo|md|board|profit|revenue|earnings|results|half year|h1|q[1-4]|acquisition|merger|dividend|appoints?|expansion|subsidiary|bank|telecoms?|mtn|airtel|dangote|bua|zenith|gtco|access|uba|first bank|seplat|nestle)\b/i,
};

export const BUSINESS_FOCUS = {
  finance: /\b(bank|banks|banking|fintech|loan|credit|insurance|pension|capital)\b/i,
  energy: /\b(oil|gas|crude|refinery|power|electricity|energy|nnpc|petrol|pms|solar)\b/i,
  startups: /\b(startup|start up|founder|funding|venture|seed|series [a-d]|fintech|tech)\b/i,
  retail: /\b(retail|consumer|fmcg|prices?|food|shoppers?|supermarket|e commerce|ecommerce)\b/i,
  manufacturing: /\b(manufactur\w*|factory|factories|industrial|cement|steel|production|man\b)\b/i,
  telecoms: /\b(telecom\w*|mtn|airtel|glo|9mobile|ncc|broadband|data|spectrum)\b/i,
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
  processEntities: true,
  htmlEntities: true,
});

function text(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return text(value[0]);
  if (typeof value === "object") return text(value["#text"] ?? value["@_href"] ?? "");
  return "";
}

function decodeEntities(input) {
  return input
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&hellip;/g, "…")
    .replace(/&[lr]squo;/g, "'")
    .replace(/&[lr]dquo;/g, '"')
    .replace(/&ndash;|&mdash;/g, ", ");
}

function stripHtml(html) {
  return decodeEntities(String(html || "").replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\s*The post .* appeared first on .*$/i, "")
    .trim();
}

function truncate(value, max) {
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
}

function firstImage(item) {
  const media = item["media:content"] || item["media:thumbnail"];
  const mediaList = Array.isArray(media) ? media : media ? [media] : [];
  for (const m of mediaList) {
    if (m?.["@_url"] && !/\.(mp4|mp3)$/i.test(m["@_url"])) return m["@_url"];
  }
  const enclosure = Array.isArray(item.enclosure) ? item.enclosure[0] : item.enclosure;
  if (enclosure?.["@_url"] && /^image\//.test(enclosure["@_type"] || "image/")) {
    return enclosure["@_url"];
  }
  const html = text(item["content:encoded"]) + text(item.description);
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : "";
}

function safeUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.href : "";
  } catch {
    return "";
  }
}

export function parseFeed(xml, source) {
  const doc = parser.parse(xml);
  const channel = doc?.rss?.channel;
  const rawItems = channel?.item ?? doc?.feed?.entry ?? [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  return items
    .map((item) => {
      const title = stripHtml(text(item.title));
      const link = safeUrl(text(item.link) || text(item.guid));
      const published = new Date(text(item.pubDate) || text(item.published) || text(item.updated));
      const description = truncate(stripHtml(text(item.description) || text(item.summary)), 220);
      const image = safeUrl(firstImage(item));
      if (!title || !link) return null;
      return {
        id: link,
        title,
        description,
        url: link,
        image,
        source,
        publishedAt: Number.isNaN(published.getTime()) ? null : published.toISOString(),
      };
    })
    .filter(Boolean);
}

async function fetchFeed(feed, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(feed.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; FinSightNews/1.0)",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseFeed(await response.text(), feed.source);
  } finally {
    clearTimeout(timer);
  }
}

function normaliseTitle(title) {
  return title.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

// Optional extra source. Used only when the GNews key is set in Vercel.
async function fetchGNews() {
  const key = process.env.GNEWS_API_KEY;
  if (!key) return [];
  const url = new URL("https://gnews.io/api/v4/search");
  url.search = new URLSearchParams({
    q: "Nigeria AND (economy OR business OR naira OR CBN OR stocks)",
    lang: "en",
    max: "10",
    apikey: key,
  });
  const response = await fetch(url);
  if (!response.ok) throw new Error(`GNews HTTP ${response.status}`);
  const data = await response.json();
  return (data.articles || [])
    .map((a) => ({
      id: safeUrl(a.url),
      title: stripHtml(a.title),
      description: truncate(stripHtml(a.description), 220),
      url: safeUrl(a.url),
      image: safeUrl(a.image || ""),
      source: a.source?.name || "GNews",
      publishedAt: a.publishedAt || null,
    }))
    .filter((a) => a.title && a.url);
}

let memoryCache = { at: 0, items: [], sources: [] };
const MEMORY_TTL = 5 * 60 * 1000;

export async function getAllStories({ fetchImpl } = {}) {
  if (Date.now() - memoryCache.at < MEMORY_TTL && memoryCache.items.length) {
    return memoryCache;
  }

  const loader = fetchImpl || fetchFeed;
  const results = await Promise.allSettled([
    ...FEEDS.map((feed) => loader(feed)),
    fetchImpl ? Promise.resolve([]) : fetchGNews(),
  ]);

  const seen = new Set();
  const items = [];
  const sources = [];

  results.forEach((result, index) => {
    if (result.status !== "fulfilled") return;
    if (FEEDS[index]) sources.push(FEEDS[index].source);
    for (const story of result.value) {
      if (!FEEDS[index] && !sources.includes(story.source)) sources.push(story.source);
      const key = normaliseTitle(story.title);
      if (seen.has(key)) continue;
      seen.add(key);
      items.push(story);
    }
  });

  items.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  if (items.length) memoryCache = { at: Date.now(), items, sources };
  return { at: Date.now(), items, sources };
}

export function filterStories(items, { topic = "all", focus, q } = {}) {
  let list = items;

  if (topic && topic !== "all" && topic !== "business" && TOPIC_PATTERNS[topic]) {
    const pattern = TOPIC_PATTERNS[topic];
    list = list.filter((s) => pattern.test(`${s.title} ${s.description}`));
  }

  if (focus && BUSINESS_FOCUS[focus]) {
    const pattern = BUSINESS_FOCUS[focus];
    list = list.filter((s) => pattern.test(`${s.title} ${s.description}`));
  }

  if (q) {
    const terms = q
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 1)
      .slice(0, 6);
    if (terms.length) {
      list = list.filter((s) => {
        const haystack = `${s.title} ${s.description}`.toLowerCase();
        return terms.every((t) => haystack.includes(t));
      });
    }
  }

  return list;
}
