import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { barterService, extractErrorMessage } from "../../services/app";
import BarterOfferCard from "./BarterOfferCard";

export default function BarterOffers() {
  const [subTab, setSubTab] = useState("incoming");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOffers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [incomingData, outgoingData] = await Promise.all([
        barterService.getIncoming(),
        barterService.getOutgoing(),
      ]);
      setIncoming(incomingData);
      setOutgoing(outgoingData);
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const handleStatusChange = async (offerId, newStatus) => {
    await barterService.updateStatus(offerId, newStatus);
    setIncoming((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: newStatus } : o)),
    );
  };

  // 👇 Naya: complete action, dono lists me relevant offer update karega
  const handleMarkComplete = async (offerId) => {
    const updatedOffer = await barterService.markComplete(offerId);

    const applyUpdate = (list) =>
      list.map((o) => (o.id === offerId ? { ...o, ...updatedOffer } : o));

    setIncoming((prev) => applyUpdate(prev));
    setOutgoing((prev) => applyUpdate(prev));
  };

  const pendingIncomingCount = incoming.filter(
    (o) => (o.status || "pending") === "pending",
  ).length;
  const activeList = subTab === "incoming" ? incoming : outgoing;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setSubTab("incoming")}
          className={`relative text-xs font-bold px-4 py-2 rounded-full transition ${
            subTab === "incoming"
              ? "bg-brand text-white"
              : "bg-cream text-muted hover:text-ink"
          }`}
        >
          Incoming
          {pendingIncomingCount > 0 && (
            <span className="ml-1.5 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {pendingIncomingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setSubTab("outgoing")}
          className={`text-xs font-bold px-4 py-2 rounded-full transition ${
            subTab === "outgoing"
              ? "bg-brand text-white"
              : "bg-cream text-muted hover:text-ink"
          }`}
        >
          Outgoing
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-paper rounded-2xl border border-dashed border-border">
          <p className="text-sm text-accent font-semibold">{error}</p>
          <button
            onClick={fetchOffers}
            className="mt-3 text-xs font-bold text-brand hover:underline"
          >
            Try again
          </button>
        </div>
      ) : activeList.length === 0 ? (
        <div className="text-center py-16 bg-paper rounded-2xl border border-dashed border-border">
          <h3 className="text-sm font-display font-bold text-ink">
            No {subTab} offers yet
          </h3>
          <p className="text-xs text-muted mt-1">
            {subTab === "incoming"
              ? "When someone proposes a trade for your items, it'll show up here."
              : "Trades you propose to others will show up here."}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {activeList.map((offer) => (
            <BarterOfferCard
              key={offer.id}
              offer={offer}
              type={subTab}
              onStatusChange={handleStatusChange}
              onMarkComplete={handleMarkComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
