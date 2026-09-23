// Single place for company and offer details used across the site and legal pages.
export const SITE = {
  name: "FinSight",
  // Public address of the site. Change this one line when a custom domain is connected.
  url: "https://finsight-web-mente-rica-s-projects.vercel.app",
  operator: "Venix Partners Limited",
  rcNumber: "RC 1907456",
  address: "35 Yesufu Sanusi Street, Surulere, Lagos, Nigeria",
  licence: "Licensed by the Nigerian Communications Commission as a value-added service provider",
  generalEmail: "hello@venixpartners.com",
  dpo: {
    name: "Adewale Adeniji",
    title: "Data Protection Officer",
    email: "adewale@venixpartners.com",
  },
  sms: {
    network: "MTN",
    pricePerDay: 100,
    // Set this once the short code and keyword are confirmed, for example
    // "Text STOP to 12345". Until then the pages use the general wording.
    stopInstruction: null,
  },
  legalUpdated: "21 September 2026",
};

export function stopWording() {
  return SITE.sms.stopInstruction
    ? `${SITE.sms.stopInstruction}, or contact us using the details on our Contact page.`
    : "Follow the opt out instruction in your welcome SMS, or contact us using the details on our Contact page and we will stop the service for you.";
}
