# FinSight website

Public website for FinSight, a service of Venix Partners Limited. React and Vite on the front end, Vercel functions in `api/` for everything that touches a third party or a secret.

## What comes from where

| Section | Source | Refresh |
| --- | --- | --- |
| News | RSS feeds from Nigerian business publishers, listed in `api/_lib/feeds.js` | Cached 10 minutes at the Vercel edge |
| Naira rates | ExchangeRate API open access endpoint (attribution shown on site) | Daily at source, cached 15 minutes |
| Bitcoin | CoinGecko public API | Cached 15 minutes |
| Economic indicators | Entered by hand in `src/content/indicators.js` from NBS and CBN releases | Update after each release |

No figure on the site is invented. If a source fails, the site says so instead of showing an old or estimated number.

## Sign ups

`/subscribe` and the newsletter post to `/api/lead`, which calls the `finsight_submit_lead` database function in Supabase. The public key can only call that function; it cannot read the `finsight_leads` table. Duplicate numbers update the existing record.

Numbers by network, channel and status are in the `finsight_lead_summary` view in the Supabase dashboard.

## Keeping things current

* Indicators: edit `src/content/indicators.js` when NBS or CBN publish.
* SMS stop instruction and price: edit `src/config/site.js`. Set `stopInstruction` once the short code is confirmed.
* Consent wording: if you change the consent text on the forms, bump `CONSENT_VERSION` in `shared/phone.js`.

## Local development

```
npm install
cp .env.example .env   # fill in values
npx vercel dev          # runs the site and the api functions together
```
