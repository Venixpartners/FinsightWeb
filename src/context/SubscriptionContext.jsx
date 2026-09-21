import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubscriptionPrompt from "../components/subscription/SubscriptionPrompt";

const SubscriptionContext = createContext(null);

const PROMPT_DELAY = 45000;
const SEEN_KEY = "finsight_prompt_seen";
const QUIET_PATHS = ["/subscribe", "/privacy", "/terms", "/disclaimer", "/cookies", "/contact"];

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Private browsing can block storage. The prompt then shows at most once per page load.
  }
}

// Shows the SMS offer at most once per browser session: after a visitor
// opens their second story, or after 45 seconds, whichever comes first.
export function SubscriptionProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState("timed_prompt");
  const shownRef = useRef(alreadySeen());
  const opened = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const quiet = QUIET_PATHS.some((p) => location.pathname.startsWith(p));

  const show = useCallback(
    (why) => {
      if (shownRef.current || quiet) return;
      shownRef.current = true;
      markSeen();
      setTrigger(why);
      setOpen(true);
    },
    [quiet],
  );

  useEffect(() => {
    const timer = setTimeout(() => show("timed_prompt"), PROMPT_DELAY);
    return () => clearTimeout(timer);
  }, [show]);

  const noteArticleOpened = useCallback(() => {
    opened.current += 1;
    if (opened.current >= 2) show("article_click");
  }, [show]);

  function goToSubscribe() {
    setOpen(false);
    const from = location.pathname.replace(/^\//, "") || "home";
    navigate(`/subscribe?from=${encodeURIComponent(from)}&trigger=${trigger}`);
  }

  return (
    <SubscriptionContext.Provider value={{ noteArticleOpened }}>
      {children}
      <SubscriptionPrompt isOpen={open} onClose={() => setOpen(false)} onSubscribe={goToSubscribe} />
    </SubscriptionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSubscriptionPrompt() {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error("useSubscriptionPrompt must be used inside SubscriptionProvider");
  return context;
}
