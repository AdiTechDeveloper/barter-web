import React from "react";

const HomeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 9.5V21h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="8" height="8" rx="1.5" />
    <rect x="13" y="3" width="8" height="8" rx="1.5" />
    <rect x="3" y="13" width="8" height="8" rx="1.5" />
    <rect x="13" y="13" width="8" height="8" rx="1.5" />
  </svg>
);

const UserIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
  </svg>
);

export default function BottomNav({
  onHomeClick,
  onDashboardClick,
  onAccountClick,
  activeTab = "home",
}) {
  const tabs = [
    { key: "home", label: "Home", icon: HomeIcon, onClick: onHomeClick },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: GridIcon,
      onClick: onDashboardClick,
    },
    // {
    //   key: "account",
    //   label: "Account",
    //   icon: UserIcon,
    //   onClick: onAccountClick,
    // },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper border-t border-border flex items-stretch pb-[env(safe-area-inset-bottom)]">
      {tabs.map(({ key, label, icon: Icon, onClick }) => (
        <button
          key={key}
          onClick={onClick}
          className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-semibold transition ${
            activeTab === key ? "text-brand" : "text-muted"
          }`}
        >
          <Icon />
          {label}
        </button>
      ))}
    </nav>
  );
}
