import { useSearchParams } from "react-router-dom";
import PageIntro from "../components/common/PageIntro";
import StoryGrid from "../components/news/StoryGrid";
import NewsState from "../components/news/NewsState";
import SourcesNote from "../components/news/SourcesNote";
import { fetchNews } from "../lib/api";
import useAsync from "../lib/useAsync";
import useTitle from "../lib/useTitle";

function Search() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();
  useTitle(q ? `Search: ${q}` : "Search");
  const state = useAsync(
    () => (q ? fetchNews({ topic: "all", q, limit: 30 }) : Promise.resolve({ stories: [] })),
    [q],
  );

  return (
    <>
      <PageIntro title={q ? `Results for "${q}"` : "Search"}
        description="Searches the headlines and summaries FinSight has collected over roughly the last few days." />
      <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
        {q ? (
          <NewsState state={state} rows={6} emptyText={`No recent stories mention "${q}".`}>
            {(stories, data) => (
              <>
                <StoryGrid stories={stories} />
                <SourcesNote sources={data.sources} />
              </>
            )}
          </NewsState>
        ) : (
          <p className="text-sm text-slate-600">Type a word or name in the search box above.</p>
        )}
      </div>
    </>
  );
}

export default Search;
