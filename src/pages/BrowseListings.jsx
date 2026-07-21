import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCatalog } from "../hooks/useCatalog";
import { resolveItemImage } from "../utils/image";
import { SearchIcon, LocationIcon } from "../components/Icons";
import { Eye } from "lucide-react";

export default function BrowseListings() {
  const [searchParams] = useSearchParams();
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("all");
  const navigate = useNavigate();

  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    setSelectedCategorySlug(
      categoryFromUrl ? decodeURIComponent(categoryFromUrl) : "all",
    );
  }, [searchParams]);

  const { items, categories, loading } = useCatalog({
    search: searchQuery || undefined,
    categoryId: undefined,
  });

  const normalizedCategories = useMemo(() => {
    const raw = Array.isArray(categories) ? categories : [];
    const mapped = raw
      .map((category) => {
        if (typeof category === "string") {
          return { slug: category.toLowerCase(), name: category };
        }
        if (typeof category === "object" && category !== null) {
          const name =
            category.name || category.title || category.category_name || "";
          const slug = category.slug || name.toLowerCase();
          return { slug, name };
        }
        return null;
      })
      .filter((c) => c && c.name);

    const seen = new Set();
    const unique = mapped.filter((c) => {
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    });

    return [{ slug: "all", name: "All" }, ...unique];
  }, [categories]);

  const filteredItems = useMemo(() => {
    if (!Array.isArray(items)) return [];
    if (selectedCategorySlug === "all") return items;

    return items.filter((item) => {
      const itemSlug =
        item.category?.slug ||
        (typeof item.category === "string" ? item.category.toLowerCase() : "");
      return itemSlug === selectedCategorySlug;
    });
  }, [items, selectedCategorySlug]);

  const handleItemClick = (item) => {
    navigate(`/items/${item.id}`);
  };

  const handleCategoryClick = (slug) => {
    setSelectedCategorySlug(slug);
  };

  return (
    <div>
      <section className="bg-paper border-b border-border py-3 px-4 md:px-8 overflow-x-auto flex items-center gap-2">
        {normalizedCategories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryClick(category.slug)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition border ${
              selectedCategorySlug === category.slug
                ? "bg-brand text-white border-brand"
                : "bg-cream text-muted border-border hover:border-brand/50 hover:text-ink"
            }`}
          >
            {category.name}
          </button>
        ))}
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10 w-full">
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-xl md:text-2xl font-display font-extrabold text-ink tracking-tight">
            {searchQuery
              ? `Results for "${searchQuery}"`
              : "Active Trade Listings"}
          </h1>
          <span className="text-xs text-muted font-medium">
            {loading ? "Loading…" : `${filteredItems.length} items`}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-paper rounded-2xl border border-dashed border-border">
            <h3 className="text-base font-display font-bold text-ink">
              No active trades found
            </h3>
            <p className="text-xs text-muted mt-1">
              Try a different filter configuration or search query.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="group bg-paper rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="aspect-square w-full overflow-hidden bg-cream relative">
                  <img
                    src={resolveItemImage(item.images)}
                    alt={item.title || "Trade item"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/300x300/F6F7F4/6E7D75?text=No+Image";
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {item.condition}
                  </div>

                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-ink text-[11px] font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5">
                      <Eye className="w-6 h-6" />
                      <span className="text-xs">View Details</span>
                    </span>
                  </div>
                </div>

                <div className="p-3 md:p-4 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-brand">
                    {typeof item.category === "object"
                      ? item.category?.name
                      : item.category}
                  </span>
                  <h3 className="text-sm font-display font-bold text-ink mt-1 line-clamp-1 group-hover:text-brand transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed hidden sm:block">
                    {item.description}
                  </p>
                </div>

                <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 border-t border-border flex items-center justify-between text-[11px] font-semibold text-muted">
                  <span className="flex items-center gap-1 truncate">
                    <LocationIcon className="text-muted w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      {item.user?.location || "Location TBA"}
                    </span>
                  </span>
                  <span
                    className={
                      item.status === "available" ? "text-brand" : "text-accent"
                    }
                  >
                    {item.status === "available" ? "Available" : "Pending"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
