import { Clock3, ArrowRight } from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

export default function GlobalEconomy({ articles }) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Global
          </p>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
            Global Economy
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Economic developments from major markets around the world.
          </p>
        </div>

        <button className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex">
          View all
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {articles.map((article) => (
          <SubscriptionGate
            key={article.id}
            sourcePage="economy"
            trigger="global_economy_news_click"
          >
            <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
                  {article.category}
                </span>

                <h3 className="mt-2 text-lg font-extrabold leading-6 text-slate-950 transition group-hover:text-blue-600">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {article.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
                  <Clock3 size={12} />
                  {article.publishedAt}
                </div>
              </div>
            </article>
          </SubscriptionGate>
        ))}
      </div>
    </section>
  );
}
