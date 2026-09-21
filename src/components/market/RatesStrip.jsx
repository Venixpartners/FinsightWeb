import { fetchRates } from "../../lib/api";
import useAsync from "../../lib/useAsync";
import { money } from "../../lib/format";

// Compact row of live figures shown under the navigation.
export default function RatesStrip() {
  const { data } = useAsync(fetchRates, []);
  const items = [
    ...(data?.fx?.pairs || []).map((p) => ({ label: p.pair, value: money(p.value, "NGN") })),
    ...(data?.btc ? [{ label: "BTC/USD", value: money(data.btc.usd, "USD", 0) }] : []),
  ];
  if (!items.length) return null;

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-350 items-center gap-6 overflow-x-auto px-5 py-2.5 text-sm sm:px-7">
        {items.map((item) => (
          <span key={item.label} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <span className="font-semibold text-slate-600">{item.label}</span>
            <span className="font-bold tabular-nums text-slate-950">{item.value}</span>
          </span>
        ))}
        <span className="ml-auto shrink-0 whitespace-nowrap text-xs text-slate-500">Reference rates, updated daily</span>
      </div>
    </div>
  );
}
