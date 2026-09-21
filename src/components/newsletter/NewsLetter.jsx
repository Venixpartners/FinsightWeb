import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Mail } from "lucide-react";
import { submitLead } from "../../lib/api";

export default function Newsletter({ sourcePage = "home" }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Enter your email address.");
    if (!consent) return setError("Tick the box to agree to receive the newsletter.");
    setBusy(true);
    try {
      await submitLead({ channel: "newsletter", email, consentProcessing: true, website, sourcePage, trigger: "newsletter_form" });
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-14 rounded-2xl bg-[#071426]">
      <div className="grid gap-8 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-14">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-blue-300">
            <Mail size={18} aria-hidden="true" /> FinSight newsletter
          </p>
          <h2 className="mt-3 max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            The week's business and market news, by email
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Free. We are building the list now and will start sending soon.
          </p>
        </div>

        {done ? (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5" role="status">
            <CheckCircle size={22} className="shrink-0 text-emerald-300" aria-hidden="true" />
            <p className="text-sm text-white">
              You're on the list. Each email will include a link to unsubscribe.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" autoComplete="email" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"
                className="h-12 flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-blue-400" />
              <input className="hidden" tabIndex={-1} aria-hidden="true" autoComplete="off" value={website}
                onChange={(e) => setWebsite(e.target.value)} />
              <button type="submit" disabled={busy}
                className="h-12 rounded-lg bg-blue-600 px-6 text-sm font-bold text-white hover:bg-blue-500 disabled:opacity-70">
                {busy ? "Saving" : "Join the newsletter"}
              </button>
            </div>
            <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-slate-300">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-blue-500" checked={consent}
                onChange={(e) => setConsent(e.target.checked)} />
              <span>
                Send me the FinSight newsletter. I have read the{" "}
                <Link to="/privacy" className="underline">Privacy Policy</Link> and can unsubscribe at any time.
              </span>
            </label>
            {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
