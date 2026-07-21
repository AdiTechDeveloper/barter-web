import React, { useState, useRef, useEffect } from "react";

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

const SearchIconSmall = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
  </svg>
);

export default function CategorySelect({ categories, value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  const selectedCategory = categories.find((c) => c.id === value);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={`w-full flex items-center justify-between bg-cream text-left text-sm border rounded-2xl px-4 py-3 outline-none transition ${
          error ? "border-accent" : "border-border focus:border-brand"
        }`}
      >
        <span className={selectedCategory ? "text-ink" : "text-muted"}>
          {selectedCategory ? selectedCategory.name : "Select a category"}
        </span>
        <ChevronDown
          className={`text-muted shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-30 top-full mt-2 w-full bg-paper border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="p-2.5 border-b border-border">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                <SearchIconSmall />
              </span>
              <input
                type="text"
                autoFocus
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-cream text-ink placeholder:text-muted text-xs border border-border focus:border-brand rounded-full pl-8 pr-3 py-2 outline-none transition"
              />
            </div>
          </div>

          <div className="max-h-52 overflow-y-auto py-1">
            {filteredCategories.length === 0 ? (
              <p className="text-xs text-muted text-center py-4">
                No categories found
              </p>
            ) : (
              filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onChange(cat.id);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition ${
                    value === cat.id
                      ? "bg-brand/10 text-brand"
                      : "text-ink hover:bg-cream"
                  }`}
                >
                  {cat.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-accent font-semibold mt-1.5">{error}</p>
      )}
    </div>
  );
}
