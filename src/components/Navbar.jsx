import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchIcon, InstagramIcon, FacebookIcon, YoutubeIcon } from "./Icons";
import MobileMenu from "./MobileMenu";
import { navLinks } from "../data/navLinks";
import { useAuth } from "../context/AuthContext";
import { resolveUserAvatar } from "../utils/image";
import toast from "react-hot-toast";
import { searchHistoryService, extractErrorMessage } from "../services/app";

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
  </svg>
);
const DashboardIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);
const LogoutIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17l5-5-5-5M21 12H9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ChevronDown = ({ className }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar({ onSignInClick }) {
  const [query, setQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, requireAuth, logout, openAuth } =
    useAuth();
  const profileRef = useRef(null);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchWrapperRef = useRef(null);
  const mobileSearchWrapperRef = useRef(null);

  const loadSearchHistory = () => {
    if (!isAuthenticated) return;
    searchHistoryService
      .getAll()
      .then(setSearchHistory)
      .catch(() => setSearchHistory([]));
  };

  useEffect(() => {
    loadSearchHistory();
  }, [isAuthenticated]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/browse${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    setShowMobileSearch(false);
    setShowSuggestions(false);
    setTimeout(loadSearchHistory, 500);
  };

  const handleSuggestionClick = (term) => {
    setQuery(term);
    navigate(`/browse?q=${encodeURIComponent(term)}`);
    setShowSuggestions(false);
  };

  const handleClearHistory = async (e) => {
    e.stopPropagation();
    try {
      await searchHistoryService.clearAll();
      setSearchHistory([]);
      toast.success("Search history cleared.");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  const handleDashboardClick = () => {
    requireAuth(() => navigate("/dashboard"));
  };

  const handleLogout = async () => {
    setIsProfileOpen(false);
    const result = await logout();
    if (result.success) {
      toast.success("Logged out successfully!");
    } else {
      toast.success("Logged out locally. Server sync failed.");
    }
    navigate("/");
  };

  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  useEffect(() => {
    if (!showSuggestions) return;
    const handleClickOutsideSearch = (e) => {
      const clickedInsideDesktop =
        searchWrapperRef.current && searchWrapperRef.current.contains(e.target);
      const clickedInsideMobile =
        mobileSearchWrapperRef.current &&
        mobileSearchWrapperRef.current.contains(e.target);

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideSearch);
  }, [showSuggestions]);

  const hasCustomPhoto =
    currentUser?.profile_photo &&
    currentUser?.profile_photo !== "null" &&
    currentUser?.profile_photo !== "";
  const hasAvatarPhoto =
    currentUser?.avatar &&
    currentUser?.avatar !== "null" &&
    currentUser?.avatar !== "";

  const photoUrl = hasCustomPhoto
    ? `${import.meta.env.VITE_IMG_URL}/storage/${currentUser.profile_photo}`
    : hasAvatarPhoto
      ? `${import.meta.env.VITE_IMG_URL}/storage/${currentUser.avatar}`
      : null;

  const initial = (currentUser?.name || currentUser?.email || "U")
    .charAt(0)
    .toUpperCase();

  const renderSuggestions = () =>
    showSuggestions &&
    isAuthenticated &&
    searchHistory.length > 0 && (
      <div className="absolute z-30 top-full mt-2 left-0 right-0 bg-paper border border-border rounded-2xl shadow-lg overflow-hidden py-1.5 max-h-64 overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
            Recent Searches
          </span>
          <button
            onClick={handleClearHistory}
            className="text-[11px] font-bold text-brand hover:underline shrink-0 ml-2"
          >
            Clear all
          </button>
        </div>
        {searchHistory.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleSuggestionClick(item.search_query)}
            className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-xs font-semibold text-ink hover:bg-cream transition"
          >
            <SearchIcon className="w-3.5 h-3.5 text-muted shrink-0" />
            <span className="truncate min-w-0">{item.search_query}</span>
          </button>
        ))}
      </div>
    );

  return (
    <>
      <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-cream text-ink"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
            <NavLink
              to="/"
              className="font-display font-extrabold text-xl text-ink tracking-tight"
            >
              Barter<span className="text-brand">&nbsp; Funding</span>
            </NavLink>
          </div>

          <div
            className="hidden md:block flex-1 max-w-md relative"
            ref={searchWrapperRef}
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search what's on offer..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)} // 👈 naya
                  className="w-full bg-cream text-ink placeholder:text-muted text-sm border border-border focus:border-brand rounded-full pl-10 pr-4 py-2.5 outline-none transition"
                />
              </div>
            </form>
            {renderSuggestions()}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowMobileSearch((s) => !s)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-cream text-ink"
              aria-label="Toggle search"
            >
              <SearchIcon />
            </button>

            {/* Desktop-only Dashboard button */}
            <button
              onClick={handleDashboardClick}
              className="hidden md:flex items-center gap-1.5 bg-cream text-ink text-xs font-bold px-4 py-2.5 rounded-full hover:bg-border/60 transition"
            >
              <DashboardIcon />
              Dashboard
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen((o) => !o)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border hover:border-brand/50 bg-paper transition"
                  aria-label="Account menu"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-brand/10 to-accent/10 flex items-center justify-center relative shrink-0">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={currentUser?.name || "User Avatar"}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                        className="w-full h-full object-cover z-10 absolute inset-0"
                      />
                    ) : null}

                    <span className="absolute inset-0 z-0 flex items-center justify-center text-[11px] font-bold text-brand bg-brand/10 uppercase select-none">
                      {initial}
                    </span>
                  </div>

                  <ChevronDown
                    className={`text-muted transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-paper border border-border rounded-2xl shadow-lg overflow-hidden py-1.5 z-40">
                    <div className="px-3.5 py-2 border-b border-border mb-1">
                      <p className="text-xs font-bold text-ink truncate">
                        {currentUser?.name || "My Account"}
                      </p>
                      {currentUser?.email && (
                        <p className="text-[11px] text-muted truncate">
                          {currentUser.email}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/dashboard");
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-ink hover:bg-cream transition md:hidden"
                    >
                      <DashboardIcon />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-accent hover:bg-cream transition"
                    >
                      <LogoutIcon />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuth("login")}
                className="bg-brand text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-brand-dark transition shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 px-4 md:px-8 py-2 border-t border-border overflow-x-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full transition ${
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-muted hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div className="ms-auto flex items-center gap-3 pl-4 text-muted">
            <a
              href="https://www.instagram.com/barterfunding"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand transition p-1"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/barterfunding"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand transition p-1"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@barterfunding"
              target="_blank"
              rel="noreferrer"
              className="hover:text-brand transition p-1"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </nav>

        {showMobileSearch && (
          <div
            className="md:hidden px-4 pb-3 relative"
            ref={mobileSearchWrapperRef}
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  autoFocus
                  placeholder="Search what's on offer..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)} // 👈 naya
                  className="w-full bg-cream text-ink placeholder:text-muted text-sm border border-border focus:border-brand rounded-full pl-10 pr-4 py-2.5 outline-none transition"
                />
              </div>
            </form>
            {renderSuggestions()}
          </div>
        )}
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSignInClick={() => openAuth("login")}
      />
    </>
  );
}
