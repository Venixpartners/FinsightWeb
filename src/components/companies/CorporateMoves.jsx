import {
  ArrowRight,
  BriefcaseBusiness,
  Handshake,
  UserRound,
  TrendingUp,
} from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

function getIcon(type) {
  if (type === "Partnership") return Handshake;
  if (type === "Leadership") return UserRound;
  if (type === "Investment") return TrendingUp;

  return BriefcaseBusiness;
}

export default function CorporateMoves({ moves }) {
  return (
    <section className="mt-12">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Business Activity
        </p>

        <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
          Corporate Moves
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Important expansions, partnerships, investments and leadership
          changes.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {moves.map((move) => {
          const Icon = getIcon(move.type);

          return (
            <SubscriptionGate
              key={CorporateMoves.id}
              sourcePage="companies"
              trigger="corporate_moves_click"
            >
              <article
                key={move.id}
                className="group flex gap-4 border-b border-slate-100 p-5 last:border-b-0 hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <Icon size={18} className="text-slate-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-blue-600">
                    {move.type}
                  </span>

                  <h3 className="mt-1 text-sm font-extrabold text-slate-900 transition group-hover:text-blue-600">
                    {move.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {move.description}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {move.publishedAt}
                  </p>
                </div>

                <ArrowRight
                  size={17}
                  className="mt-2 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </article>
            </SubscriptionGate>
          );
        })}
      </div>
    </section>
  );
}
