const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

const USD_NGN_CACHE_KEY = "finsight_usd_ngn";
const BTC_USD_CACHE_KEY = "finsight_btc_usd";
const GOLD_CACHE_KEY = "finsight_gold";

const CACHE_DURATION = 1000 * 60 * 30;

async function fetchAlphaVantage(params) {
  const url = `${BASE_URL}?${new URLSearchParams({
    ...params,
    apikey: API_KEY,
  })}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Alpha Vantage request failed: ${response.status}`);
  }

  const result = await response.json();

  if (result.Note) {
    throw new Error(result.Note);
  }

  if (result["Error Message"]) {
    throw new Error(result["Error Message"]);
  }

  return result;
}

function calculatePercentChange(current, previous) {
  if (!previous || previous === 0) {
    return null;
  }

  return ((current - previous) / previous) * 100;
}

function getDirection(change) {
  if (change === null || change === undefined) {
    return null;
  }

  if (change > 0) return "up";
  if (change < 0) return "down";

  return "neutral";
}

/* =========================================================
   USD / NGN
========================================================= */

export async function getUsdNgnRate() {
  const cachedData = localStorage.getItem(USD_NGN_CACHE_KEY);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Using cached USD/NGN rate");
      return data;
    }
  }

  console.log("Fetching USD/NGN from Alpha Vantage");

  const result = await fetchAlphaVantage({
    function: "CURRENCY_EXCHANGE_RATE",
    from_currency: "USD",
    to_currency: "NGN",
  });

  const exchangeRate = result["Realtime Currency Exchange Rate"];

  if (!exchangeRate) {
    throw new Error("USD/NGN exchange rate was not returned");
  }

  const rate = Number(exchangeRate["5. Exchange Rate"]);

  const data = {
    pair: "USD/NGN",
    rate,
    change: null,
    direction: null,
    lastRefreshed: exchangeRate["6. Last Refreshed"],
    timezone: exchangeRate["7. Time Zone"],
  };

  localStorage.setItem(
    USD_NGN_CACHE_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );

  return data;
}

/* =========================================================
   BTC / USD
========================================================= */

export async function getBtcUsdRate() {
  const cachedData = localStorage.getItem(BTC_USD_CACHE_KEY);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Using cached BTC/USD rate");
      return data;
    }
  }

  console.log("Fetching BTC/USD from Alpha Vantage");

  const result = await fetchAlphaVantage({
    function: "CURRENCY_EXCHANGE_RATE",
    from_currency: "BTC",
    to_currency: "USD",
  });

  const exchangeRate = result["Realtime Currency Exchange Rate"];

  if (!exchangeRate) {
    throw new Error("BTC/USD exchange rate was not returned");
  }

  const rate = Number(exchangeRate["5. Exchange Rate"]);

  const data = {
    pair: "BTC/USD",
    rate,
    change: null,
    direction: null,
    lastRefreshed: exchangeRate["6. Last Refreshed"],
    timezone: exchangeRate["7. Time Zone"],
  };

  localStorage.setItem(
    BTC_USD_CACHE_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );

  return data;
}

/* =========================================================
   GOLD
========================================================= */

export async function getGoldRate() {
  const cachedData = localStorage.getItem(GOLD_CACHE_KEY);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);

    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log("Using cached Gold rate");
      return data;
    }
  }

  console.log("Fetching Gold from Alpha Vantage");

  /*
   * 1. Get live gold spot price
   */
  const spotResult = await fetchAlphaVantage({
    function: "GOLD_SILVER_SPOT",
    symbol: "GOLD",
  });

  console.log("GOLD SPOT RAW DATA:", spotResult);

  if (!spotResult.price) {
    throw new Error("Gold price was not returned");
  }

  const rate = Number(spotResult.price);

  /*
   * 2. Get historical daily gold prices
   *
   * We use this to calculate the daily percentage change
   * instead of displaying a hardcoded/mock percentage.
   */
  let change = null;
  let direction = null;

  try {
    const historyResult = await fetchAlphaVantage({
      function: "GOLD_SILVER_HISTORY",
      symbol: "GOLD",
      interval: "daily",
    });

    console.log("GOLD HISTORY RAW DATA:", historyResult);

    const history = historyResult.data;

    if (Array.isArray(history) && history.length > 0) {
      const previousClose = Number(history[0].value);

      if (previousClose > 0) {
        change = calculatePercentChange(rate, previousClose);
        direction = getDirection(change);
      }
    }
  } catch (error) {
    console.warn("Gold daily change unavailable:", error);
  }

  const data = {
    pair: "XAU/USD",
    rate,
    change,
    direction,
    lastRefreshed: spotResult.timestamp,
    timezone: spotResult.timezone || "UTC",
  };

  localStorage.setItem(
    GOLD_CACHE_KEY,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );

  return data;
}
