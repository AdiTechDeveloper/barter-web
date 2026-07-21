import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    requireAuth,
    isAuthOpen,
    setIsAuthOpen,
    authMode,
    handleAuthSuccess,
  } = useAuth();

  const getActiveTab = () => {
    if (location.pathname.startsWith("/dashboard")) return "dashboard";
    return "home";
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 bg-cream font-body">
      <Navbar onSignInClick={() => setIsAuthOpen(true)} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <BottomNav
        activeTab={getActiveTab()}
        onHomeClick={() => navigate("/")}
        onDashboardClick={() => requireAuth(() => navigate("/dashboard"))}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        defaultMode={authMode}
      />
    </div>
  );
}
