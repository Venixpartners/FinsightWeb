import { useSubscriptionPrompt } from "../../context/SubscriptionContext";

export default function SubscriptionGate({
  children,
  sourcePage = "unknown",
  trigger = "article_click",
}) {
  const { openSubscriptionPrompt } = useSubscriptionPrompt();

  function handleClick() {
    openSubscriptionPrompt({
      sourcePage,
      trigger,
    });
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
}
