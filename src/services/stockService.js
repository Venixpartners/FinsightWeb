const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

const CACHE_KEY = "finsight_ngx_stocks";
const CACHE_DURATION = 1000 * 60 * 30;

// These are the symbols currently used in your Finsight table.
// Their availability on Alpha Vantage still needs to be confirmed.
const stockList = [
  { symbol: "DANGCEM", name: "Dangote Cement" },
  { symbol: "GTCO", name: "Guaranty Trust Holding" },
  { symbol: "MTNN", name: "MTN Nigeria" },
  { symbol: "ZENITH", name: "Zenith Bank" },
  { symbol: "AIRTELAFRI", name: "Airtel Africa" },
  { symbol: "UBA", name: "United Bank for Africa" },
  { symbol: "FBNH", name: "FBN Holdings" },
  { symbol: "BUAFOODS", name: "BUA Foods" },
];

function formatNaira(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return "Data unavailable";
  }

  return `₦${value.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatVolume(value) {
  if (value === null || value === undefined || value === "") {
    return "Data unavailable";
  }

  const volume = Number(value);

  if (!Number.isFinite(volume)) {
    return "Data unavailable";
  }

  return volume.toLocaleString("en-NG");
}

function getDirection(change) {
  if (change > 0) return "up";
  if (change < 0) return "down";
  return "neutral";
}

async function fetchGlobalQuote(symbol) {
  const url = new URL(BASE_URL);

  url.search = new URLSearchParams({
    function: "GLOBAL_QUOTE",
    symbol,
    apikey: API_KEY,
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const result = await response.json();

  if (result.Note) {
    throw new Error(result.Note);
  }

  if (result.Information) {
    throw new Error(result.Information);
  }

  if (result["Error Message"]) {
    throw new Error(result["Error Message"]);
  }

  return result["Global Quote"];
}

async function fetchStock(stock) {
  try {
    const quote = await fetchGlobalQuote(stock.symbol);

    if (!quote || !quote["05. price"]) {
      return {
        ...stock,
        price: "Data unavailable",
        change: null,
        direction: null,
        volume: "Data unavailable",
        latestTradingDay: null,
        available: false,
      };
    }

    const price = Number(quote["05. price"]);
    const changeValue = Number(quote["09. change"]);
    const changePercent = quote["10. change percent"];

    const validChange =
      Number.isFinite(changeValue) &&
      typeof changePercent === "string" &&
      changePercent.trim() !== "";

    return {
      ...stock,
      price: formatNaira(price),
      change: validChange ? changePercent.trim() : null,
      direction: validChange ? getDirection(changeValue) : null,
      volume: formatVolume(quote["06. volume"]),
      latestTradingDay: quote["07. latest trading day"] || null,
      available: true,
    };
  } catch (error) {
    console.error(`Unable to fetch ${stock.symbol}:`, error);

    return {
      ...stock,
      price: "Data unavailable",
      change: null,
      direction: null,
      volume: "Data unavailable",
      latestTradingDay: null,
      available: false,
    };
  }
}

export async function getNgxStocks() {
  if (!API_KEY) {
    throw new Error(
      "Alpha Vantage API key is missing. Check your environment variables.",
    );
  }

  // Use cached results when they are still fresh.
  try {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);

      if (Array.isArray(data) && Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
  } catch (error) {
    console.warn("Could not read stock cache:", error);
  }

  // Request each stock sequentially to avoid sending a burst of requests.
  const stocks = [];

  for (const stock of stockList) {
    const result = await fetchStock(stock);
    stocks.push(result);

    // Small pause between API requests.
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: stocks,
        timestamp: Date.now(),
      }),
    );
  } catch (error) {
    console.warn("Could not save stock cache:", error);
  }

  return stocks;
}
