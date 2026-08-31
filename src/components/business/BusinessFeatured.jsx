import { Clock3 } from "lucide-react";
import SubscriptionGate from "../subscription/SubscriptionGate";

function SmallStory({ story }) {
  return (
    <SubscriptionGate sourcePage="business" trigger="featured_story_click">
      <article className="group grid grid-cols-[130px_1fr] gap-4 border-b border-slate-200 pb-5 last:border-0 last:pb-0 sm:grid-cols-[160px_1fr]">
        <div className="overflow-hidden rounded-lg">
          <img
            src={story.image}
            alt={story.title}
            className="h-28 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-32"
          />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
            {story.category}
          </span>

          <h3 className="mt-1 text-sm font-bold leading-5 text-slate-900 transition group-hover:text-blue-600">
            {story.title}
          </h3>

          <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
            <Clock3 size={12} />
            {story.publishedAt}
          </div>
        </div>
      </article>
    </SubscriptionGate>
  );
}

export default function BusinessFeatured({ stories }) {
  const [lead, ...secondary] = stories;

  return (
    <section className="mt-10">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Business Desk
        </p>

        <h2 className="mt-1 text-2xl font-extrabold text-slate-950">
          Featured Business Stories
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Lead story */}
        <SubscriptionGate sourcePage="business" trigger="featured_story_click">
          <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-hidden">
              <img
                src={lead.image}
                alt={lead.title}
                className="h-75 w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-95"
              />
            </div>

            <div className="p-5 sm:p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                {lead.category}
              </span>

              <h3 className="mt-2 text-xl font-extrabold leading-tight text-slate-950 sm:text-2xl">
                {lead.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {lead.description}
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs text-slate-400">
                <Clock3 size={13} />
                {lead.publishedAt}
              </div>
            </div>
          </article>
        </SubscriptionGate>

        {/* Secondary stories */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="space-y-5">
            {secondary.map((story) => (
              <SmallStory key={story.id} story={story} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
