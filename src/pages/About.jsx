import { Link } from "react-router-dom";
import LegalPage, { H2, P } from "../components/legal/LegalPage";
import { SITE } from "../config/site";

function About() {
  return (
    <LegalPage title="About FinSight" showUpdated={false}
      intro="FinSight keeps Nigerians up to date on business, markets and the economy, on the web and by SMS.">
      <H2>How the website works</H2>
      <P>
        We gather headlines from established Nigerian business publishers through the feeds they publish, sort them by
        topic and link every story back to the publisher. Exchange rates and the Bitcoin price come from the independent
        providers named beside them. Economic figures come from the National Bureau of Statistics and the Central Bank of
        Nigeria, with the release date shown.
      </P>
      <H2>FinSight by SMS</H2>
      <P>
        A daily text with the stories that matter, for people who want the news without data costs or long reads. It is
        available on MTN today, and anyone on another network can{" "}
        <Link to="/subscribe" className="font-medium text-blue-700 underline">join the waitlist</Link>.
      </P>
      <H2>Who runs it</H2>
      <P>
        FinSight is a service of {SITE.operator} ({SITE.rcNumber}), a Lagos company. {SITE.licence}.
      </P>
    </LegalPage>
  );
}

export default About;
