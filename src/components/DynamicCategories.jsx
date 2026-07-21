import React from "react";
import { Link } from "react-router-dom";

export default function DynamicCategories({ categories, loading }) {
  const list = Array.isArray(categories)
    ? categories.filter((c) =>
        typeof c === "object" ? c.name !== "All" : c !== "All",
      )
    : [];

  if (loading) {
    return (
      <section className="bg-paper py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
        </div>
      </section>
    );
  }

  if (list.length === 0) return null;

  return (
    <section className="bg-paper py-14 md:py-8 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header Block Row */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted">
              What You Can Trade
            </span>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mt-1">
              Explore Categories
            </h2>
          </div>
          <Link
            to="/categories"
            className="hidden sm:block text-xs font-bold text-brand hover:underline transition"
          >
            View All →
          </Link>
        </div>

        {/* Responsive Flex/Grid Multi-item Layout Row */}
        <div className="flex flex-wrap items-start justify-center sm:justify-start gap-x-5 gap-y-10">
          {list.map((cat, index) => {
            const isObject = typeof cat === "object" && cat !== null;

            const categoryId = isObject ? cat.id : index;
            const categoryName = isObject ? cat.name : cat;
            const rawPath = isObject ? cat.image_path || "" : "";

            const cleanPath = rawPath.replace(/^\/?(storage\/)?/, "");
            const categoryImgUrl = rawPath
              ? `${import.meta.env.VITE_IMG_URL}/storage/${cleanPath}`
              : "https://placehold.co/120x120/F6F7F4/6E7D75?text=📦";

            return (
              <Link
                key={categoryId ? `cat-${categoryId}` : `cat-idx-${index}`}
                to={`/browse?category=${cat.slug}`}
                className="flex flex-col items-center gap-3.5 group cursor-pointer w-24 sm:w-28 text-center focus:outline-none"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-cream flex items-center justify-center border border-border group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <img
                    src={categoryImgUrl}
                    alt={categoryName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/120x120/F6F7F4/6E7D75?text=📦";
                    }}
                  />
                </div>

                <span className="text-xs font-bold text-ink tracking-tight group-hover:text-brand transition-colors line-clamp-2 px-1 leading-tight">
                  {categoryName}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile View Toggle Fallback Links */}
        <div className="sm:hidden text-center mt-10">
          <Link
            to="/categories"
            className="text-xs font-bold text-brand hover:underline"
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
