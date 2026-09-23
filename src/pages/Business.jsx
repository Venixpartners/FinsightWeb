import { NavLink, useSearchParams } from "react-router-dom";
import PageIntro from "../components/common/PageIntro";
import FeatureLayout from "../components/news/FeatureLayout";
import StoryGrid from "../components/news/StoryGrid";
import NewsState from "../components/news/NewsState";
import SourcesNote from "../components/news/SourcesNote";
import SectionHeading from "../components/common/SectionHeading";
import { fetchNews } from "../lib/api";
import useAsync from "../lib/useAsync";
import useTitle from "../lib/useTitle";

const FOCUS = [
  { key: "", name: "All business" },
  { key: "finance", name: "Finance" },
  { key: "energy", name: "Energy" },
  { key: "telecoms", name: "Telecoms" },
  { key: "startups", name: "Startups" },
  { key: "retail", name: "Consumer" },
  { key: "manufacturing", name: "Manufacturing" },
];

function Business() {
  useTitle();
  const [params] = useSearchParams();
  const focus = FOCUS.some((f) => f.key === params.get("focus")) ? params.get("focus") : "";
  const state = useAsync(() => fetchNews({ topic: "business", focus: focus || undefined, limit: 24 }), [focus]);
  const label = FOCUS.find((f) => f.key === focus)?.name;

  return (
    <>
      <PageIntro title="Business"
        description="The latest business stories from Nigerian publishers, updated through the day." />

      <div className="overflow-x-auto border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-w-max max-w-350 gap-7 px-5 sm:px-7">
          {FOCUS.map((f) => (
            <NavLink key={f.key || "all"} to={f.key ? `/business?focus=${f.key}` : "/business"}
              className={() =>
                `border-b-2 py-4 text-sm font-semibold transition ${
                  focus === f.key ? "border-blue-700 text-blue-700" : "border-transparent text-slate-600 hover:text-blue-700"
                }`}>
              {f.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-350 px-5 py-10 sm:px-7">
        <h2 className="sr-only">Top business stories</h2>
        <NewsState state={state} rows={6} emptyText={`No ${label?.toLowerCase()} stories right now.`}>
          {(stories, data) => (
            <>
              <FeatureLayout stories={stories} />
              {stories.length > 6 && (
                <div className="mt-12">
                  <SectionHeading title="Latest" />
                  <StoryGrid stories={stories.slice(6)} />
                </div>
              )}
              <SourcesNote sources={data.sources} />
            </>
          )}
        </NewsState>
      </div>
    </>
  );
}

export default Business;
