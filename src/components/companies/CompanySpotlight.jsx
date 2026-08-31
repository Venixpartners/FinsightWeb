import { ArrowRight, Building2 } from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

export default function CompanySpotlight({ companies }) {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Company Directory
        </p>

        <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
          Company Spotlight
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Explore companies making an impact across major industries.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <SubscriptionGate
            key={company.id}
            sourcePage="companies"
            trigger="company_spotlight_click"
          >
            <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-md">
              <div className="relative overflow-hidden">
                <img
                  src={company.image}
                  alt={company.name}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />

                <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold text-slate-700 shadow-sm">
                  {company.marketStatus}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                    <Building2 size={17} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-slate-950">
                      {company.name}
                    </h3>

                    <p className="text-xs text-slate-400">{company.symbol}</p>
                  </div>
                </div>

                <p className="mt-4 text-xs font-semibold text-blue-600">
                  {company.sector}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {company.description}
                </p>

                <button className="mt-5 flex items-center gap-1 text-sm font-bold text-slate-900 transition group-hover:text-blue-600">
                  View company
                  <ArrowRight size={15} />
                </button>
              </div>
            </article>
          </SubscriptionGate>
        ))}
      </div>
    </section>
  );
}
