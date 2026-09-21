import { INDICATORS } from "../../content/indicators";

export default function IndicatorGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {INDICATORS.map((item) => (
        <div key={item.name} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-bold text-slate-900">{item.name}</p>
          <p className="mt-1 text-xs text-slate-500">{item.period}</p>
          <p className="mt-4 text-3xl font-extrabold tracking-tight tabular-nums text-slate-950">{item.value}</p>
          <p className="mt-1 text-sm text-slate-600">{item.context}</p>
          <p className="mt-auto pt-4 text-xs leading-5 text-slate-500">
            Source:{" "}
            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {item.source}
            </a>
            , released {item.released}
          </p>
        </div>
      ))}
    </div>
  );
}
