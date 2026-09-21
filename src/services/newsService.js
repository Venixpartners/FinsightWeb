const BASE_URL = "/api/gnews";

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const BUSINESS_CACHE_KEY = "finsight_business_news";
const NIGERIA_ECONOMY_CACHE_KEY = "finsight_nigeria_economy_news";
const GLOBAL_ECONOMY_CACHE_KEY = "finsight_global_economy_news";
const MARKET_NEWS_CACHE_KEY = "finsight_market_news";

/**
 * Fetch news from our Vercel API route.
 *
 * The GNews API key is NOT exposed to the browser.
 * Vercel handles the request to GNews server-side.
 */
async function fetchGNews(query, max = 10) {
  const url =
    `${BASE_URL}?` +
    new URLSearchParams({
      q: query,
      max: String(max),
    });

  const response = await fetch(url);

  if (!response.ok) {
    let errorData = {};

    try {
      errorData = await response.json();
    } catch {
      // Ignore JSON parsing errors
    }

    console.error("GNews API error:", errorData);

    throw new Error(
      errorData.errors?.[0] ||
        errorData.message ||
        errorData.error ||
        `Failed to fetch news (${response.status})`,
    );
  }

  return response.json();
}

export async function getBusinessNews() {
  // Check cache first
  const cachedNews = localStorage.getItem(BUSINESS_CACHE_KEY);

  if (cachedNews) {
    const { data, timestamp } = JSON.parse(cachedNews);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Using cached business news");

      return data;
    }
  }

  console.log("Fetching business news from GNews");

  const result = await fetchGNews(
    "business Nigeria OR finance OR companies",
    10,
  );

  const articles = result.articles.map((article, index) => ({
    id: `${article.publishedAt}-${index}`,
    title: article.title,
    description: article.description || "",
    image: article.image || "",
    publishedAt: article.publishedAt,
    category: "Business",
    source: article.source?.name || "Unknown",
    url: article.url,
  }));

  // Save to cache
  localStorage.setItem(
    BUSINESS_CACHE_KEY,
    JSON.stringify({
      data: articles,
      timestamp: Date.now(),
    }),
  );

  return articles;
}

export async function getNigeriaEconomyNews() {
  const cachedNews = localStorage.getItem(NIGERIA_ECONOMY_CACHE_KEY);

  if (cachedNews) {
    const { data, timestamp } = JSON.parse(cachedNews);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Using cached Nigeria economy news");

      return data;
    }
  }

  console.log("Fetching Nigeria economy news from GNews");

  const result = await fetchGNews(
    'Nigeria AND (economy OR inflation OR CBN OR GDP OR "interest rates")',
    5,
  );

  const articles = result.articles.map((article, index) => ({
    id: `nigeria-${article.publishedAt}-${index}`,
    title: article.title,
    description: article.description || "",
    image: article.image || "",
    publishedAt: article.publishedAt,
    category: "Nigeria Economy",
    source: article.source?.name || "Unknown",
    url: article.url,
  }));

  localStorage.setItem(
    NIGERIA_ECONOMY_CACHE_KEY,
    JSON.stringify({
      data: articles,
      timestamp: Date.now(),
    }),
  );

  return articles;
}

export async function getGlobalEconomyNews() {
  const cachedNews = localStorage.getItem(GLOBAL_ECONOMY_CACHE_KEY);

  if (cachedNews) {
    const { data, timestamp } = JSON.parse(cachedNews);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Using cached global economy news");

      return data;
    }
  }

  console.log("Fetching global economy news from GNews");

  const result = await fetchGNews(
    "(global economy OR world economy OR IMF OR World Bank OR inflation OR GDP)",
    5,
  );

  const articles = result.articles.map((article, index) => ({
    id: `global-${article.publishedAt}-${index}`,
    title: article.title,
    description: article.description || "",
    image: article.image || "",
    publishedAt: article.publishedAt,
    category: "Global Economy",
    source: article.source?.name || "Unknown",
    url: article.url,
  }));

  localStorage.setItem(
    GLOBAL_ECONOMY_CACHE_KEY,
    JSON.stringify({
      data: articles,
      timestamp: Date.now(),
    }),
  );

  return articles;
}

export async function getMarketNews() {
  const cachedNews = localStorage.getItem(MARKET_NEWS_CACHE_KEY);

  if (cachedNews) {
    const { data, timestamp } = JSON.parse(cachedNews);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Using cached market news");

      return data;
    }
  }

  console.log("Fetching market news from GNews");

  const result = await fetchGNews(
    "(stock market OR stock exchange OR equities OR forex OR commodities)",
    10,
  );

  const articles = result.articles.map((article, index) => ({
    id: `market-${article.publishedAt}-${index}`,
    title: article.title,
    description: article.description || "",
    image: article.image || "",
    publishedAt: article.publishedAt,
    category: "Markets",
    source: article.source?.name || "Unknown",
    url: article.url,
  }));

  localStorage.setItem(
    MARKET_NEWS_CACHE_KEY,
    JSON.stringify({
      data: articles,
      timestamp: Date.now(),
    }),
  );

  return articles;
}
