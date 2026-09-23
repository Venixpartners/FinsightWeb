import StoryCard from "./StoryCard";

// One lead story beside a list, used on the section pages.
export default function FeatureLayout({ stories, listCount = 5 }) {
  const [lead, ...rest] = stories;
  const list = rest.slice(0, listCount);
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <StoryCard story={lead} variant="lead" />
      {list.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          {list.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
