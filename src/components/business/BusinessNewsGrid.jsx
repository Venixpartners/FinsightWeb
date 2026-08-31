import { Clock3 } from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

function BusinessNewsCard({ article }) {
  return (
    <SubscriptionGate sourcePage="business" trigger="latest_news_click">
      <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md">
        <div className="overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
            {article.category}
          </span>

          <h3 className="mt-2 text-base font-bold leading-6 text-slate-900 group-hover:text-blue-600">
            {article.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
            {article.description}
          </p>

          <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
            <Clock3 size={12} />
            {article.publishedAt}
          </div>
        </div>
      </article>
    </SubscriptionGate>
  );
}

export default function BusinessNewsGrid({ articles }) {
  return (
    <section className="mt-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Latest
          </p>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
            Latest Business News
          </h2>
        </div>

        <button className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:block">
          View all
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BusinessNewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
