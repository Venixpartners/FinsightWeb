import { Link } from "react-router-dom";
import LegalPage, { A, H2, H3, P, UL } from "../components/legal/LegalPage";
import { SITE } from "../config/site";

function Privacy() {
  return (
    <LegalPage title="Privacy Policy"
      intro={`This policy explains what personal data FinSight collects, why, who we share it with, how long we keep it and the rights you have. It is written to meet the Nigeria Data Protection Act 2023 and the General Application and Implementation Directive issued under it.`}>

      <H2>1. Who we are</H2>
      <P>
        FinSight is operated by {SITE.operator} ({SITE.rcNumber}), {SITE.address}. For the purposes of the Nigeria
        Data Protection Act 2023 ("the Act"), {SITE.operator} is the data controller for the personal data described in
        this policy. In this policy "we", "us" and "our" mean {SITE.operator}.
      </P>
      <P>
        Our Data Protection Officer is {SITE.dpo.name}. You can reach our Data Protection Officer at{" "}
        <A href={`mailto:${SITE.dpo.email}`}>{SITE.dpo.email}</A> or by post at the address above, marked for the
        attention of the Data Protection Officer.
      </P>

      <H2>2. What we collect</H2>
      <H3>Information you give us</H3>
      <UL items={[
        "When you sign up for FinSight SMS or join the waitlist: your full name, mobile number, mobile network and, if you choose to give it, your email address.",
        "When you join the newsletter: your email address.",
        "Your choices: whether you agreed to this policy, whether you opted in to marketing messages, the version of the wording you agreed to, and when.",
        "Where you came from on our site, such as the page you were reading when you signed up. This helps us understand which pages lead people to subscribe.",
        "Anything you send us when you contact us, such as the content of an email.",
      ]} />
      <H3>Information collected automatically</H3>
      <UL items={[
        "Our hosting provider records technical information when you visit, including your IP address, browser type, the pages requested and the time of the request. These server logs are used to keep the site running and secure.",
        "We do not use advertising cookies, tracking pixels or third party analytics on this website.",
      ]} />
      <H3>Information from others</H3>
      <P>
        If you subscribe to FinSight SMS, MTN Nigeria and our SMS delivery partners tell us whether your subscription is
        active, renewed or stopped, so that we can keep our records accurate and handle your requests.
      </P>
      <P>
        We do not ask for and do not want sensitive personal data, such as information about your health, religion or
        finances. Please do not send it to us.
      </P>

      <H2>3. Why we use it and our lawful basis</H2>
      <P>The Act requires us to have a lawful basis for each use of your data. Ours are:</P>
      <UL items={[
        <><strong>To set up and run your FinSight SMS subscription</strong>, including sending you the daily message and handling requests to stop. Lawful basis: performance of a contract with you, and steps you asked us to take before entering into it.</>,
        <><strong>To keep you on the waitlist and tell you once when FinSight SMS reaches your network.</strong> Lawful basis: your consent.</>,
        <><strong>To send the newsletter and, if you opted in, occasional offers and news about FinSight.</strong> Lawful basis: your consent, which you can withdraw at any time.</>,
        <><strong>To count and analyse sign ups</strong>, for example how many people joined from each network or page, so we can plan where to launch next. We use counts and totals for this, not individual profiles. Lawful basis: our legitimate interest in running and growing the service, balanced against your rights.</>,
        <><strong>To keep the site and our records secure</strong>, prevent spam and misuse, and fix problems. Lawful basis: our legitimate interest in protecting our service and users.</>,
        <><strong>To meet our legal and regulatory duties</strong>, including rules set by the Nigerian Communications Commission for value added services, tax and accounting rules, and lawful requests from authorities. Lawful basis: legal obligation.</>,
      ]} />
      <P>
        We do not sell your personal data. We do not make decisions about you based solely on automated processing that
        produce legal or similarly significant effects.
      </P>

      <H2>4. Who we share it with</H2>
      <P>We share personal data only where needed for the purposes above, with:</P>
      <UL items={[
        "MTN Nigeria Communications Plc, if you subscribe on MTN, so the subscription can be confirmed, billed to your airtime and stopped when you ask. MTN also processes your data under its own privacy policy.",
        "Our licensed SMS aggregation and delivery partners, who send the messages to your phone.",
        "Supabase Inc., which hosts our database.",
        "Vercel Inc., which hosts this website and the functions that receive your form.",
        "Our professional advisers, such as lawyers and auditors, where necessary.",
        "Regulators, law enforcement or courts, where the law requires it.",
        "A buyer or successor business, if all or part of our business is sold or reorganised, under the same protections as this policy.",
      ]} />
      <P>
        Our service providers act on our instructions, may only use your data to provide their service to us, and must
        keep it secure.
      </P>

      <H2>5. Transfers outside Nigeria</H2>
      <P>
        Our database is hosted in the United Kingdom and our website is hosted by a provider based in the United States
        that serves pages from locations around the world. This means your data is transferred outside Nigeria. Under
        sections 41 to 43 of the Act, we only make these transfers where the destination provides an adequate level of
        protection or where appropriate safeguards are in place, such as binding contractual commitments from our
        providers to protect your data.
      </P>

      <H2>6. How long we keep it</H2>
      <UL items={[
        "Waitlist and sign up details where you do not go on to subscribe: 12 months from your most recent sign up, then deleted.",
        "Subscriber records: while you are subscribed, and afterwards only for as long as we need them for billing queries, tax, audit or regulatory purposes, and no longer than six years.",
        "Newsletter and marketing preferences: until you unsubscribe or withdraw consent. We keep a short record that you opted out so we do not contact you again.",
        "Server logs: kept by our hosting provider for a short period in line with its own retention settings.",
        "Messages you send us: up to 24 months after the matter is closed.",
      ]} />

      <H2>7. Your rights</H2>
      <P>Under the Act you have the right to:</P>
      <UL items={[
        "be told how your data is used, which is the purpose of this policy;",
        "get a copy of the personal data we hold about you;",
        "have inaccurate or incomplete data corrected;",
        "have your data deleted where there is no good reason for us to keep it;",
        "ask us to restrict how we use your data in certain cases;",
        "receive your data in a structured, commonly used format and have it sent to another organisation, where technically possible;",
        "object to our use of your data based on legitimate interests, and object at any time to direct marketing;",
        "withdraw your consent at any time, without affecting what we did before you withdrew it;",
        "not be subject to a decision based solely on automated processing that significantly affects you.",
      ]} />
      <P>
        To use any of these rights, email <A href={`mailto:${SITE.dpo.email}`}>{SITE.dpo.email}</A>. We may ask you to
        confirm your identity, for example by replying from the phone number or email address you signed up with. We
        will respond within 30 days. Using your rights is free, unless a request is clearly unfounded or excessive.
      </P>

      <H2>8. Complaints</H2>
      <P>
        If you are unhappy with how we have handled your data, please contact our Data Protection Officer first so we can
        try to put it right. You also have the right to complain to the Nigeria Data Protection Commission, No. 12 Clement
        Isong Street, Asokoro, Abuja, <A href="https://ndpc.gov.ng">ndpc.gov.ng</A>.
      </P>

      <H2>9. How we protect your data</H2>
      <P>
        Data sent through our forms is encrypted in transit. Our database cannot be read from the public website: the
        site can only add new sign ups, and access to stored records is limited to authorised staff. If a breach occurs
        that is likely to put your rights at risk, we will notify the Nigeria Data Protection Commission within 72 hours
        of becoming aware of it, and tell you without undue delay where the risk to you is high.
      </P>

      <H2>10. Cookies and similar technologies</H2>
      <P>
        We do not set advertising or analytics cookies. We use a small amount of storage in your browser so the site
        works properly, as explained on our <Link to="/cookies" className="font-medium text-blue-700 underline">Cookies</Link> page.
      </P>

      <H2>11. Links to other websites</H2>
      <P>
        FinSight shows headlines from other publishers and links to their websites. Pictures shown beside some headlines
        load from those publishers' servers, which will receive your IP address. When you open a story you leave our site,
        and the publisher's own privacy policy applies.
      </P>

      <H2>12. Children</H2>
      <P>
        FinSight is not intended for anyone under 18. We do not knowingly collect data from children. If you believe a
        child has given us their details, contact us and we will delete them.
      </P>

      <H2>13. Changes to this policy</H2>
      <P>
        We will update this page when our practices change and show the new date at the top. If a change materially
        affects how we use data you have already given us, we will tell you by SMS or email before it takes effect and,
        where required, ask for your consent again.
      </P>
    </LegalPage>
  );
}

export default Privacy;
