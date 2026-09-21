import PageIntro from "../components/common/PageIntro";
import IndicatorGrid from "../components/economy/IndicatorGrid";
import FeatureLayout from "../components/news/FeatureLayout";
import StoryGrid from "../components/news/StoryGrid";
import NewsState from "../components/news/NewsState";
import SourcesNote from "../components/news/SourcesNote";
import SectionHeading from "../components/common/SectionHeading";
import { fetchNews } from "../lib/api";
import useAsync from "../lib/useAsync";
import useTitle from "../lib/useTitle";

function Economy() {
  useTitle("Economy");
  const state = useAsync(() => fetchNews({ topic: "economy", limit: 24 }), []);

  return (
    <>
      <PageIntro title="Economy"
        description="Inflation, interest rates, growth and the policy decisions behind them." />
      <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
        <SectionHeading title="Key economic figures"
          description="Official figures from the NBS and CBN, with the date each was published." />
        <IndicatorGrid />

        <div className="mt-14">
          <SectionHeading title="Economy news" />
          <NewsState state={state} rows={6}>
            {(stories, data) => (
              <>
                <FeatureLayout stories={stories} />
                {stories.length > 6 && <div className="mt-10"><StoryGrid stories={stories.slice(6)} /></div>}
                <SourcesNote sources={data.sources} />
              </>
            )}
          </NewsState>
        </div>
      </div>
    </>
  );
}

export default Economy;
