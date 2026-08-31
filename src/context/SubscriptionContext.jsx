import { createContext, useContext, useState } from "react";
import SubscriptionPrompt from "../components/subscription/SubscriptionPrompt";
import SubscriptionForm from "../components/subscription/SubscriptionForm";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [promptOpen, setPromptOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [subscriptionContext, setSubscriptionContext] = useState({
    sourcePage: "unknown",
    trigger: "subscription_prompt",
  });

  function openSubscriptionPrompt({
    sourcePage = "unknown",
    trigger = "subscription_prompt",
  } = {}) {
    setSubscriptionContext({
      sourcePage,
      trigger,
    });

    setPromptOpen(true);
  }

  function closeSubscriptionPrompt() {
    setPromptOpen(false);
  }

  function proceedToForm() {
    setPromptOpen(false);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
  }

  return (
    <SubscriptionContext.Provider
      value={{
        openSubscriptionPrompt,
        closeSubscriptionPrompt,
      }}
    >
      {children}

      <SubscriptionPrompt
        isOpen={promptOpen}
        onClose={closeSubscriptionPrompt}
        onSubscribe={proceedToForm}
      />

      <SubscriptionForm
        isOpen={formOpen}
        onClose={closeForm}
        sourcePage={subscriptionContext.sourcePage}
        trigger={subscriptionContext.trigger}
      />
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptionPrompt() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscriptionPrompt must be used inside SubscriptionProvider",
    );
  }

  return context;
}
