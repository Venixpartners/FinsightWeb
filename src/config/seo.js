import { SITE } from "./site";

// Title, description and indexing rules for every page. Used when the pages are
// built ahead of time (what search engines and link previews read) and in the browser.
export const PAGES = {
  "/": {
    title: "FinSight | Nigerian business, markets and economy news",
    description:
      "Nigerian business, markets and economy headlines from trusted publishers, naira reference rates and the latest official NBS and CBN figures. Daily news by SMS.",
  },
  "/business": {
    title: "Nigerian business news today | FinSight",
    description:
      "The latest Nigerian business stories on banking, energy, telecoms, startups, consumer goods and manufacturing, gathered from trusted publishers through the day.",
    crumb: "Business",
  },
  "/markets": {
    title: "Naira exchange rates and Nigerian market news | FinSight",
    description:
      "Naira reference rates against the dollar, pound and euro, the Bitcoin price, and news on Nigerian stocks, bonds, oil and crypto.",
    crumb: "Markets",
  },
  "/economy": {
    title: "Nigeria inflation, interest rates and GDP | FinSight",
    description:
      "Nigeria's latest inflation rate, CBN monetary policy rate and GDP growth from official releases, with economy and policy news from trusted publishers.",
    crumb: "Economy",
  },
  "/companies": {
    title: "Nigerian company news and results | FinSight",
    description:
      "Results, appointments, deals and expansion news from companies operating in Nigeria, including banks, telecoms, energy and consumer firms.",
    crumb: "Companies",
  },
  "/subscribe": {
    title: "Get FinSight daily money news by SMS | FinSight",
    description:
      "One text a day with the business, market and economy news that matters in Nigeria. ₦100 a day on MTN. Airtel, Glo and 9mobile users can join the waitlist free.",
    crumb: "Subscribe",
  },
  "/about": {
    title: "About FinSight | FinSight",
    description: "How FinSight gathers Nigerian financial news, where its figures come from, and who runs the service.",
    crumb: "About",
  },
  "/contact": {
    title: "Contact FinSight | FinSight",
    description: "Contact FinSight and Venix Partners Limited about the website, SMS subscriptions, billing or your personal data.",
    crumb: "Contact",
  },
  "/privacy": {
    title: "Privacy Policy | FinSight",
    description: "How FinSight collects, uses and protects personal data under the Nigeria Data Protection Act 2023, and the rights you have.",
    crumb: "Privacy Policy",
  },
  "/terms": {
    title: "Terms of Use | FinSight",
    description: "Terms for using the FinSight website and the FinSight SMS service, including price, renewal and how to stop.",
    crumb: "Terms of Use",
  },
  "/disclaimer": {
    title: "Disclaimer | FinSight",
    description: "FinSight is financial news, not financial advice. How our rates, figures and headlines are sourced.",
    crumb: "Disclaimer",
  },
  "/cookies": {
    title: "Cookies | FinSight",
    description: "FinSight uses no advertising or tracking cookies. What little we store in your browser, and why.",
    crumb: "Cookies",
  },
  "/search": {
    title: "Search | FinSight",
    description: "Search recent Nigerian business, markets and economy headlines on FinSight.",
    noindex: true,
  },
  404: {
    title: "Page not found | FinSight",
    description: "This page does not exist on FinSight.",
    noindex: true,
  },
};

export const OG_IMAGE = `${SITE.url}/og-image.png`;

export function pageFor(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return { path: clean, ...(PAGES[clean] || PAGES[404]), known: Boolean(PAGES[clean]) };
}

// Structured data that helps search engines understand who runs the site.
export function structuredData(path) {
  const page = pageFor(path);
  const org = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.operator,
    url: SITE.url,
    logo: `${SITE.url}/pwa-512.png`,
    email: SITE.generalEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "35 Yesufu Sanusi Street, Surulere",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
  };
  const graph = [org];
  if (path === "/") {
    graph.push({
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      inLanguage: "en-NG",
      publisher: { "@id": `${SITE.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/search?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    });
  } else if (page.crumb) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
        { "@type": "ListItem", position: 2, name: page.crumb, item: `${SITE.url}${path}` },
      ],
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

// Head tags for a page, written into the prebuilt HTML.
export function headTags(pathname) {
  const page = pageFor(pathname);
  const url = page.known ? `${SITE.url}${page.path === "/" ? "/" : page.path}` : null;
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    url && !page.noindex ? `<link rel="canonical" href="${url}" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${SITE.name}, Nigerian business, markets and economy news" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    page.known && !page.noindex
      ? `<script type="application/ld+json">${JSON.stringify(structuredData(page.path)).replace(/</g, "\\u003c")}</script>`
      : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}
