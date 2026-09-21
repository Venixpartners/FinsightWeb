import { getAllStories, filterStories } from "./_lib/feeds.js";

const TOPICS = new Set(["all", "business", "economy", "markets", "companies"]);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const topic = TOPICS.has(req.query.topic) ? req.query.topic : "all";
  const focus = typeof req.query.focus === "string" ? req.query.focus.slice(0, 30) : undefined;
  const q = typeof req.query.q === "string" ? req.query.q.slice(0, 80) : undefined;
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 60);

  try {
    const { items, sources, at } = await getAllStories();
    const stories = filterStories(items, { topic, focus, q }).slice(0, limit);

    // Shared CDN cache: every visitor gets the same cached response.
    res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=1800");
    return res.status(200).json({ topic, stories, sources, updatedAt: new Date(at).toISOString() });
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ error: "News sources are unavailable right now." });
  }
}
