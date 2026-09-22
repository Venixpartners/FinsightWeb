import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App, { LAZY_PAGES } from "./App.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";
import { preloadPages } from "./lib/lazyPage";

registerSW({ immediate: true });

const tree = (
  <BrowserRouter>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </BrowserRouter>
);

const root = document.getElementById("root");
// Pages arrive prebuilt. Take them over in place, unless the address carries a
// search or filter that the prebuilt copy could not know about.
const prebuiltMatches = root.hasChildNodes() && !/[?&](q|focus)=/.test(window.location.search);
if (prebuiltMatches) hydrateRoot(root, tree);
else createRoot(root).render(tree);

if (document.readyState === "complete") preloadPages(LAZY_PAGES);
else window.addEventListener("load", () => preloadPages(LAZY_PAGES), { once: true });
