import { useSearchParams } from "react-router-dom";
import PageIntro from "../components/common/PageIntro";
import SubscribeForm from "../components/subscription/SubscribeForm";
import useTitle from "../lib/useTitle";
import { SITE, stopWording } from "../config/site";

const facts = [
  { q: "What do I get?", a: "One text a day with the business, market and economy stories that matter in Nigeria." },
  {
    q: "What does it cost?",
    a: `₦${SITE.sms.pricePerDay} per day on ${SITE.sms.network}, charged to your airtime. The service renews daily until you stop it.`,
  },
  {
    q: "I am not on MTN.",
    a: "Airtel, Glo and 9mobile users can join the waitlist now at no cost. We will text you once when FinSight reaches your network.",
  },
  { q: "How do I stop?", a: stopWording() },
  {
    q: "What happens to my details?",
    a: `${SITE.operator} keeps them to run the service and will never sell them. The Privacy Policy explains what we hold and your rights.`,
  },
];

function Subscribe() {
  useTitle("Get SMS updates");
  const [params] = useSearchParams();

  return (
    <>
      <PageIntro title="FinSight by SMS"
        description="The day's key money news in one text message. Sign up on MTN today, or join the waitlist on any other network." />
      <div className="mx-auto grid max-w-350 gap-10 px-5 py-10 sm:px-7 lg:grid-cols-[1fr_1fr]">
        <SubscribeForm sourcePage={params.get("from") || "subscribe"} trigger={params.get("trigger") || "subscribe_page"} />
        <section aria-labelledby="sms-faq">
          <h2 id="sms-faq" className="text-xl font-extrabold text-slate-950">Before you sign up</h2>
          <dl className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {facts.map((f) => (
              <div key={f.q} className="p-5">
                <dt className="text-sm font-bold text-slate-900">{f.q}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-slate-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}

export default Subscribe;
