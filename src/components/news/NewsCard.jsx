import { Clock } from "lucide-react";
import { useSubscriptionPrompt } from "../../context/SubscriptionContext";

export default function NewsCard({ article, sourcePage = "unknown" }) {
  const { openSubscriptionPrompt } = useSubscriptionPrompt();

  function handleClick() {
    openSubscriptionPrompt({
      sourcePage: "home",
      trigger: "article_click",
    });
  }

  return (
    <article
      onClick={handleClick}
      className="group flex gap-4 border-b border-slate-200 py-4 first:pt-0 last:border-b-0"
    >
      {/* Image */}
      <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-28 sm:w-40">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
          {article.category}
        </span>

        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-900 transition group-hover:text-blue-600 sm:text-base">
          {article.title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} />
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </article>
  );
}
