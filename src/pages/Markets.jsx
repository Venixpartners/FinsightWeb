import PageIntro from "../components/common/PageIntro";
import RatesPanel from "../components/market/RatesPanel";
import FeatureLayout from "../components/news/FeatureLayout";
import StoryGrid from "../components/news/StoryGrid";
import NewsState from "../components/news/NewsState";
import SourcesNote from "../components/news/SourcesNote";
import SectionHeading from "../components/common/SectionHeading";
import { fetchNews } from "../lib/api";
import useAsync from "../lib/useAsync";
import useTitle from "../lib/useTitle";

function Markets() {
  useTitle();
  const state = useAsync(() => fetchNews({ topic: "markets", limit: 24 }), []);

  return (
    <>
      <PageIntro title="Markets" description="The naira, Nigerian stocks, bonds, oil and crypto." />
      <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
        <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
          <section>
            <SectionHeading title="Market news" />
            <NewsState state={state} rows={6}>
              {(stories, data) => (
                <>
                  <FeatureLayout stories={stories} listCount={4} />
                  {stories.length > 5 && <div className="mt-10"><StoryGrid stories={stories.slice(5)} /></div>}
                  <SourcesNote sources={data.sources} />
                </>
              )}
            </NewsState>
          </section>
          <aside className="space-y-6">
            <RatesPanel />
            <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
              <h2 className="text-base font-extrabold text-slate-950">NGX share prices</h2>
              <p className="mt-2">
                Live Nigerian Exchange prices are not on FinSight yet. For official prices, visit{" "}
                <a href="https://ngxgroup.com" target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline">
                  ngxgroup.com
                </a>.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default Markets;
