import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app/AppRouter";
import "./styles.css";
import "./styles/tokens.css";
import "./styles/components.css";
import "./styles/v11.css";
import "./styles/responsive.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}
    >
      <AppRouter />
    </BrowserRouter>
  </StrictMode>,
);

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(import.meta.env.BASE_URL + "sw.js");
  });
}
