import { Link } from "react-router-dom";
import LegalPage, { H2, P, UL } from "../components/legal/LegalPage";

function Cookies() {
  return (
    <LegalPage title="Cookies"
      intro="FinSight does not use advertising cookies, tracking pixels or third party analytics.">
      <H2>What we store in your browser</H2>
      <UL items={[
        "Session storage: one setting that remembers you have already seen the SMS offer, so it does not appear again during your visit. It is cleared when you close the browser.",
        "Offline files: the site saves its own design and code files in your browser so pages load faster and the site can be installed on your phone. These files contain no personal data.",
      ]} />
      <P>
        Both are strictly necessary for the site to work as you would expect, so they do not require consent. You can
        clear them at any time in your browser settings.
      </P>
      <H2>Other websites</H2>
      <P>
        Pictures beside some headlines load from the publisher's own servers. When you open a story, you leave FinSight and
        the publisher's cookie policy applies.
      </P>
      <P>
        Read more in our <Link to="/privacy" className="font-medium text-blue-700 underline">Privacy Policy</Link>.
      </P>
    </LegalPage>
  );
}

export default Cookies;
