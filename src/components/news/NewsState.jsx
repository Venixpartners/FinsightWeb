// Loading, error and empty states shared by every news section.
// Shaped like the lead story plus list so the page does not jump when stories arrive.
export function NewsLoading({ rows = 5 }) {
  const block = "animate-pulse rounded-xl bg-slate-200/70 motion-reduce:animate-none";
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading stories</span>
      <div className={`${block} h-80 sm:h-96`} />
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        {Array.from({ length: Math.min(rows, 5) }).map((_, i) => (
          <div key={i} className={`${block} h-16`} />
        ))}
      </div>
    </div>
  );
}

export function NewsMessage({ title, detail }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {detail && <p className="mt-1 text-sm text-slate-500">{detail}</p>}
    </div>
  );
}

export default function NewsState({ state, emptyText = "No stories match this section right now.", rows, children }) {
  if (state.loading) return <NewsLoading rows={rows} />;
  if (state.error)
    return <NewsMessage title="News sources are not responding." detail="Refresh the page in a few minutes." />;
  const stories = state.data?.stories || [];
  if (!stories.length) return <NewsMessage title={emptyText} detail="New stories are added through the day." />;
  return children(stories, state.data);
}
