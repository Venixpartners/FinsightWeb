import { useEffect, useRef, useState } from "react";

import MarketTicker from "../components/market/MarketTicker";
import MarketIndices from "../components/market/MarketIndices";
import MarketMovers from "../components/market/MarketMovers";
import StockMarketTable from "../components/market/StockMarketTable";
import ForexCommodities from "../components/market/ForexCommodities";
import MarketNews from "../components/market/MarketNews";

import { mockMarketIndices } from "../data/marketsMockData";
import {
  mockMarketGainers,
  mockMarketLosers,
  mockStocks,
  mockForexCommodities,
} from "../data/marketsMockData";

import { getMarketNews } from "../services/newsService";

import {
  getUsdNgnRate,
  getBtcUsdRate,
  getGoldRate,
} from "../services/marketService";
import { getNgxStocks } from "../services/stockService";

function Markets() {
  const [marketNews, setMarketNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState("");

  const [stocks, setStocks] = useState([]);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const [stocksError, setStocksError] = useState("");

  const [usdNgn, setUsdNgn] = useState(null);
  const [btcUsd, setBtcUsd] = useState(null);
  const [gold, setGold] = useState(null);

  const [loadingMarketData, setLoadingMarketData] = useState(true);

  const lastLoadedAt = useRef(0);
  const loadingRef = useRef(false);

  /* =========================================================
     Stock Market NEWS
  ========================================================= */
  useEffect(() => {
    let isMounted = true;

    async function loadStocks() {
      try {
        setLoadingStocks(true);
        setStocksError("");

        const data = await getNgxStocks();

        if (isMounted) {
          setStocks(data);
        }
      } catch (error) {
        console.error("Failed to load NGX stocks:", error);

        if (isMounted) {
          setStocksError("Unable to load stock data. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoadingStocks(false);
        }
      }
    }

    loadStocks();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================================================
     MARKET NEWS
  ========================================================= */

  useEffect(() => {
    async function loadMarketNews() {
      try {
        setLoadingNews(true);
        setNewsError("");

        const news = await getMarketNews();

        console.log("MARKET NEWS:", news);

        setMarketNews(news);
      } catch (error) {
        console.error("Failed to load market news:", error);

        setNewsError("Unable to load market news at the moment.");
      } finally {
        setLoadingNews(false);
      }
    }

    loadMarketNews();
  }, []);

  /* =========================================================
     LIVE MARKET DATA
  ========================================================= */

  useEffect(() => {
    async function loadMarketData() {
      if (loadingRef.current) {
        return;
      }

      loadingRef.current = true;

      try {
        setLoadingMarketData(true);

        /*
         * USD / NGN
         */
        try {
          const usdNgnData = await getUsdNgnRate();

          console.log("USD/NGN DATA:", usdNgnData);

          setUsdNgn(usdNgnData);
        } catch (error) {
          console.error("Failed to load USD/NGN:", error);
        }

        /*
         * Wait before next Alpha Vantage request
         * to reduce the chance of rate limiting.
         */
        await new Promise((resolve) => setTimeout(resolve, 1200));

        /*
         * BTC / USD
         */
        try {
          const btcUsdData = await getBtcUsdRate();

          console.log("BTC/USD DATA:", btcUsdData);

          setBtcUsd(btcUsdData);
        } catch (error) {
          console.error("Failed to load BTC/USD:", error);
        }

        /*
         * Wait before next request.
         */
        await new Promise((resolve) => setTimeout(resolve, 1200));

        /*
         * GOLD
         */
        try {
          const goldData = await getGoldRate();

          console.log("GOLD DATA:", JSON.stringify(goldData, null, 2));

          setGold(goldData);
        } catch (error) {
          console.error("Failed to load Gold:", error);
        }

        lastLoadedAt.current = Date.now();
      } catch (error) {
        console.error("Failed to load market data:", error);
      } finally {
        loadingRef.current = false;
        setLoadingMarketData(false);
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState !== "visible") {
        return;
      }

      const timeSinceLastLoad = Date.now() - lastLoadedAt.current;

      /*
       * Refresh after 30 minutes away from the page.
       */
      if (timeSinceLastLoad >= 1000 * 60 * 30) {
        console.log("Market page became active — refreshing market data");

        loadMarketData();
      }
    }

    loadMarketData();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  /* =========================================================
     FOREX / COMMODITIES CARDS
  ========================================================= */

  const forexCommodities = mockForexCommodities.map((asset) => {
    if (asset.symbol === "USD/NGN") {
      if (!usdNgn) {
        return {
          ...asset,
          value: "Loading...",
          change: null,
          direction: null,
        };
      }

      return {
        ...asset,

        value: `₦${usdNgn.rate.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,

        /*
         * We do not display a fake change.
         */
        change: null,
        direction: null,
      };
    }

    if (asset.symbol === "XAU/USD") {
      if (!gold) {
        return {
          ...asset,
          value: "Loading...",
          change: null,
          direction: null,
        };
      }

      return {
        ...asset,

        value: `$${gold.rate.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,

        change:
          typeof gold.change === "number"
            ? `${gold.change >= 0 ? "+" : ""}${gold.change.toFixed(2)}%`
            : null,

        direction: typeof gold.change === "number" ? gold.direction : null,
      };
    }

    /*
     * Anything still using mock data is explicitly
     * marked unavailable rather than presented as live.
     */
    return {
      ...asset,
      value: "Data unavailable",
      change: null,
      direction: null,
    };
  });

  /* =========================================================
     TOP LIVE TICKER
  ========================================================= */

  const tickerMarkets = [
    {
      symbol: "USDNGN",
      name: "USD/NGN",

      value: usdNgn
        ? `₦${usdNgn.rate.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "Loading...",

      change: null,
      direction: null,
    },

    {
      symbol: "BTCUSD",
      name: "BTC/USD",

      value: btcUsd
        ? `$${btcUsd.rate.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "Loading...",

      change: null,
      direction: null,
    },

    {
      symbol: "GOLD",
      name: "Gold",

      value: gold
        ? `$${gold.rate.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "Loading...",

      change:
        typeof gold?.change === "number"
          ? `${gold.change >= 0 ? "+" : ""}${gold.change.toFixed(2)}%`
          : null,

      direction: typeof gold?.change === "number" ? gold.direction : null,
    },

    /*
     * These remain unavailable until we connect
     * an authoritative source.
     *
     * DO NOT use the old mock values.
     */
    {
      symbol: "SP500",
      name: "S&P 500",
      value: "Data unavailable",
      change: null,
      direction: null,
    },

    {
      symbol: "DOW",
      name: "Dow 30",
      value: "Data unavailable",
      change: null,
      direction: null,
    },

    {
      symbol: "NASDAQ",
      name: "Nasdaq",
      value: "Data unavailable",
      change: null,
      direction: null,
    },
  ];

  return (
    <div className="bg-slate-50">
      <MarketTicker markets={tickerMarkets} />

      <main className="mx-auto max-w-350 px-7 py-10">
        <MarketIndices indices={mockMarketIndices} />

        <MarketMovers gainers={mockMarketGainers} losers={mockMarketLosers} />

        <StockMarketTable
          stocks={stocks}
          loading={loadingStocks}
          error={stocksError}
        />

        <ForexCommodities assets={forexCommodities} />

        <MarketNews
          articles={marketNews}
          loading={loadingNews}
          error={newsError}
        />
      </main>
    </div>
  );
}

export default Markets;
