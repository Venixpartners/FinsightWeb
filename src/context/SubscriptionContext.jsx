import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubscriptionPrompt from "../components/subscription/SubscriptionPrompt";

const SubscriptionContext = createContext(null);

const PROMPT_DELAY = 3000;
const QUIET_PATHS = ["/subscribe"];

// Shows the SMS offer on every page a visitor lands on, a few seconds after
// the page loads. Dismissing it only closes it for the current page.
export function SubscriptionProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === path;

  const quiet = QUIET_PATHS.some((p) => path.startsWith(p));

  useEffect(() => {
    if (quiet) return;
    const timer = setTimeout(() => setOpenOn(path), PROMPT_DELAY);
    return () => clearTimeout(timer);
  }, [path, quiet]);

  // Kept so story cards that still call it keep working.
  const noteArticleOpened = useCallback(() => {}, []);

  function goToSubscribe() {
    setOpenOn(null);
    const from = path.replace(/^\//, "") || "home";
    navigate(`/subscribe?from=${encodeURIComponent(from)}&trigger=page_view`);
  }

  return (
    <SubscriptionContext.Provider value={{ noteArticleOpened }}>
      {children}
      <SubscriptionPrompt isOpen={open} onClose={() => setOpenOn(null)} onSubscribe={goToSubscribe} />
    </SubscriptionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSubscriptionPrompt() {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscriptionPrompt must be used inside SubscriptionProvider");
  return context;
}
