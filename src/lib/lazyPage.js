import { lazy } from "react";

const RELOAD_KEY = "finsight_chunk_reload";

// Loads a page's code on demand. If the file is missing because the site was
// updated while this tab was open, reload once so the visitor gets the new version.
export function lazyPage(loader) {
  const load = () =>
    loader().catch((error) => {
      let last = 0;
      try {
        last = Number(sessionStorage.getItem(RELOAD_KEY)) || 0;
      } catch {
        // storage unavailable
      }
      if (Date.now() - last > 10000) {
        try {
          sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        } catch {
          // storage unavailable
        }
        window.location.reload();
        return new Promise(() => {});
      }
      throw error;
    });
  const Component = lazy(load);
  Component.preload = loader;
  return Component;
}

// Fetch every page's code once the first page has settled, so later taps open instantly.
export function preloadPages(pages) {
  const run = () => pages.forEach((page) => page.preload?.().catch(() => {}));
  if (typeof window === "undefined") return;
  if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 4000 });
  else setTimeout(run, 2500);
}
