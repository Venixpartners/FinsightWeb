import { ArrowRight } from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

export default function BusinessSpotlight({ spotlight }) {
  return (
    <SubscriptionGate sourcePage="business" trigger="spotlight_click">
      <section className="mt-12 overflow-hidden rounded-2xl bg-slate-900">
        <div className="grid lg:grid-cols-2">
          <div className="min-h-70 overflow-hidden">
            <img
              src={spotlight.image}
              alt={spotlight.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {spotlight.category}
            </span>

            <h2 className="mt-3 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {spotlight.title}
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              {spotlight.description}
            </p>

            <button className="mt-6 flex w-fit items-center gap-2 text-sm font-bold text-white transition hover:text-blue-400">
              Read analysis
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </SubscriptionGate>
  );
}
