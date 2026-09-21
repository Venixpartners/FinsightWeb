const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const BASE_URL = "https://gnews.io/api/v4";

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const BUSINESS_CACHE_KEY = "finsight_business_news";
const NIGERIA_ECONOMY_CACHE_KEY = "finsight_nigeria_economy_news";
const GLOBAL_ECONOMY_CACHE_KEY = "finsight_global_economy_news";
// 30 minutes

export async function getBusinessNews() {
  // Check cache first
  const cachedNews = localStorage.getItem(BUSINESS_CACHE_KEY);

  if (cachedNews) {
    const { data, timestamp } = JSON.parse(cachedNews);

    const now = Date.now();

    // Use cached data if it is still valid
    if (now - timestamp < CACHE_DURATION) {
      console.log("Using cached business news");

      return data;
    }
  }

  console.log("Fetching business news from GNews");

  const url =
    `${BASE_URL}/search?` +
    new URLSearchParams({
      q: "business Nigeria OR finance OR companies",
      lang: "en",
      max: "10",
      apikey: API_KEY,
    });

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    console.error("GNews API error:", errorData);

    throw new Error(
      errorData.errors?.[0] ||
        errorData.message ||
        "Failed to fetch business news",
    );
  }

  const result = await response.json();

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

  const url =
    `${BASE_URL}/search?` +
    new URLSearchParams({
      q: 'Nigeria AND (economy OR inflation OR CBN OR GDP OR "interest rates")',
      lang: "en",
      max: "5",
      apikey: API_KEY,
    });

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    console.error("GNews Nigeria Economy API error:", errorData);

    throw new Error(
      errorData.errors?.[0] ||
        errorData.message ||
        `Failed to fetch Nigeria economy news (${response.status})`,
    );
  }

  const data = await response.json();

  const articles = data.articles.map((article, index) => ({
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

  const url =
    `${BASE_URL}/search?` +
    new URLSearchParams({
      q: "(global economy OR world economy OR IMF OR World Bank OR inflation OR GDP)",
      lang: "en",
      max: "5",
      apikey: API_KEY,
    });

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    console.error("GNews Global Economy API error:", errorData);

    throw new Error(
      errorData.errors?.[0] ||
        errorData.message ||
        `Failed to fetch global economy news (${response.status})`,
    );
  }

  const data = await response.json();

  const articles = data.articles.map((article, index) => ({
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

const MARKET_NEWS_CACHE_KEY = "finsight_market_news";

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

  const url =
    `${BASE_URL}/search?` +
    new URLSearchParams({
      q: "(stock market OR stock exchange OR equities OR forex OR commodities)",
      lang: "en",
      max: "10",
      apikey: API_KEY,
    });

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();

    console.error("GNews Market API error:", errorData);

    throw new Error(
      errorData.errors?.[0] ||
        errorData.message ||
        `Failed to fetch market news (${response.status})`,
    );
  }

  const data = await response.json();

  const articles = data.articles.map((article, index) => ({
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
