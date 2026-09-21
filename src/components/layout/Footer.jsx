import { Link } from "react-router-dom";
import { SITE } from "../../config/site";

const columns = [
  {
    title: "News",
    links: [
      { name: "Business", path: "/business" },
      { name: "Markets", path: "/markets" },
      { name: "Economy", path: "/economy" },
      { name: "Companies", path: "/companies" },
    ],
  },
  {
    title: "FinSight",
    links: [
      { name: "Get SMS updates", path: "/subscribe" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Use", path: "/terms" },
      { name: "Disclaimer", path: "/disclaimer" },
      { name: "Cookies", path: "/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#071426] text-slate-300">
      <div className="mx-auto grid max-w-350 gap-10 px-5 py-14 sm:px-7 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4">
            <img src="/pwa-192.png" alt="" width={44} height={44} />
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Business, market and economy news for Nigeria, on the web and by SMS.
          </p>
          <p className="mt-5 max-w-sm text-xs leading-5 text-slate-400">
            FinSight is a service of {SITE.operator} ({SITE.rcNumber}), {SITE.address}. {SITE.licence}.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h2 className="mb-5 text-sm font-bold text-white">{col.title}</h2>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-slate-400 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-350 flex-col gap-2 px-5 py-5 text-xs text-slate-400 sm:px-7 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.operator}. All rights reserved.</p>
          <p>News content belongs to the publishers credited on each story. Nothing on this site is financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
