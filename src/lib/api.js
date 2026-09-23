const cache = new Map();
const TTL = 5 * 60 * 1000;

async function getJson(url) {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < TTL) return hit.data;
  const response = await fetch(url);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed");
  cache.set(url, { at: Date.now(), data });
  return data;
}

export function fetchNews({ topic = "all", focus, q, limit = 20 } = {}) {
  const params = new URLSearchParams({ topic, limit: String(limit) });
  if (focus) params.set("focus", focus);
  if (q) params.set("q", q);
  return getJson(`/api/news?${params}`);
}

export function fetchRates() {
  return getJson("/api/rates");
}

export async function submitLead(payload) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "We could not save your details. Please try again.");
  return data;
}
