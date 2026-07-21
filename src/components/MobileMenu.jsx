import React from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import { useAuth } from "../context/AuthContext";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./Icons";
import toast from "react-hot-toast";

const CloseIconX = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

export default function MobileMenu({ isOpen, onClose, onSignInClick }) {
  const { isAuthenticated, logout, openAuth } = useAuth();

  const handleLogout = async () => {
    onClose();
    await logout();
    toast.success("Logged out successfully!");
  };

  const handleSignIn = () => {
    onClose();
    openAuth("login");
  };

  return (
    <div
      className={`md:hidden fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute top-0 left-0 h-full w-[78%] max-w-xs bg-paper shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="font-display font-extrabold text-lg text-ink">
            Barter<span className="text-brand">&nbsp; Funding</span>
          </span>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink"
            aria-label="Close menu"
          >
            <CloseIconX />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-ink hover:bg-cream"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-center gap-6 text-muted border-b border-border/50 pb-3">
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

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full bg-accent text-white text-sm font-bold py-3 rounded-full hover:bg-accent/90 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleSignIn}
              className="w-full bg-brand text-white text-sm font-bold py-3 rounded-full hover:bg-brand-dark transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
