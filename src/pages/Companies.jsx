import CompaniesHeader from "../components/companies/CompaniesHeader";
import CompanySpotlight from "../components/companies/CompanySpotlight";
import CorporateMoves from "../components/companies/CorporateMoves";
import CompanyNews from "../components/companies/CompanyNews";

import {
  mockFeaturedCompanies,
  mockCompanySpotlights,
  mockCorporateMoves,
  mockCompanyNews,
} from "../data/companiesMockData";
import SubscriptionGate from "../components/subscription/SubscriptionGate";

function Companies() {
  const featuredCompany = mockFeaturedCompanies[0];

  return (
    <div className="bg-slate-50">
      <CompaniesHeader />

      <main className="mx-auto max-w-350 px-5 pb-16 sm:px-7">
        {/* Featured Company */}
        <section className="mt-10">
          <SubscriptionGate
            sourcePage="companies"
            trigger="featured_company_click"
          >
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="grid lg:grid-cols-2">
                <div className="overflow-hidden">
                  <img
                    src={featuredCompany.image}
                    alt={featuredCompany.name}
                    className="h-64 w-full object-cover sm:h-80 lg:h-full"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                    Featured Company
                  </span>

                  <h2 className="mt-3 text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
                    {featuredCompany.headline}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {featuredCompany.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-sm font-bold text-slate-900">
                      {featuredCompany.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {featuredCompany.sector}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </SubscriptionGate>
        </section>

        <CompanySpotlight companies={mockCompanySpotlights} />

        <CorporateMoves moves={mockCorporateMoves} />

        <CompanyNews articles={mockCompanyNews} />
      </main>
    </div>
  );
}

export default Companies;
