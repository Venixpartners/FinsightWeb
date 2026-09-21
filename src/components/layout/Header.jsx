import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const term = q.trim();
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <header className="bg-[#071426] text-white">
      <div className="mx-auto flex h-18 max-w-350 items-center gap-4 px-5 sm:gap-8 sm:px-7">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="FinSight home">
          <img src="/pwa-192.png" alt="" width={44} height={44} />
          <p className="hidden text-[11px] text-slate-400 sm:block">Business. Markets. Economy.</p>
        </Link>

        <form onSubmit={onSubmit} role="search" className="flex h-10 max-w-137.5 flex-1 items-center gap-2 rounded-md border border-slate-600 bg-slate-900/40 px-3 text-slate-300">
          <Search size={17} aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">Search stories</label>
          <input id="site-search" type="search" value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search stories"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-400" />
        </form>

        <Link to="/subscribe"
          className="hidden shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500 md:block">
          Get SMS updates
        </Link>
      </div>
    </header>
  );
}
