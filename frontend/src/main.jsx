import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Landing from "./pages/Landing.jsx";
import AdminLanding from "./pages/AdminLanding.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import {BrowserRouter , Routes , Route} from "react-router"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/" element={<AdminLanding/>} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>
);
