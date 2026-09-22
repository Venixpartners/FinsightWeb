// Used only at build time to write each page out as finished HTML.
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";

export { headTags, PAGES } from "./config/seo.js";
export { SITE } from "./config/site.js";

export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <SubscriptionProvider>
        <App />
      </SubscriptionProvider>
    </StaticRouter>,
  );
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
