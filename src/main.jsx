import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SubscriptionProvider>
        <App />
      </SubscriptionProvider>
    </BrowserRouter>
  </StrictMode>,
);
