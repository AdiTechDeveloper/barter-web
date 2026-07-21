import React from "react";
import { CloseIcon, SpinnerIcon } from "./Icons";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger", // "danger" | "brand"
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const confirmClass =
    variant === "danger"
      ? "bg-accent hover:bg-accent/90"
      : "bg-brand hover:bg-brand-dark";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-paper rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-border relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-muted hover:text-ink transition"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 9v4M12 17h.01" strokeLinecap="round" />
            <path
              d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h3 className="text-base font-display font-bold text-ink mt-4">
          {title}
        </h3>
        <p className="text-xs text-muted mt-1.5 leading-relaxed">{message}</p>

        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 bg-cream text-ink text-xs font-bold py-3 rounded-xl border border-border hover:border-muted/50 transition disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 ${confirmClass}`}
          >
            {loading ? <SpinnerIcon className="w-4 h-4" /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
