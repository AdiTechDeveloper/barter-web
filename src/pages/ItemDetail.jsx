import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { itemService, extractErrorMessage } from "../services/app";
import { resolveStorageUrl, resolveUserAvatar } from "../utils/image";
import { LocationIcon } from "../components/Icons";
import { useAuth } from "../context/AuthContext";
import ProposeTradeModal from "../components/ProposeTradeModal";
import UserReviews from "../components/UserReviews";

const ChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MessageIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requireAuth } = useAuth();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showTradeModal, setShowTradeModal] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError("");
        setActiveImageIndex(0);
        const data = await itemService.getById(id);
        setItem(data);
      } catch (err) {
        setError(extractErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleProposeTrade = () => {
    requireAuth(() => {
      setShowTradeModal(true);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-20 text-center">
        <h1 className="text-xl font-display font-bold text-ink">
          Item not found
        </h1>
        <p className="text-sm text-muted mt-2">
          {error ||
            "This listing may have been removed or is no longer available."}
        </p>
        <Link
          to="/browse"
          className="inline-block mt-6 bg-brand text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-brand-dark transition"
        >
          Back to Listings
        </Link>
      </div>
    );
  }

  const images = item.images?.length > 0 ? item.images : null;
  const activeImageUrl = images
    ? resolveStorageUrl(images[activeImageIndex]?.image_path)
    : item.first_image_url ||
      "https://placehold.co/600x600/F6F7F4/6E7D75?text=No+Image";

  const avatarUrl = resolveUserAvatar(item.user);
  const sellerInitial = (item.user?.name || "U").charAt(0).toUpperCase();

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted mb-6 flex-wrap">
        <Link to="/" className="hover:text-brand transition">
          Home
        </Link>
        <span>/</span>
        <Link to="/browse" className="hover:text-brand transition">
          Browse
        </Link>
        {item.category?.name && (
          <>
            <span>/</span>
            <Link
              to={`/browse?category=${item.category.slug}`}
              className="hover:text-brand transition"
            >
              {item.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-ink font-semibold line-clamp-1">
          {item.title}
        </span>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="hidden md:flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink transition mb-6"
      >
        <ChevronLeftIcon /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Image gallery */}
        <div>
          <div className="aspect-square rounded-3xl overflow-hidden border border-border bg-cream relative">
            <img
              src={activeImageUrl}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x600/F6F7F4/6E7D75?text=No+Image";
              }}
            />
            <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {item.condition}
            </div>
          </div>

          {images && images.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(index)}
                  className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === index
                      ? "border-brand"
                      : "border-border hover:border-brand/40"
                  }`}
                >
                  <img
                    src={resolveStorageUrl(img.image_path)}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand">
            {item.category?.name}
          </span>

          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink tracking-tight mt-2 leading-tight">
            {item.title}
          </h1>

          <div className="flex items-center gap-3 mt-3">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                item.status === "available"
                  ? "bg-brand/10 text-brand"
                  : "bg-accent/10 text-accent"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${item.status === "available" ? "bg-brand" : "bg-accent"}`}
              />
              {item.status === "available"
                ? "Available for Trade"
                : "Trade Pending"}
            </span>
          </div>

          <p className="text-sm text-muted mt-5 leading-relaxed">
            {item.description}
          </p>

          {item.barter_wishes && (
            <div className="bg-cream border border-border rounded-2xl p-4 md:p-5 mt-6">
              <p className="text-[11px] font-bold uppercase tracking-wide text-accent mb-1.5">
                Looking to Trade For
              </p>
              <p className="text-sm text-ink leading-relaxed">
                {item.barter_wishes}
              </p>
            </div>
          )}

          {/* Seller card */}
          <div className="border border-border rounded-2xl p-4 md:p-5 mt-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-brand/10 flex items-center justify-center shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={item.user?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-lg font-display font-bold text-brand">
                  {sellerInitial}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-ink truncate">
                {item.user?.name}
              </p>
              <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
                <LocationIcon className="w-3.5 h-3.5" />
                {item.user?.location || "Location not specified"}
              </p>
            </div>
          </div>

          <UserReviews userId={item.user?.id} />

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleProposeTrade}
              disabled={item.status !== "available"}
              className="flex-1 bg-brand hover:bg-brand-dark text-white text-sm font-bold py-3.5 rounded-full transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.status === "available"
                ? "Propose a Trade"
                : "Currently Unavailable"}
            </button>
            <button
              onClick={handleProposeTrade}
              className="flex items-center justify-center gap-2 bg-paper border border-border text-ink text-sm font-bold py-3.5 px-5 rounded-full hover:border-brand/50 transition"
            >
              <MessageIcon /> Message
            </button>
          </div>
        </div>
      </div>

      {showTradeModal && (
        <ProposeTradeModal
          requestedItem={item}
          requestedItemImageUrl={activeImageUrl}
          onClose={() => setShowTradeModal(false)}
        />
      )}
    </div>
  );
}
