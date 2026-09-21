import { useEffect, useState } from "react";

import MarketTicker from "../components/market/MarketTicker";

import BusinessSubNav from "../components/business/BusinessSubNav";
import BusinessFeatured from "../components/business/BusinessFeatured";
import BusinessNewsGrid from "../components/business/BusinessNewsGrid";
import BusinessSpotlight from "../components/business/BusinessSpotlight";

import { mockMarkets } from "../data/mockData";

import { getBusinessNews } from "../services/newsService";

function Business() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBusinessNews() {
      try {
        setLoading(true);

        const news = await getBusinessNews();

        setArticles(news);
      } catch (error) {
        console.error("Failed to load business news:", error);

        setError("Unable to load business news at the moment.");
      } finally {
        setLoading(false);
      }
    }

    loadBusinessNews();
  }, []);

  const featuredStories = articles.slice(0, 4);

  const latestStories = articles.slice(4, 10);

  const spotlightStory = articles[0];

  return (
    <div className="bg-slate-50">
      {/* Market ticker */}
      <MarketTicker markets={mockMarkets} />

      {/* Business heading */}
      <section className="bg-white">
        <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Finsight Business
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Business
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            The latest business news, company developments, startup activity,
            financial updates and market-moving stories from Nigeria and around
            the world.
          </p>
        </div>
      </section>

      {/* Business navigation */}
      <BusinessSubNav />

      <main className="mx-auto max-w-350 px-5 pb-16 sm:px-7">
        {loading && (
          <div className="py-16 text-center text-sm text-slate-500">
            Loading business news...
          </div>
        )}

        {error && (
          <div className="py-16 text-center text-sm text-red-500">{error}</div>
        )}

        {!loading && !error && articles.length > 0 && (
          <>
            {/* Featured */}
            <BusinessFeatured stories={featuredStories} />

            {/* Latest */}
            <BusinessNewsGrid articles={latestStories} />

            {/* Spotlight */}
            <BusinessSpotlight spotlight={spotlightStory} />
          </>
        )}
      </main>
    </div>
  );
}

export default Business;
