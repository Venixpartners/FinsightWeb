import { Search, Sun } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#071426] text-white">
      <div className="mx-auto flex h-18 max-w-350 items-center gap-8 px-7">
        {/* Logo */}
        <div className="flex min-w-55 items-center gap-3">
          <div className="grid h-15 w-15 place-items-center rounded-">
            {/*<BarChart3 size={21} />*/}
            <img
              src="/images/Finsight Logo2.png"
              alt=""
              width={55}
              height={55}
            />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Fin<span className="text-blue-400">sight</span>
            </h1>

            <p className="text-[11px] text-slate-400">
              Business. Markets. Economy.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex h-10 max-w-137.5 flex-1 items-center gap-2 rounded-md border border-slate-700 bg-slate-900/40 px-3 text-slate-400">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search news, companies, topics..."
            className="hidden md:flex flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

          <span className="rounded border border-slate-700 px-2 py-0.5 text-[10px]">
            ⌘ K
          </span>
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-5">
          <button className="text-slate-300 transition hover:text-white">
            <Sun size={19} />
          </button>
          {/*
          <button className="text-sm font-medium">Sign In</button>

          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500">
            Sign Up
          </button>*/}
        </div>
      </div>
    </header>
  );
}
