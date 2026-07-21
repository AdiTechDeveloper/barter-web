import React, { useState } from "react";
import StarRating from "../StarRating";
import toast from "react-hot-toast";
import { reviewService, extractErrorMessage } from "../../services/app";

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

export default function ReviewModal({
  offer,
  revieweeName,
  onClose,
  onSubmitted,
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }
    setSubmitting(true);
    try {
      await reviewService.create({
        barterOfferId: offer.id,
        rating,
        comment,
      });
      toast.success("Thanks for your feedback!");
      setSuccess(true);
      onSubmitted?.();
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-paper w-full sm:max-w-sm sm:rounded-3xl rounded-t-3xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-display font-extrabold text-base text-ink">
            {success ? "Review Submitted" : "Rate Your Trade"}
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
              Thanks for your feedback!
            </p>
            <p className="text-xs text-muted mb-5 leading-relaxed">
              Your review helps build trust in the BarterHub community.
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
            <p className="text-xs text-muted mb-4">
              How was your trade experience with{" "}
              <span className="text-ink font-semibold">
                {revieweeName || "this trader"}
              </span>
              ?
            </p>

            <div className="flex justify-center py-3 mb-2">
              <StarRating value={rating} onChange={setRating} />
            </div>

            <label className="text-xs font-bold text-ink mb-2 block mt-3">
              Add a comment (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Share details about the item and the trading experience..."
              className="w-full bg-cream text-ink placeholder:text-muted text-sm border border-border focus:border-brand rounded-2xl px-4 py-3 outline-none transition resize-none mb-4"
            />

            {error && (
              <p className="text-xs text-accent font-semibold mb-3">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-brand text-white text-sm font-bold py-3 rounded-full hover:bg-brand-dark transition disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
