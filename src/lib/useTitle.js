import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../config/site";
import { pageFor } from "../config/seo";

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el && value != null) el.setAttribute(attr, value);
}

// Keeps the tab title and sharing tags in step as visitors move between pages.
export default function useTitle(customTitle) {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pageFor(pathname);
    const title = customTitle ? `${customTitle} | FinSight` : page.title;
    document.title = title;
    const url = page.known ? `${SITE.url}${page.path === "/" ? "/" : page.path}` : SITE.url;
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('meta[name="robots"]', "content", page.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:url"]', "content", url);
  }, [pathname, customTitle]);
}
