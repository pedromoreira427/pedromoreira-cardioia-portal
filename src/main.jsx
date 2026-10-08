import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ConsultasProvider } from "./contexts/ConsultasContext.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ConsultasProvider>
          <App />
        </ConsultasProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
