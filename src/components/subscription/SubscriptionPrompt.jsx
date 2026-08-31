import { ArrowRight, X } from "lucide-react";

export default function SubscriptionPrompt({ isOpen, onClose, onSubscribe }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <X size={19} />
        </button>

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <ArrowRight size={25} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">
          Want more from Finsight?
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Subscribe to get access to more business, financial and economic news.
        </p>

        <button
          type="button"
          onClick={onSubscribe}
          className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Subscribe Now
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-lg px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Continue Browsing
        </button>
      </div>
    </div>
  );
}
