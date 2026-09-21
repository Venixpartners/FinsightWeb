import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { NETWORKS, guessNetwork, normalisePhone } from "../../../shared/phone.js";
import { submitLead } from "../../lib/api";
import { SITE } from "../../config/site";

const field =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export default function SubscribeForm({ sourcePage = "subscribe", trigger = "subscribe_page" }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    network: "",
    email: "",
    consentProcessing: false,
    consentMarketing: false,
    website: "",
  });
  const [networkTouched, setNetworkTouched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function update(name, value) {
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "phone" && !networkTouched) {
        next.network = guessNetwork(value) || prev.network;
      }
      return next;
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) return setError("Enter your full name.");
    if (!normalisePhone(form.phone)) return setError("Enter a valid Nigerian mobile number, for example 0803 123 4567.");
    if (!form.network) return setError("Choose your mobile network.");
    if (!form.consentProcessing) return setError("Tick the box to agree to the Privacy Policy.");

    setBusy(true);
    try {
      const data = await submitLead({ ...form, channel: "sms", sourcePage, trigger });
      setResult({ ...data, network: form.network });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    const isMtn = result.network === "mtn";
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" role="status">
        <CheckCircle2 size={28} className="text-emerald-600" aria-hidden="true" />
        {isMtn ? (
          <>
            <h2 className="mt-4 text-xl font-bold text-slate-950">Your details are saved</h2>
            {result.subscribeUrl ? (
              <>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The last step is on MTN's page, where you confirm the ₦{SITE.sms.pricePerDay} daily charge. Nothing
                  is charged until you confirm there.
                </p>
                <a
                  href={result.subscribeUrl}
                  className="mt-5 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Continue to MTN to confirm
                </a>
              </>
            ) : (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We will text you a link to confirm your subscription on MTN. Nothing is charged until you confirm.
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="mt-4 text-xl font-bold text-slate-950">You're on the list</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              FinSight SMS is not yet live on your network. We will text you once, when it is. You will not be charged
              anything unless you choose to subscribe then.
            </p>
          </>
        )}
      </div>
    );
  }

  const isMtn = form.network === "mtn";
  const otherNetwork = form.network && !isMtn;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div>
        <label htmlFor="sub-name" className="mb-1.5 block text-sm font-medium text-slate-800">
          Full name
        </label>
        <input id="sub-name" autoComplete="name" className={field} value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)} />
      </div>

      <div>
        <label htmlFor="sub-phone" className="mb-1.5 block text-sm font-medium text-slate-800">
          Mobile number
        </label>
        <input id="sub-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0803 123 4567"
          className={field} value={form.phone} onChange={(e) => update("phone", e.target.value)} />
      </div>

      <div>
        <label htmlFor="sub-network" className="mb-1.5 block text-sm font-medium text-slate-800">
          Network
        </label>
        <select id="sub-network" className={field} value={form.network}
          onChange={(e) => { setNetworkTouched(true); update("network", e.target.value); }}>
          <option value="">Choose your network</option>
          {NETWORKS.map((n) => (
            <option key={n.value} value={n.value}>{n.label}</option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-slate-500">We suggest one from your number. Change it if you have ported.</p>
      </div>

      <div>
        <label htmlFor="sub-email" className="mb-1.5 block text-sm font-medium text-slate-800">
          Email <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input id="sub-email" type="email" autoComplete="email" className={field} value={form.email}
          onChange={(e) => update("email", e.target.value)} />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="sub-website">Website</label>
        <input id="sub-website" tabIndex={-1} autoComplete="off" value={form.website}
          onChange={(e) => update("website", e.target.value)} />
      </div>

      {isMtn && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-slate-800">
          <p className="font-semibold">₦{SITE.sms.pricePerDay} per day, charged to your MTN airtime</p>
          <p className="mt-1">
            The service renews every day until you stop it. You confirm the subscription on MTN's page before any
            charge. You can stop at any time.
          </p>
        </div>
      )}
      {otherNetwork && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800">
          FinSight SMS is live on MTN today. Join the waitlist and we will text you when it reaches your network. No
          charge applies.
        </div>
      )}

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-blue-700" checked={form.consentProcessing}
            onChange={(e) => update("consentProcessing", e.target.checked)} />
          <span>
            I agree that {SITE.operator} may use my details to set up FinSight SMS or add me to the waitlist, as
            explained in the{" "}
            <Link to="/privacy" className="font-medium text-blue-700 underline">Privacy Policy</Link>. I have read the{" "}
            <Link to="/terms" className="font-medium text-blue-700 underline">Terms of Use</Link>.
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-blue-700" checked={form.consentMarketing}
            onChange={(e) => update("consentMarketing", e.target.checked)} />
          <span>Also send me occasional offers and news about FinSight. Optional, and you can stop any time.</span>
        </label>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button type="submit" disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70">
        {busy && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {busy ? "Saving" : otherNetwork ? "Join the waitlist" : "Continue"}
      </button>
    </form>
  );
}
