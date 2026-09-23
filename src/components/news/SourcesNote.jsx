export default function SourcesNote({ sources }) {
  if (!sources?.length) return null;
  return (
    <p className="mt-6 text-xs leading-5 text-slate-500">
      Headlines and summaries come from {sources.join(", ")}. Each story opens on the publisher's own website.
    </p>
  );
}
