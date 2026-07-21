import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { itemService, extractErrorMessage } from "../../services/app";
import ItemFormModal from "./ItemFormModal";
import ConfirmDialog from "../ConfirmDialog";

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const STATUS_CONFIG = {
  available: { label: "Available", className: "bg-brand text-white" },
  in_trade: { label: "Traded", className: "bg-ink/75 text-white" },
  traded: { label: "Traded", className: "bg-ink/75 text-white" },
};

export default function MyListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const data = await itemService.getMyItems();
      setItems(data);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCreateClick = () => {
    setEditingItem(null);
    setShowFormModal(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowFormModal(true);
  };

  const handleSaved = () => {
    setShowFormModal(false);
    setEditingItem(null);
    fetchItems();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await itemService.delete(deleteTarget.id);
      toast.success("Listing deleted.");
      setItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-display font-bold text-ink">
          {items.length} {items.length === 1 ? "Listing" : "Listings"}
        </h2>
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-1.5 bg-brand text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-brand-dark transition shadow-sm"
        >
          <PlusIcon />
          New Listing
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-paper rounded-2xl border border-dashed border-border">
          <h3 className="text-sm font-display font-bold text-ink">
            No listings yet
          </h3>
          <p className="text-xs text-muted mt-1 mb-4">
            Create your first listing to start trading with the community.
          </p>
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center gap-1.5 bg-brand text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-brand-dark transition"
          >
            <PlusIcon />
            Create Listing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {items.map((item) => {
            const statusInfo =
              STATUS_CONFIG[item.status] || STATUS_CONFIG.available;
            const isTraded = item.status !== "available";

            return (
              <div
                key={item.id}
                className="group bg-paper rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-square w-full bg-cream relative overflow-hidden">
                  <img
                    src={item.first_image_url}
                    alt={item.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      isTraded ? "opacity-80" : ""
                    }`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/300x300/F6F7F4/6E7D75?text=No+Image";
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {item.condition}
                  </div>
                  <span
                    className={`absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <div className="p-3 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-brand">
                    {item.category?.name}
                  </span>
                  <h3 className="text-sm font-display font-bold text-ink mt-1 line-clamp-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-[11px] text-muted mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="flex border-t border-border">
                  <button
                    onClick={() => handleEditClick(item)}
                    disabled={isTraded}
                    className="flex-1 flex items-center justify-center gap-1.5 text-ink text-xs font-bold py-2.5 hover:bg-cream transition"
                  >
                    <EditIcon /> Edit
                  </button>
                  <div className="w-px bg-border" />
                  <button
                    onClick={() => setDeleteTarget(item)}
                    disabled={isTraded}
                    className="flex-1 flex items-center justify-center gap-1.5 text-accent text-xs font-bold py-2.5 hover:bg-cream transition"
                  >
                    <TrashIcon /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showFormModal && (
        <ItemFormModal
          item={editingItem}
          onClose={() => {
            setShowFormModal(false);
            setEditingItem(null);
          }}
          onSaved={handleSaved}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this listing?"
        message={
          deleteTarget
            ? `"${deleteTarget.title}" will be permanently removed. This action cannot be undone.`
            : ""
        }
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
