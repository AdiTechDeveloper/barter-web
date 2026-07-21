import React, { useState, useEffect } from "react";
import {
  itemService,
  barterService,
  extractErrorMessage,
} from "../services/app";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M18 6L6 18M6 6l12 12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProposeTradeModal({
  requestedItem,
  requestedItemImageUrl,
  onClose,
}) {
  const [myItems, setMyItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchMyItems() {
      try {
        setLoadingItems(true);
        const items = await itemService.getMyItems();
        setMyItems(items.filter((i) => i.id !== requestedItem.id));
      } catch (err) {
        console.error("Failed to fetch your items:", err);
        setError("Could not load your items. Please try again.");
      } finally {
        setLoadingItems(false);
      }
    }
    fetchMyItems();
  }, [requestedItem.id]);

  const handleSubmit = async () => {
    if (!selectedItemId) {
      toast.error("Please select an item to offer.");
      return;
    }
    setSubmitting(true);
    try {
      await barterService.createOffer({
        requestedItemId: requestedItem.id,
        offeredItemId: selectedItemId,
        notes,
      });
      toast.success("Your trade offer has been sent!");
      setSuccess(true);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-paper w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-paper flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display font-extrabold text-base text-ink">
            {success ? "Offer Sent" : "Propose a Trade"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-cream text-muted hover:text-ink transition"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {success ? (
          <div className="p-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-brand/10 flex items-center justify-center mb-4">
              <span className="text-brand text-2xl">✓</span>
            </div>
            <p className="text-sm text-ink font-semibold mb-1.5">
              Your offer has been sent!
            </p>
            <p className="text-xs text-muted mb-5 leading-relaxed">
              You'll be notified when the owner responds. You can track this
              offer from your dashboard.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-brand text-white text-sm font-bold py-3 rounded-full hover:bg-brand-dark transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="p-5">
            <div className="flex items-center gap-3 bg-cream rounded-2xl p-3 mb-5 border border-border">
              <img
                src={requestedItemImageUrl}
                alt={requestedItem.title}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/100x100/F6F7F4/6E7D75?text=No+Image";
                }}
              />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand">
                  You're requesting
                </p>
                <p className="text-sm font-display font-bold text-ink truncate">
                  {requestedItem.title}
                </p>
              </div>
            </div>

            <label className="text-xs font-bold text-ink mb-2 block">
              Choose an item to offer
            </label>

            {loadingItems ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand"></div>
              </div>
            ) : myItems.length === 0 ? (
              <div className="text-center py-8 bg-cream rounded-2xl border border-dashed border-border mb-4">
                <p className="text-xs text-muted">
                  You don't have any listed items to offer yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5 max-h-64 overflow-y-auto pr-1">
                {myItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    className={`text-left rounded-xl overflow-hidden border-2 transition ${
                      selectedItemId === item.id
                        ? "border-brand"
                        : "border-border hover:border-brand/40"
                    }`}
                  >
                    <div className="aspect-square bg-cream">
                      <img
                        src={item.first_image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/100x100/F6F7F4/6E7D75?text=No+Image";
                        }}
                      />
                    </div>
                    <p className="text-[10px] font-semibold text-ink px-1.5 py-1.5 line-clamp-2 leading-snug min-h-[2.4em]">
                      {item.title}
                    </p>
                  </button>
                ))}
              </div>
            )}

            <label className="text-xs font-bold text-ink mb-2 block">
              Add a note (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Tell them why this trade works for you..."
              className="w-full bg-cream text-ink placeholder:text-muted text-sm border border-border focus:border-brand rounded-2xl px-4 py-3 outline-none transition resize-none mb-4"
            />

            {error && (
              <p className="text-xs text-accent font-semibold mb-3">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting || myItems.length === 0}
              className="w-full bg-brand text-white text-sm font-bold py-3 rounded-full hover:bg-brand-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Sending Offer..." : "Send Trade Offer"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
