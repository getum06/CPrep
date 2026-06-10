import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RgmSimulator from "./pages/RgmSimulator";

if (window.location.pathname === "/") {
  window.history.replaceState(null, "", "/rgm-simulator");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RgmSimulator />
  </StrictMode>,
);
