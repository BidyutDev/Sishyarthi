import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Landing from "./components/Landing.jsx";
import AdminLanding from "./components/AdminLanding.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    <AdminLanding/>
  </StrictMode>
);
