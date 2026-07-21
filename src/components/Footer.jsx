import React from "react";
import { Link } from "react-router-dom";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-paper border-t border-border py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link
              to="/"
              className="font-display font-extrabold text-lg text-ink"
            >
              Barter<span className="text-brand">&nbsp; Funding</span>
            </Link>
            <p className="text-xs text-muted mt-3 leading-relaxed max-w-xs">
              A community-driven online market to swap items directly - no cash,
              no fees, just fair trades.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/browse" className="hover:text-brand transition">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="hover:text-brand transition"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-brand transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-brand transition">
                  Membership Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/about" className="hover:text-brand transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="hover:text-brand transition"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wide text-ink mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link to="/faqs" className="hover:text-brand transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand transition">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted">
            © {new Date().getFullYear()} Barter Funding. All rights reserved.
          </p>

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
        </div>
      </div>
    </footer>
  );
}
