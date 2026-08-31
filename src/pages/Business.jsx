import MarketTicker from "../components/market/MarketTicker";

//import BusinessSubNav from "../components/business/BusinessSubNav";
import BusinessFeatured from "../components/business/BusinessFeatured";
import BusinessNewsGrid from "../components/business/BusinessNewsGrid";
import BusinessSpotlight from "../components/business/BusinessSpotlight";

import { mockMarkets } from "../data/mockData";

import {
  mockBusinessFeatured,
  mockBusinessLatest,
  mockBusinessSpotlight,
} from "../data/businessMockData";

function Business() {
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

      {/* Business navigation 
      <BusinessSubNav />*/}

      <main className="mx-auto max-w-350 px-5 pb-16 sm:px-7">
        {/* Featured */}
        <BusinessFeatured stories={mockBusinessFeatured} />

        {/* Latest */}
        <BusinessNewsGrid articles={mockBusinessLatest} />

        {/* Spotlight */}
        <BusinessSpotlight spotlight={mockBusinessSpotlight} />
      </main>
    </div>
  );
}

export default Business;
