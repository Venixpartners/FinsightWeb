export function timeAgo(iso) {
  if (!iso) return "";
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDate(iso);
}

export function formatDate(iso, withTime = false) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Lagos",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export function money(value, currency, digits = 2) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "Unavailable";
  const symbol = currency === "NGN" ? "₦" : currency === "USD" ? "$" : "";
  return `${symbol}${value.toLocaleString("en-NG", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}
