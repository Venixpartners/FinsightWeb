import { lazy } from "react";
import { hardLoadOnce } from "./recover";

// Loads a page's code on demand. If the file cannot be fetched (the site was
// updated while this tab was open, or an old offline copy is in the way), load
// the address fresh from the server once so the visitor gets the current version.
export function lazyPage(loader) {
  const load = () =>
    loader().catch((error) => {
      if (hardLoadOnce()) return new Promise(() => {});
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
