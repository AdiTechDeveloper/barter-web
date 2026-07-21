import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { itemService, extractErrorMessage } from "../services/app";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        setLoading(true);
        const data = await itemService.getCategories();
        setCategories(data || []);
      } catch (err) {
        setErrorMessage(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  return (
    <div>
      <section className="py-5 md:py-5 border-b border-border/60 relative overflow-hidden bg-gradient-to-b from-cream/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent px-3 py-1 bg-accent/5 rounded-full border border-accent/10">
            Premium Asset Classes
          </span>
          <h1 className="font-display font-black text-2xl md:text-4xl text-ink tracking-tight mt-3">
            Browse by Category
          </h1>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
            </div>
          ) : errorMessage ? (
            <div className="text-center py-20 bg-paper rounded-2xl border border-dashed border-border">
              <h3 className="text-base font-display font-bold text-ink">
                Couldn't load categories
              </h3>
              <p className="text-xs text-muted mt-1">{errorMessage}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-20 bg-paper rounded-2xl border border-dashed border-border">
              <h3 className="text-base font-display font-bold text-ink">
                No active categories found
              </h3>
              <p className="text-xs text-muted mt-1">
                Check back soon for new categories.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {categories.map((category) => {
                const categoryImage = category.image_path
                  ? `${import.meta.env.VITE_IMG_URL}/storage/${category.image_path}`
                  : "https://placehold.co/120x120/F6F7F4/6E7D75?text=📦";

                return (
                  <Link
                    key={category.id}
                    to={`/browse?category=${category.slug}`}
                    className="group relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-cream shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-end p-4 md:p-5"
                  >
                    <img
                      src={categoryImage}
                      alt={category.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/120x120/F6F7F4/6E7D75?text=📦";
                      }}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                    <div className="relative z-10 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:opacity-0">
                      <h3 className="text-xs md:text-xl font-display font-bold text-white tracking-tight line-clamp-1">
                        {category.name}
                      </h3>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand/90 to-brand/85 p-4 md:p-5 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                      <div className="space-y-2">
                        <h4 className="text-xs md:text-sm font-display font-bold text-white tracking-tight">
                          {category.name}
                        </h4>
                        <p className="text-[10px] md:text-xs text-white/80 leading-relaxed font-medium line-clamp-4">
                          {category.description ||
                            `Explore top-tier verified deals and barter exchanges inside our premium ${category.name.toLowerCase()} catalog.`}
                        </p>
                      </div>

                      <div className="w-full flex items-center justify-between text-[11px] font-bold text-white border-t border-white/10 pt-2 mt-2">
                        <span>View Items</span>
                        <ArrowRight
                          size={13}
                          className="transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
