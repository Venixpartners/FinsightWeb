import { Bitcoin, CircleDollarSign } from "lucide-react";
import { fetchRates } from "../../lib/api";
import useAsync from "../../lib/useAsync";
import { formatDate, money } from "../../lib/format";

function Row({ label, value, note }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <div className="text-right">
        <p className="text-sm font-bold tabular-nums text-slate-950">{value}</p>
        {note && <p className="mt-0.5 text-xs text-slate-500">{note}</p>}
      </div>
    </div>
  );
}

export default function RatesPanel() {
  const state = useAsync(fetchRates, []);
  const fx = state.data?.fx;
  const btc = state.data?.btc;

  return (
    <section className="rounded-xl border border-slate-200 bg-white" aria-labelledby="rates-heading">
      <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
        <CircleDollarSign size={18} className="text-blue-700" aria-hidden="true" />
        <h2 id="rates-heading" className="text-base font-extrabold text-slate-950">
          Naira and Bitcoin
        </h2>
      </div>

      {state.loading && <p className="px-5 py-6 text-sm text-slate-500">Loading rates…</p>}
      {state.error && <p className="px-5 py-6 text-sm text-slate-600">Rates are not available right now.</p>}

      {state.data && (
        <>
          <div className="divide-y divide-slate-100">
            {fx?.pairs.map((p) => (
              <Row key={p.pair} label={p.pair} value={money(p.value, "NGN")} />
            ))}
            {btc && (
              <Row
                label={
                  <span className="flex items-center gap-2">
                    <Bitcoin size={15} className="text-slate-500" aria-hidden="true" /> BTC/USD
                  </span>
                }
                value={money(btc.usd, "USD", 0)}
                note={
                  typeof btc.change24h === "number"
                    ? `${btc.change24h >= 0 ? "Up" : "Down"} ${Math.abs(btc.change24h).toFixed(2)}% in 24 hours`
                    : null
                }
              />
            )}
          </div>
          <div className="space-y-1 border-t border-slate-200 px-5 py-4 text-xs leading-5 text-slate-500">
            {fx && (
              <p>
                Naira rates are daily mid market reference rates from{" "}
                <a href={fx.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {fx.source}
                </a>
                {fx.asAt ? `, as at ${formatDate(fx.asAt, true)}` : ""}. They are not CBN official rates and may
                differ from bank or street rates.
              </p>
            )}
            {btc && (
              <p>
                Bitcoin price from{" "}
                <a href={btc.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
                  {btc.source}
                </a>
                {btc.asAt ? `, as at ${formatDate(btc.asAt, true)}` : ""}.
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}
