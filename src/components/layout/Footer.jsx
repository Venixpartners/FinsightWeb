import { Link } from "react-router-dom";

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

const newsLinks = [
  { name: "Business", path: "/business" },
  { name: "Markets", path: "/markets" },
  { name: "Economy", path: "/economy" },
  { name: "Technology", path: "/tech" },
];

const marketLinks = [
  { name: "Stocks", path: "/markets" },
  { name: "Forex", path: "/forex" },
  { name: "Crypto", path: "/crypto" },
  { name: "Commodities", path: "/commodities" },
];

export default function Footer() {
  return (
    <footer className="bg-[#071426] text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-350 px-7 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-15 w-15 place-items-center rounded-md ">
                <img
                  src="/images/Finsight Logo2.png"
                  alt=""
                  width={55}
                  height={55}
                />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-white">
                  Fin<span className="text-purple-400">sight</span>
                </h2>

                <p className="text-[11px] text-slate-500">
                  Business. Markets. Economy.
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Finsight brings you the latest business, financial, economic and
              market news from Nigeria and around the world.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-5">
              <a
                href="#"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                X
              </a>

              <a
                href="#"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Facebook
              </a>

              <a
                href="#"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                Instagram
              </a>

              <a
                href="#"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* News */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              News
            </h3>

            <div className="flex flex-col gap-3">
              {newsLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Markets */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Markets
            </h3>

            <div className="flex flex-col gap-3">
              {marketLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-slate-400 transition hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-350 flex-col gap-4 px-7 py-5 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Finsight. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-slate-500 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-slate-500 transition hover:text-white"
            >
              Terms of Use
            </Link>

            <Link
              to="/disclaimer"
              className="text-slate-500 transition hover:text-white"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
