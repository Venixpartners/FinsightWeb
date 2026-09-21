import { TrendingUp, TrendingDown, Minus, Bitcoin, Coins } from "lucide-react";

function MarketIcon({ symbol }) {
  if (symbol === "BTCUSD") {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">
        <Bitcoin size={16} />
      </div>
    );
  }

  if (symbol === "GOLD") {
    return (
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
        <Coins size={16} />
      </div>
    );
  }

  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600">
      <span className="text-[10px] font-bold">
        {symbol === "SP500"
          ? "S&P"
          : symbol === "DOW"
            ? "D"
            : symbol === "NASDAQ"
              ? "N"
              : "$"}
      </span>
    </div>
  );
}

function MarketChange({ change, direction }) {
  /*
   * No change data means:
   * do NOT display a fake arrow or percentage.
   */
  if (change === null || change === undefined || !direction) {
    return (
      <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
        <Minus size={13} />—
      </span>
    );
  }

  const isUp = direction === "up";
  const isDown = direction === "down";

  return (
    <span
      className={`flex items-center gap-1 text-xs font-semibold ${
        isUp ? "text-emerald-600" : isDown ? "text-red-500" : "text-slate-400"
      }`}
    >
      {isUp ? (
        <TrendingUp size={13} />
      ) : isDown ? (
        <TrendingDown size={13} />
      ) : (
        <Minus size={13} />
      )}

      {change}
    </span>
  );
}

export default function MarketTicker({ markets }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-350 gap-3 overflow-x-auto px-7 py-3">
        {markets.map((market) => (
          <div
            key={market.symbol}
            className="flex min-w-59 flex-1 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-2.5 shadow-sm"
          >
            <MarketIcon symbol={market.symbol} />

            <div className="flex items-center gap-3 whitespace-nowrap">
              <span className="text-sm font-semibold text-slate-900">
                {market.name}
              </span>

              <span className="text-sm text-slate-700">{market.value}</span>

              <MarketChange
                change={market.change}
                direction={market.direction}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
