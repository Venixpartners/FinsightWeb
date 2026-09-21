import { normalisePhone, NETWORKS, CONSENT_VERSION } from "../shared/phone.js";

const NETWORK_VALUES = new Set(NETWORKS.map((n) => n.value));
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Best effort throttle per warm instance. The database also deduplicates.
const recent = new Map();
function throttled(ip) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > 8;
}

function clean(value, max) {
  if (typeof value !== "string") return null;
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { SUPABASE_URL, SUPABASE_ANON_KEY, MTN_SUBSCRIPTION_URL } = process.env;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(503).json({ error: "Sign up is temporarily unavailable. Please try again later." });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  // Hidden field that people never see. Bots fill it in.
  if (body.website) return res.status(200).json({ ok: true, status: "pending" });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (throttled(ip)) {
    return res.status(429).json({ error: "Too many attempts. Please wait a few minutes and try again." });
  }

  const channel = body.channel === "newsletter" ? "newsletter" : "sms";
  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 200);
  const phone = channel === "sms" ? normalisePhone(body.phone) : null;
  const network = channel === "sms" && NETWORK_VALUES.has(body.network) ? body.network : null;

  if (body.consentProcessing !== true) {
    return res.status(400).json({ error: "Please tick the box to agree to the Privacy Policy." });
  }
  if (channel === "sms") {
    if (!fullName) return res.status(400).json({ error: "Enter your full name." });
    if (!phone) return res.status(400).json({ error: "Enter a valid Nigerian mobile number, for example 0803 123 4567." });
    if (!network) return res.status(400).json({ error: "Choose your mobile network." });
    if (email && !EMAIL.test(email)) return res.status(400).json({ error: "Check the email address, or leave it blank." });
  } else if (!email || !EMAIL.test(email)) {
    return res.status(400).json({ error: "Enter a valid email address." });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/finsight_submit_lead`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        // Legacy anon keys are JWTs and also go in Authorization. New publishable keys do not.
        ...(SUPABASE_ANON_KEY.startsWith("eyJ") ? { Authorization: `Bearer ${SUPABASE_ANON_KEY}` } : {}),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_channel: channel,
        p_full_name: fullName,
        p_phone: phone,
        p_email: email,
        p_network: network,
        p_source_page: clean(body.sourcePage, 60),
        p_trigger: clean(body.trigger, 60),
        p_consent_processing: true,
        p_consent_marketing: channel === "newsletter" ? true : body.consentMarketing === true,
        p_consent_version: CONSENT_VERSION,
      }),
    });

    if (!response.ok) throw new Error(`Database responded ${response.status}`);
    const status = await response.json();

    return res.status(200).json({
      ok: true,
      status,
      subscribeUrl: channel === "sms" && network === "mtn" ? MTN_SUBSCRIPTION_URL || null : null,
    });
  } catch (error) {
    console.error("lead save failed", error.message);
    return res.status(502).json({ error: "We could not save your details. Please try again." });
  }
}

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}
