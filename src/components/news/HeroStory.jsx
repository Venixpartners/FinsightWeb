import { ArrowRight, Clock } from "lucide-react";
import { useSubscriptionPrompt } from "../../context/SubscriptionContext";

export default function HeroStory({ article, sourcePage = "home" }) {
  const { openSubscriptionPrompt } = useSubscriptionPrompt();

  function handleClick() {
    openSubscriptionPrompt({
      sourcePage,
      trigger: "hero_click",
    });
  }
  return (
    <article onClick={handleClick} className="group">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-100">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <div className="absolute left-4 top-4">
          <span className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock size={13} />
          <span>{article.publishedAt}</span>
        </div>

        <h1 className="mt-2 text-2xl font-extrabold leading-tight text-slate-950 transition group-hover:text-blue-600 sm:text-3xl">
          {article.title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
          {article.description}
        </p>

        <button className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:gap-3">
          Read full story
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
}
