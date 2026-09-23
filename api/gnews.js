export default async function handler(req, res) {
  try {
    const { q } = req.query;
    // Cap results and query length so the key cannot be drained by large requests.
    const max = String(Math.min(Math.max(parseInt(req.query.max, 10) || 10, 1), 10));

    if (!q) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const url = new URL("https://gnews.io/api/v4/search");

    url.searchParams.set("q", String(q).slice(0, 200));
    url.searchParams.set("lang", "en");
    url.searchParams.set("max", max);
    url.searchParams.set("apikey", process.env.GNEWS_API_KEY);

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // Shared edge cache so repeat visitors do not each use a GNews request.
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600");
    return res.status(200).json(data);
  } catch (error) {
    console.error("GNews API error:", error);

    return res.status(500).json({
      error: "Failed to fetch news",
    });
  }
}
