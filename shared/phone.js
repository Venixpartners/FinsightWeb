// Nigerian mobile number helpers shared by the browser and the server.

// Prefix hints only. Numbers can be ported between networks, so the user
// always confirms their network on the form.
const PREFIXES = {
  mtn: ["0703", "0706", "0707", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913", "0916", "07025", "07026", "0704"],
  airtel: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0904", "0907", "0911", "0912"],
  glo: ["0705", "0805", "0807", "0811", "0815", "0905", "0915"],
  "9mobile": ["0809", "0817", "0818", "0908", "0909"],
};

export const NETWORKS = [
  { value: "mtn", label: "MTN" },
  { value: "airtel", label: "Airtel" },
  { value: "glo", label: "Glo" },
  { value: "9mobile", label: "9mobile" },
  { value: "other", label: "Other" },
];

export function normalisePhone(input) {
  const digits = String(input || "").replace(/[^\d+]/g, "");
  let local = null;
  if (/^0[789][01]\d{8}$/.test(digits)) local = digits.slice(1);
  else if (/^\+234[789][01]\d{8}$/.test(digits)) local = digits.slice(4);
  else if (/^234[789][01]\d{8}$/.test(digits)) local = digits.slice(3);
  else if (/^[789][01]\d{8}$/.test(digits)) local = digits;
  return local ? `+234${local}` : null;
}

export function guessNetwork(input) {
  const e164 = normalisePhone(input);
  if (!e164) return null;
  const national = `0${e164.slice(4)}`;
  // Check five digit prefixes before four digit ones.
  for (const [network, list] of Object.entries(PREFIXES)) {
    if (list.some((p) => p.length === 5 && national.startsWith(p))) return network;
  }
  for (const [network, list] of Object.entries(PREFIXES)) {
    if (list.some((p) => p.length === 4 && national.startsWith(p))) return network;
  }
  return null;
}

export const CONSENT_VERSION = "2026-09-21";
