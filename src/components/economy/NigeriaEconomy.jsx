import { Clock3, ArrowRight } from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

function SupportingStory({ article }) {
  return (
    <SubscriptionGate
      sourcePage="economy"
      trigger="nigeria_economy_story_click"
    >
      <article className="group grid grid-cols-[120px_1fr] gap-4 border-b border-slate-200 pb-5 last:border-b-0 last:pb-0">
        <div className="overflow-hidden rounded-lg">
          <img
            src={article.image}
            alt={article.title}
            className="h-24 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
            {article.category}
          </span>

          <h3 className="mt-1 text-sm font-bold leading-5 text-slate-900 transition group-hover:text-blue-600">
            {article.title}
          </h3>

          <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
            <Clock3 size={11} />
            {article.publishedAt}
          </div>
        </div>
      </article>
    </SubscriptionGate>
  );
}

export default function NigeriaEconomy({ articles }) {
  const [featured, ...supporting] = articles;

  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Nigeria
          </p>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
            Nigeria Economy
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The latest economic developments shaping businesses, consumers and
            investors in Nigeria.
          </p>
        </div>

        <button className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex">
          View all
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        {/* Featured story */}
        <SubscriptionGate
          sourcePage="economy"
          trigger="nigeria_economy_featured_click"
        >
          <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[360px]"
              />
            </div>

            <div className="p-5 sm:p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {featured.category}
              </span>

              <h3 className="mt-2 text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl">
                {featured.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {featured.description}
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
                <Clock3 size={13} />
                {featured.publishedAt}
              </div>
            </div>
          </article>
        </SubscriptionGate>

        {/* Supporting stories */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="space-y-5">
            {supporting.map((article) => (
              <SupportingStory key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
