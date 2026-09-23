import { fetchRates } from "../../lib/api";
import useAsync from "../../lib/useAsync";
import { money } from "../../lib/format";

// Compact row of live figures shown under the navigation. Its height is fixed
// from the first paint so the page below does not jump when rates arrive.
export default function RatesStrip() {
  const { data, loading } = useAsync(fetchRates, []);
  const items = [
    ...(data?.fx?.pairs || []).map((p) => ({ label: p.pair, value: money(p.value, "NGN") })),
    ...(data?.btc ? [{ label: "BTC/USD", value: money(data.btc.usd, "USD", 0) }] : []),
  ];

  return (
    <aside aria-label="Reference rates" className="border-b border-slate-200 bg-white">
      <div
        tabIndex={items.length ? 0 : -1}
        className="mx-auto flex h-11 max-w-350 items-center gap-6 overflow-x-auto px-5 text-sm focus-visible:outline-2 focus-visible:outline-blue-600 sm:px-7"
      >
        {items.map((item) => (
          <span key={item.label} className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <span className="font-semibold text-slate-600">{item.label}</span>
            <span className="font-bold tabular-nums text-slate-950">{item.value}</span>
          </span>
        ))}
        {!items.length && (
          <span className="text-xs text-slate-500">{loading ? "Loading rates" : "Rates are not available right now"}</span>
        )}
        {items.length > 0 && (
          <span className="ml-auto shrink-0 whitespace-nowrap text-xs text-slate-500">Reference rates, updated daily</span>
        )}
      </div>
    </aside>
  );
}
