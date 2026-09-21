import { useEffect } from "react";

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | FinSight` : "FinSight | Nigerian business, markets and economy news";
  }, [title]);
}
