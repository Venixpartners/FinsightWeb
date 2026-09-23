import LegalPage, { H2, P } from "../components/legal/LegalPage";

function Disclaimer() {
  return (
    <LegalPage title="Disclaimer"
      intro="FinSight helps you keep up with financial news. It does not tell you what to do with your money.">
      <H2>Not financial advice</H2>
      <P>
        Nothing on this website or in FinSight messages is investment, financial, tax or legal advice, or an offer or
        recommendation to buy, sell or hold any investment. Prices go down as well as up. Speak to a licensed adviser
        before making financial decisions.
      </P>
      <H2>News from other publishers</H2>
      <P>
        Headlines and summaries are written by the publishers named on each story, not by FinSight. We do not check or
        endorse their reporting. Read the full article on the publisher's site for context.
      </P>
      <H2>Rates and figures</H2>
      <P>
        Naira exchange rates on this site are daily mid market reference rates from an independent data provider. They
        are not CBN official rates and may differ from the rates offered by banks, bureaux de change or on the street.
        The Bitcoin price comes from CoinGecko and may be delayed. Economic figures are entered from official NBS and CBN
        releases, with the release date shown. Always check the original source before relying on a number.
      </P>
      <H2>Availability</H2>
      <P>
        Data sources can be delayed or unavailable. When that happens, we show that the information is unavailable
        rather than an old or estimated figure.
      </P>
    </LegalPage>
  );
}

export default Disclaimer;
