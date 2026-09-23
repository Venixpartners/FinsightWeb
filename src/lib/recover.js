const KEY = "finsight_hard_load";

// Loads the current address fresh from the server, the same as pressing refresh.
// Allowed once per address every 20 seconds so a page that keeps failing cannot
// reload forever. Returns false when the allowance is used up.
export function hardLoadOnce() {
  if (typeof window === "undefined") return false;
  const here = window.location.pathname + window.location.search;
  let last = null;
  try {
    last = JSON.parse(sessionStorage.getItem(KEY) || "null");
  } catch {
    // storage unavailable
  }
  if (last && last.url === here && Date.now() - last.at < 20000) return false;
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ url: here, at: Date.now() }));
  } catch {
    // storage unavailable
  }
  window.location.replace(here + window.location.hash);
  return true;
}
