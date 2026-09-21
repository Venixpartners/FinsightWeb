// Reference exchange rates and Bitcoin price from keyless public sources.
// FX: ExchangeRate API open access (daily, attribution required).
// BTC: CoinGecko public API.

async function getJson(url, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export function buildFx(data) {
  if (data?.result !== "success" || !data.rates?.NGN) return null;
  const { NGN, GBP, EUR } = data.rates;
  const asAt = data.time_last_update_unix ? new Date(data.time_last_update_unix * 1000).toISOString() : null;
  const pairs = [{ pair: "USD/NGN", value: NGN }];
  if (GBP) pairs.push({ pair: "GBP/NGN", value: NGN / GBP });
  if (EUR) pairs.push({ pair: "EUR/NGN", value: NGN / EUR });
  return {
    pairs: pairs.map((p) => ({ ...p, value: Math.round(p.value * 100) / 100 })),
    asAt,
    source: "ExchangeRate API",
    sourceUrl: "https://www.exchangerate-api.com",
  };
}

export function buildBtc(data) {
  const btc = data?.bitcoin;
  if (!btc?.usd) return null;
  return {
    usd: btc.usd,
    ngn: btc.ngn ?? null,
    change24h: typeof btc.usd_24h_change === "number" ? Math.round(btc.usd_24h_change * 100) / 100 : null,
    asAt: btc.last_updated_at ? new Date(btc.last_updated_at * 1000).toISOString() : null,
    source: "CoinGecko",
    sourceUrl: "https://www.coingecko.com",
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const [fxResult, btcResult] = await Promise.allSettled([
    getJson("https://open.er-api.com/v6/latest/USD"),
    getJson(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,ngn&include_24hr_change=true&include_last_updated_at=true",
    ),
  ]);

  const fx = fxResult.status === "fulfilled" ? buildFx(fxResult.value) : null;
  const btc = btcResult.status === "fulfilled" ? buildBtc(btcResult.value) : null;

  if (!fx && !btc) {
    res.setHeader("Cache-Control", "no-store");
    return res.status(502).json({ error: "Rate sources are unavailable right now." });
  }

  res.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");
  return res.status(200).json({ fx, btc });
}
