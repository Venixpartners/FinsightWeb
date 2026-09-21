import { useEffect, useState } from "react";

import MarketTicker from "../components/market/MarketTicker";
import EconomicIndicators from "../components/economy/EconomicIndicators";
import NigeriaEconomy from "../components/economy/NigeriaEconomy";
import GlobalEconomy from "../components/economy/GlobalEconomy";
import EconomicSpotlight from "../components/economy/EconomicSpotlight";
import LatestEconomyNews from "../components/economy/LatestEconomyNews";

import { mockMarkets } from "../data/mockData";
import { mockEconomicIndicators } from "../data/economyMockData";

import {
  getNigeriaEconomyNews,
  getGlobalEconomyNews,
} from "../services/newsService";

function Economy() {
  const [nigeriaArticles, setNigeriaArticles] = useState([]);
  const [globalArticles, setGlobalArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEconomyNews() {
      try {
        setLoading(true);
        setError("");

        const nigeriaNews = await getNigeriaEconomyNews();

        setNigeriaArticles(nigeriaNews);

        // GNews free plan requires requests to be spaced out.
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const globalNews = await getGlobalEconomyNews();

        setGlobalArticles(globalNews);

        console.log("NIGERIA ECONOMY:", nigeriaNews);
        console.log("GLOBAL ECONOMY:", globalNews);
      } catch (error) {
        console.error("Failed to load economy news:", error);

        setError("Unable to load economy news at the moment.");
      } finally {
        setLoading(false);
      }
    }

    loadEconomyNews();
  }, []);

  const spotlightArticle = nigeriaArticles[0];

  const latestArticles = [
    ...nigeriaArticles.slice(1),
    ...globalArticles.slice(2),
  ].slice(0, 5);

  return (
    <div className="bg-slate-50">
      {/* Market ticker */}
      <MarketTicker markets={mockMarkets} />

      {/* Economy heading */}
      <section className="bg-white">
        <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Finsight Economy
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Economy
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Follow economic developments, key indicators, policy decisions and
            trends shaping Nigeria and the global economy.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-350 px-5 pb-16 sm:px-7">
        {/* Economic indicators remain local/mock for now */}
        <EconomicIndicators indicators={mockEconomicIndicators} />

        {loading && (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading economy news...
          </div>
        )}

        {error && (
          <div className="py-16 text-center text-sm text-red-500">{error}</div>
        )}

        {!loading && !error && (
          <>
            <NigeriaEconomy articles={nigeriaArticles} />

            <GlobalEconomy articles={globalArticles} />

            <EconomicSpotlight spotlight={spotlightArticle} />

            <LatestEconomyNews articles={latestArticles} />
          </>
        )}
      </main>
    </div>
  );
}

export default Economy;
