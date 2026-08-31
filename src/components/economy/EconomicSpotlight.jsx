import { ArrowRight, BarChart3 } from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

export default function EconomicSpotlight({ spotlight }) {
  return (
    <section className="mt-12">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Finsight Analysis
        </p>

        <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
          Economic Spotlight
        </h2>
      </div>

      <SubscriptionGate sourcePage="economy" trigger="economic_spotlight_click">
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={spotlight.image}
                alt={spotlight.title}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03] sm:h-80 lg:h-full"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <BarChart3 size={18} className="text-blue-600" />
                </div>

                <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  {spotlight.category}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
                {spotlight.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                {spotlight.description}
              </p>

              <button className="mt-6 flex w-fit items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600">
                Read Analysis
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </article>
      </SubscriptionGate>
    </section>
  );
}
