import React, { useState, useEffect } from "react";
import { reviewService } from "../services/app";
import StarRating from "./StarRating";

export default function UserReviews({ userId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const { reviews, averageRating, total } =
          await reviewService.getUserReviews(userId);
        setReviews(reviews);
        setAverageRating(averageRating);
        setTotal(total);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    if (userId) fetchReviews();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center py-6">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-2xl p-4 md:p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-display font-bold text-ink">
          Trader Reviews
        </h3>
        {total > 0 && (
          <div className="flex items-center gap-1.5">
            <StarRating value={Math.round(averageRating)} readOnly />
            <span className="text-xs font-bold text-ink">
              {Number(averageRating).toFixed(1)}
            </span>
            <span className="text-[11px] text-muted">({total})</span>
          </div>
        )}
      </div>

      {total === 0 ? (
        <div className="text-center py-8 bg-cream rounded-2xl border border-dashed border-border">
          <p className="text-xs text-muted">
            No reviews yet. Be the first to trade and leave feedback!
          </p>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-cream rounded-xl p-3.5 border border-border"
            >
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-ink">
                  {review.reviewer?.name || "Anonymous"}
                </p>
                <StarRating value={review.rating} readOnly size="sm" />
              </div>
              {review.comment && (
                <p className="text-xs text-muted leading-relaxed">
                  {review.comment}
                </p>
              )}
              {review.created_at && (
                <p className="text-[10px] text-muted mt-1.5">
                  {new Date(review.created_at).toLocaleDateString(undefined, {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
