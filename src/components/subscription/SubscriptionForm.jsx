import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { saveSubscriptionLead } from "../../services/subscriptionService";

const SUBSCRIPTION_URL = import.meta.env.VITE_SUBSCRIPTION_URL;

export default function SubscriptionForm({
  isOpen,
  onClose,
  sourcePage = "unknown",
  trigger = "subscription_prompt",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name || !email || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await saveSubscriptionLead({
        name,
        email,
        phone,
        sourcePage,
        trigger,
      });

      // Send the user to the existing Finsight platform
      window.location.assign(SUBSCRIPTION_URL);
    } catch (error) {
      console.error("Failed to save subscription lead:", error);

      setError("We couldn't process your request. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        <div className="mb-6 pr-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Stay informed with Finsight
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Get access to more business, market and economic news. Enter your
            details to continue to subscription.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08012345678"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing...
              </>
            ) : (
              "Proceed to Subscribe"
            )}
          </button>

          <p className="text-center text-xs leading-5 text-slate-500">
            Your information will be used to help you continue to Finsight's
            subscription service.
          </p>
        </form>
      </div>
    </div>
  );
}
