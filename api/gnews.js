export default async function handler(req, res) {
  try {
    const { q, max = "10" } = req.query;

    if (!q) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const url = new URL("https://gnews.io/api/v4/search");

    url.searchParams.set("q", q);
    url.searchParams.set("lang", "en");
    url.searchParams.set("max", max);
    url.searchParams.set("apikey", process.env.GNEWS_API_KEY);

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("GNews API error:", error);

    return res.status(500).json({
      error: "Failed to fetch news",
    });
  }
}
