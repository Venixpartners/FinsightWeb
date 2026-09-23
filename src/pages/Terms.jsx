import { Link } from "react-router-dom";
import LegalPage, { A, H2, P, UL } from "../components/legal/LegalPage";
import { SITE, stopWording } from "../config/site";

function Terms() {
  return (
    <LegalPage title="Terms of Use"
      intro={`These terms apply to the FinSight website and the FinSight SMS service, both operated by ${SITE.operator} (${SITE.rcNumber}). By using the website or subscribing to the SMS service, you agree to them.`}>

      <H2>1. What FinSight provides</H2>
      <P>
        The FinSight website brings together business, market and economy headlines published by other news
        organisations and links to their original articles. It also shows reference exchange rates and official economic
        figures from the sources named beside them. FinSight SMS is a daily text message service with a summary of key
        financial news.
      </P>

      <H2>2. FinSight SMS</H2>
      <UL items={[
        `Price: ₦${SITE.sms.pricePerDay} per day, charged to your ${SITE.sms.network} airtime. Your network may also apply its own charges.`,
        "Renewal: the service renews automatically every day until you stop it. If you do not have enough airtime, the message may not be sent that day, and renewal may be attempted again.",
        "Confirmation: you confirm the subscription on your network's page or by the method your network uses before you are charged.",
        `Stopping: you can stop at any time. ${stopWording()}`,
        "Other networks: the service is currently available on MTN. If you join the waitlist on another network, you are not subscribed and will not be charged. We will contact you once when the service becomes available on your network.",
        "Age: you must be 18 or over, and the account holder of the mobile number, or have their permission, to subscribe.",
        "Availability: we aim to send one message every day, but delivery depends on your network and may be delayed or missed. We are not liable for messages that cannot be delivered for reasons outside our control.",
      ]} />
      <P>
        If you believe you were charged in error, contact us using the details on our{" "}
        <Link to="/contact" className="font-medium text-blue-700 underline">Contact</Link> page. We will look into it and
        work with your network to put right any charge made in error. You may also contact your network's customer care.
      </P>

      <H2>3. Not financial advice</H2>
      <P>
        Nothing on the website or in our messages is investment, financial, tax or legal advice, or a recommendation to
        buy or sell anything. Please read our <Link to="/disclaimer" className="font-medium text-blue-700 underline">Disclaimer</Link>.
      </P>

      <H2>4. Third party content</H2>
      <P>
        Headlines, summaries and images from other publishers remain the property of those publishers. We show a short
        extract and send you to the publisher to read the full story. We do not control and are not responsible for the
        content of other websites. If you are a publisher and would like your content handled differently, contact us.
      </P>

      <H2>5. Our content</H2>
      <P>
        The FinSight name, logo, site design and our own text belong to {SITE.operator}. You may share links to our pages
        and quote short extracts with credit. You may not copy the site or our messages in bulk, or present them as your
        own.
      </P>

      <H2>6. Acceptable use</H2>
      <UL items={[
        "Do not sign up anyone else without their permission.",
        "Do not submit false information or use automated tools to submit forms.",
        "Do not try to disrupt, overload or gain unauthorised access to the website or its systems.",
      ]} />

      <H2>7. Liability</H2>
      <P>
        We take care to present information accurately, but we provide the website and the SMS service as they are,
        without guarantees that they will be complete, current or free of errors. To the extent the law allows, we are not
        liable for any loss arising from reliance on information on the website or in our messages, or for indirect or
        consequential loss. Nothing in these terms limits any liability that cannot be limited under Nigerian law,
        including your rights as a consumer under the Federal Competition and Consumer Protection Act 2018 and the rules of
        the Nigerian Communications Commission.
      </P>

      <H2>8. Your data</H2>
      <P>
        Our <Link to="/privacy" className="font-medium text-blue-700 underline">Privacy Policy</Link> explains how we use
        your personal data.
      </P>

      <H2>9. Changes</H2>
      <P>
        We may update these terms. The date at the top shows the latest version. If we change the price or other key terms
        of FinSight SMS, we will tell subscribers by SMS before the change takes effect, and you can stop the service if
        you do not agree.
      </P>

      <H2>10. Law and disputes</H2>
      <P>
        These terms are governed by the laws of the Federal Republic of Nigeria. We will try to resolve any complaint with
        you directly first. If that does not work, the courts of Lagos State will have jurisdiction, without affecting
        your right to complain to the Nigerian Communications Commission or any other regulator.
      </P>

      <H2>11. Contact</H2>
      <P>
        {SITE.operator}, {SITE.address}. Email <A href={`mailto:${SITE.generalEmail}`}>{SITE.generalEmail}</A>.
      </P>
    </LegalPage>
  );
}

export default Terms;
