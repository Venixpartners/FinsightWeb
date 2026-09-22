import PageIntro from "../components/common/PageIntro";
import FeatureLayout from "../components/news/FeatureLayout";
import StoryGrid from "../components/news/StoryGrid";
import NewsState from "../components/news/NewsState";
import SourcesNote from "../components/news/SourcesNote";
import { fetchNews } from "../lib/api";
import useAsync from "../lib/useAsync";
import useTitle from "../lib/useTitle";

function Companies() {
  useTitle();
  const state = useAsync(() => fetchNews({ topic: "companies", limit: 24 }), []);

  return (
    <>
      <PageIntro title="Companies"
        description="Results, appointments, deals and expansion news from companies operating in Nigeria." />
      <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
        <h2 className="sr-only">Company news</h2>
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
    </>
  );
}

export default Companies;
