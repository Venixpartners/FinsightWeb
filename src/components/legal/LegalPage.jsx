import useTitle from "../../lib/useTitle";
import { SITE } from "../../config/site";

export function H2({ children }) {
  return <h2 className="mt-10 text-xl font-bold text-slate-950">{children}</h2>;
}
export function H3({ children }) {
  return <h3 className="mt-6 text-base font-bold text-slate-900">{children}</h3>;
}
export function P({ children }) {
  return <p className="mt-3 text-[15px] leading-7 text-slate-700">{children}</p>;
}
export function UL({ items }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-6 text-[15px] leading-7 text-slate-700">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}
export function A({ href, children }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} className="font-medium text-blue-700 underline"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export default function LegalPage({ title, intro, showUpdated = true, children }) {
  useTitle(title);
  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-7">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        {showUpdated && <p className="mt-3 text-sm text-slate-500">Last updated {SITE.legalUpdated}</p>}
        {intro && <p className="mt-6 text-lg leading-8 text-slate-700">{intro}</p>}
        {children}
      </article>
    </div>
  );
}
