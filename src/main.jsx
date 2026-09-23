import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App, { LAZY_PAGES } from "./App.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";
import { preloadPages } from "./lib/lazyPage";
import { hardLoadOnce } from "./lib/recover";

// Earlier versions installed an offline cache that could keep serving an old copy
// of the site after an update. Remove it wherever it is still found.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
      if (registrations.length && window.caches) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
      }
    })
    .catch(() => {});
}

const tree = (
  <BrowserRouter>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </BrowserRouter>
);

const root = document.getElementById("root");

// If anything stops the site drawing, React clears the screen. Rather than leave
// a visitor on a blank page, load the address fresh, exactly as refresh would.
function onUncaughtError(error) {
  console.error(error);
  if (hardLoadOnce()) return;
  root.innerHTML =
    '<div style="max-width:36rem;margin:0 auto;padding:96px 20px;text-align:center">' +
    '<h1 style="font-size:24px;font-weight:800;color:#020617">This page did not load</h1>' +
    '<p style="margin-top:12px;color:#475569">Your connection may have dropped, or the site has just been updated.</p>' +
    '<a href="' + window.location.pathname + '" style="display:inline-block;margin-top:24px;padding:12px 20px;border-radius:8px;background:#1d4ed8;color:#fff;font-weight:600;text-decoration:none">Reload the page</a>' +
    "</div>";
}

// Pages arrive prebuilt. Take them over in place, unless the address carries a
// search or filter that the prebuilt copy could not know about.
const prebuiltMatches = root.hasChildNodes() && !/[?&](q|focus)=/.test(window.location.search);
if (prebuiltMatches) hydrateRoot(root, tree, { onUncaughtError });
else createRoot(root, { onUncaughtError }).render(tree);

if (document.readyState === "complete") preloadPages(LAZY_PAGES);
else window.addEventListener("load", () => preloadPages(LAZY_PAGES), { once: true });
