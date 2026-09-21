import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";

registerSW({ immediate: true });

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </BrowserRouter>,
);
