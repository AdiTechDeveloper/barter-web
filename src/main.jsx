import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: {
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#1F8A54", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#F0663A", secondary: "#fff" },
          },
        }}
      />
    </AuthProvider>
  </BrowserRouter>,
);
