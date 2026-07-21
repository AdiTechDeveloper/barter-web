import React, { useState } from "react";
import toast from "react-hot-toast";
import ReviewModal from "./ReviewModal";
import { extractErrorMessage } from "../../services/app";

const statusStyles = {
  pending: "bg-accent/10 text-accent",
  accepted: "bg-brand/10 text-brand",
  completed: "bg-brand text-white",
  rejected: "bg-border text-muted",
};

const statusLabel = {
  pending: "Pending",
  accepted: "Accepted",
  completed: "Completed",
  rejected: "Rejected",
};

export default function BarterOfferCard({
  offer,
  type,
  onStatusChange,
  onMarkComplete,
}) {
  const [acting, setActing] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewed, setReviewed] = useState(offer.has_review || false);

  const requestedItem = offer.requested_item || offer.requestedItem || {};
  const offeredItem = offer.offered_item || offer.offeredItem || {};
  const senderUser = offer.sender || offer.sender_user || {};
  const receiverUser = offer.receiver || offer.receiver_user || {};
  const otherUser = type === "incoming" ? senderUser : receiverUser;
  const status = offer.status || "pending";

  // Current user ka completion flag — incoming = receiver, outgoing = sender
  const myCompletionFlag =
    type === "incoming" ? offer.receiver_completed : offer.sender_completed;
  const otherCompletionFlag =
    type === "incoming" ? offer.sender_completed : offer.receiver_completed;

  const handleAction = async (newStatus) => {
    setActing(true);
    try {
      await onStatusChange(offer.id, newStatus);
      toast.success(
        newStatus === "accepted" ? "Offer accepted!" : "Offer declined.",
      );
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setActing(false);
    }
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      await onMarkComplete(offer.id);
      toast.success("Marked as complete!");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="bg-paper border border-border rounded-2xl p-4 md:p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-xs text-muted font-semibold">
            {type === "incoming" ? "From" : "To"}{" "}
            <span className="text-ink">{otherUser?.name || "User"}</span>
          </p>
          {offer.created_at && (
            <p className="text-[11px] text-muted mt-0.5">
              {new Date(offer.created_at).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full ${
            statusStyles[status] || statusStyles.pending
          }`}
        >
          {statusLabel[status] || status}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-muted mb-1.5">
            {type === "incoming" ? "They're offering" : "You offered"}
          </p>
          <div className="flex items-center gap-2.5 bg-cream rounded-xl p-2 border border-border">
            <img
              src={offeredItem.first_image_url}
              alt={offeredItem.title}
              className="w-11 h-11 rounded-lg object-cover shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/F6F7F4/6E7D75?text=No+Image";
              }}
            />
            <p className="text-xs font-semibold text-ink line-clamp-2">
              {offeredItem.title}
            </p>
          </div>
        </div>

        <span className="text-muted text-lg shrink-0">⇄</span>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-muted mb-1.5">
            {type === "incoming" ? "For your item" : "You requested"}
          </p>
          <div className="flex items-center gap-2.5 bg-cream rounded-xl p-2 border border-border">
            <img
              src={requestedItem.first_image_url}
              alt={requestedItem.title}
              className="w-11 h-11 rounded-lg object-cover shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/F6F7F4/6E7D75?text=No+Image";
              }}
            />
            <p className="text-xs font-semibold text-ink line-clamp-2">
              {requestedItem.title}
            </p>
          </div>
        </div>
      </div>

      {offer.notes && (
        <p className="text-xs text-muted mt-3.5 leading-relaxed bg-cream/60 rounded-xl px-3 py-2.5 border border-border">
          "{offer.notes}"
        </p>
      )}

      {/* Accept / Decline — sirf incoming + pending */}
      {type === "incoming" && status === "pending" && (
        <div className="flex gap-2.5 mt-4">
          <button
            onClick={() => handleAction("accepted")}
            disabled={acting}
            className="flex-1 bg-brand text-white text-xs font-bold py-2.5 rounded-full hover:bg-brand-dark transition disabled:opacity-50"
          >
            {acting ? "Please wait..." : "Accept"}
          </button>
          <button
            onClick={() => handleAction("rejected")}
            disabled={acting}
            className="flex-1 bg-paper border border-border text-ink text-xs font-bold py-2.5 rounded-full hover:border-accent/50 hover:text-accent transition disabled:opacity-50"
          >
            {acting ? "Please wait..." : "Decline"}
          </button>
        </div>
      )}

      {/* Mark Complete — accepted status me, dono taraf se */}
      {status === "accepted" && !myCompletionFlag && (
        <button
          onClick={handleComplete}
          disabled={completing}
          className="w-full mt-4 bg-brand text-white text-xs font-bold py-2.5 rounded-full hover:bg-brand-dark transition disabled:opacity-50"
        >
          {completing ? "Please wait..." : "Mark Trade as Complete"}
        </button>
      )}

      {status === "accepted" && myCompletionFlag && !otherCompletionFlag && (
        <p className="text-[11px] text-accent font-semibold mt-4 text-center bg-accent/5 rounded-full py-2">
          ✓ You confirmed. Waiting for {otherUser?.name || "the other trader"}{" "}
          to confirm.
        </p>
      )}

      {/* Review — sirf completed status me */}
      {status === "completed" && !reviewed && (
        <button
          onClick={() => setShowReviewModal(true)}
          className="w-full mt-4 bg-cream border border-border text-ink text-xs font-bold py-2.5 rounded-full hover:border-brand/50 hover:text-brand transition"
        >
          ⭐ Leave a Review
        </button>
      )}

      {status === "completed" && reviewed && (
        <p className="text-[11px] text-brand font-semibold mt-4 text-center">
          ✓ You've reviewed this trade
        </p>
      )}

      {showReviewModal && (
        <ReviewModal
          offer={offer}
          revieweeName={otherUser?.name}
          onClose={() => setShowReviewModal(false)}
          onSubmitted={() => {
            setReviewed(true);
            setShowReviewModal(false);
          }}
        />
      )}
    </div>
  );
}
