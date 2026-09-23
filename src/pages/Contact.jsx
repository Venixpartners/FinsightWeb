import LegalPage, { A, H2, P } from "../components/legal/LegalPage";
import { SITE, stopWording } from "../config/site";

function Contact() {
  return (
    <LegalPage title="Contact us" showUpdated={false}>
      <H2>General enquiries and publisher requests</H2>
      <P><A href={`mailto:${SITE.generalEmail}`}>{SITE.generalEmail}</A></P>
      <H2>Privacy and your data</H2>
      <P>
        {SITE.dpo.name}, {SITE.dpo.title}: <A href={`mailto:${SITE.dpo.email}`}>{SITE.dpo.email}</A>
      </P>
      <H2>Stopping FinSight SMS or a billing query</H2>
      <P>
        {stopWording()} Include the mobile number you subscribed with, and for a billing query, the date of the charge.
      </P>
      <H2>Post</H2>
      <P>{SITE.operator}, {SITE.address}</P>
    </LegalPage>
  );
}

export default Contact;
