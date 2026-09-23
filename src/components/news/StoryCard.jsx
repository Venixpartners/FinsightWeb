import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { timeAgo } from "../../lib/format";
import { useSubscriptionPrompt } from "../../context/SubscriptionContext";

function Meta({ story }) {
  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
      <span className="font-semibold text-slate-700">{story.source}</span>
      {story.publishedAt && <span aria-hidden="true">|</span>}
      {story.publishedAt && <time dateTime={story.publishedAt}>{timeAgo(story.publishedAt)}</time>}
    </p>
  );
}

// If a publisher image fails, the box keeps its size and shows the source name,
// so the text around it does not jump.
function Thumb({ src, className, source }) {
  const [failed, setFailed] = useState(false);
  if (!src) return null;
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 p-2 text-center text-xs font-semibold text-slate-600 ${className}`}>
        {source}
      </div>
    );
  }
  return (
    <div className={`overflow-hidden bg-slate-100 ${className}`}>
      <img
        src={src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

// Every story links to the publisher's original article.
export default function StoryCard({ story, variant = "compact" }) {
  const { noteArticleOpened } = useSubscriptionPrompt();
  const linkProps = {
    href: story.url,
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: noteArticleOpened,
  };

  if (variant === "lead") {
    return (
      <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
        <a {...linkProps} className="block focus-visible:outline-2 focus-visible:outline-blue-600">
          <Thumb src={story.image} source={story.source} className="aspect-video" />
          <div className="p-5 sm:p-6">
            <h3 className="text-xl font-extrabold leading-tight text-slate-950 group-hover:text-blue-700 sm:text-2xl">
              {story.title}
            </h3>
            {story.description && <p className="mt-3 text-sm leading-6 text-slate-600">{story.description}</p>}
            <Meta story={story} />
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700">
              Read on {story.source} <ExternalLink size={14} aria-hidden="true" />
            </span>
          </div>
        </a>
      </article>
    );
  }

  if (variant === "grid") {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
        <a {...linkProps} className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-blue-600">
          <Thumb src={story.image} source={story.source} className="h-44" />
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base font-bold leading-6 text-slate-900 group-hover:text-blue-700">{story.title}</h3>
            {story.description && (
              <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-600">{story.description}</p>
            )}
            <div className="mt-auto pt-3">
              <Meta story={story} />
            </div>
          </div>
        </a>
      </article>
    );
  }

  return (
    <article className="group border-b border-slate-200 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <a {...linkProps} className="flex gap-4 focus-visible:outline-2 focus-visible:outline-blue-600">
        <Thumb src={story.image} source={story.source} className="h-20 w-28 shrink-0 rounded-lg sm:h-24 sm:w-32" />
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-3 text-sm font-bold leading-5 text-slate-900 group-hover:text-blue-700 sm:text-base">
            {story.title}
          </h3>
          <Meta story={story} />
        </div>
      </a>
    </article>
  );
}
