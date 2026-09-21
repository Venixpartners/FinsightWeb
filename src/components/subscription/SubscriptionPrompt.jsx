import { useEffect, useRef } from "react";
import { MessageSquareText, X } from "lucide-react";

export default function SubscriptionPrompt({ isOpen, onClose, onSubscribe }) {
  const primaryRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    primaryRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="prompt-title"
        className="relative w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <X size={19} />
        </button>

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">
          <MessageSquareText size={25} aria-hidden="true" />
        </div>

        <h2 id="prompt-title" className="text-2xl font-bold text-slate-900">
          Get the day's money news by SMS
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          A short daily text with the business, market and economy stories that matter in Nigeria. Available now on
          MTN, with other networks coming.
        </p>

        <button
          ref={primaryRef}
          type="button"
          onClick={onSubscribe}
          className="mt-6 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          See how it works
        </button>

        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-lg px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Keep reading
        </button>
      </div>
    </div>
  );
}
