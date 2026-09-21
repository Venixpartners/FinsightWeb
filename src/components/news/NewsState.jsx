// Loading, error and empty states shared by every news section.
export function NewsLoading({ rows = 4 }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading stories</span>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-20 animate-pulse rounded-lg bg-slate-200/70 motion-reduce:animate-none" />
      ))}
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
