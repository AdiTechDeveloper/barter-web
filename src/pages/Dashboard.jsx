import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileSettings from "../components/dashboard/ProfileSettings";
import CategoryManager from "../components/dashboard/CategoryManager";
import BarterOffers from "../components/dashboard/BarterOffers";
import MyListings from "../components/dashboard/MyListings";

export default function Dashboard() {
  const { isAuthenticated, authChecked, isAdmin, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (authChecked && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  const tabs = [
    { key: "profile", label: "My Profile" },
    { key: "listings", label: "My Listings" },
    { key: "offers", label: "Trade Offers" },
    ...(isAdmin ? [{ key: "categories", label: "Categories" }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 w-full">
      <div className="mb-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
          {isAdmin ? "Admin Panel" : "Your Account"}
        </span>
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mt-1">
          Welcome back
          {currentUser?.name ? `, ${currentUser.name.split(" ")[0]}` : ""}
        </h1>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6 md:gap-8">
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap text-left px-4 py-3 rounded-2xl text-sm font-semibold transition shrink-0 ${
                activeTab === tab.key
                  ? "bg-brand text-white shadow-sm"
                  : "bg-paper text-muted border border-border hover:text-ink hover:border-brand/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "listings" && <MyListings />}
          {activeTab === "offers" && <BarterOffers />}
          {activeTab === "categories" && isAdmin && <CategoryManager />}
        </div>
      </div>
    </div>
  );
}
