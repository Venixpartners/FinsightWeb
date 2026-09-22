import { Link } from "react-router-dom";
import { BriefcaseBusiness, Building2, ChartNoAxesCombined, Landmark } from "lucide-react";
import CategoryCard from "../components/categories/CategoryCard";
import FeatureLayout from "../components/news/FeatureLayout";
import StoryGrid from "../components/news/StoryGrid";
import NewsState from "../components/news/NewsState";
import SourcesNote from "../components/news/SourcesNote";
import SectionHeading from "../components/common/SectionHeading";
import RatesPanel from "../components/market/RatesPanel";
import IndicatorGrid from "../components/economy/IndicatorGrid";
import Newsletter from "../components/newsletter/NewsLetter";
import { fetchNews } from "../lib/api";
import useAsync from "../lib/useAsync";
import useTitle from "../lib/useTitle";
import { SITE } from "../config/site";

const categories = [
  { name: "Business", description: "Deals, sectors and the people running Nigerian business.", icon: BriefcaseBusiness, path: "/business" },
  { name: "Markets", description: "Naira, stocks, bonds, oil and crypto.", icon: ChartNoAxesCombined, path: "/markets" },
  { name: "Economy", description: "Inflation, interest rates, growth and policy.", icon: Landmark, path: "/economy" },
  { name: "Companies", description: "Results, appointments and corporate moves.", icon: Building2, path: "/companies" },
];

const quickTopics = ["Inflation", "CBN", "Naira", "NGX", "Oil", "Banks", "Tax", "Dangote"];

function Home() {
  useTitle(null);
  const state = useAsync(() => fetchNews({ topic: "all", limit: 18 }), []);

  return (
    <div className="mx-auto max-w-350 px-5 py-8 sm:px-7">
      <h1 className="sr-only">Nigerian business, markets and economy news</h1>
      <nav aria-label="Quick topics" className="mb-8 flex items-center gap-2 overflow-x-auto">
        <span className="shrink-0 text-sm font-semibold text-slate-700">Quick topics</span>
        {quickTopics.map((t) => (
          <Link key={t} to={`/search?q=${encodeURIComponent(t)}`}
            className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700">
            {t}
          </Link>
        ))}
      </nav>

      <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <section aria-labelledby="top-stories">
          <h2 id="top-stories" className="sr-only">Top stories</h2>
          <NewsState state={state} rows={6}>
            {(stories, data) => (
              <>
                <FeatureLayout stories={stories} />
                {stories.length > 6 && (
                  <div className="mt-10">
                    <SectionHeading title="More stories" />
                    <StoryGrid stories={stories.slice(6, 12)} />
                  </div>
                )}
                <SourcesNote sources={data.sources} />
              </>
            )}
          </NewsState>
        </section>

        <aside className="space-y-6">
          <RatesPanel />
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-extrabold text-slate-950">FinSight by SMS</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The day's key money stories in one text. ₦{SITE.sms.pricePerDay} a day on {SITE.sms.network}. Other
              networks can join the waitlist.
            </p>
            <Link to="/subscribe?from=home&trigger=home_sidebar"
              className="mt-4 inline-flex rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
              Get SMS updates
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <SectionHeading title="Key economic figures"
          description="The latest official numbers, with the date each was published."
          action={<Link to="/economy" className="shrink-0 py-2 text-sm font-semibold text-blue-700">Economy news</Link>} />
        <IndicatorGrid />
      </section>

      <section className="mt-14">
        <SectionHeading title="Explore sections" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => <CategoryCard key={c.name} {...c} />)}
        </div>
      </section>

      <Newsletter sourcePage="home" />
    </div>
  );
}

export default Home;
