import React, { useRef } from "react";

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const CloseIconSmall = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
);

const MAX_IMAGES = 5;

// items: [{ type: "existing", id, url } | { type: "new", file, previewUrl }]
export default function ImageUploader({ items, onChange, error }) {
  const inputRef = useRef(null);

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - items.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newItems = filesToAdd.map((file) => ({
      type: "new",
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    onChange([...items, ...newItems]);
    e.target.value = ""; // same file dobara select karne ke liye reset
  };

  const handleRemove = (index) => {
    const item = items[index];
    if (item.type === "new") {
      URL.revokeObjectURL(item.previewUrl);
    }
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden border border-border bg-cream group"
          >
            <img
              src={item.type === "existing" ? item.url : item.previewUrl}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 w-5 h-5 bg-ink/70 text-white rounded-full flex items-center justify-center hover:bg-accent transition"
              aria-label="Remove image"
            >
              <CloseIconSmall />
            </button>
            {index === 0 && (
              <span className="absolute bottom-1 left-1 bg-brand text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Cover
              </span>
            )}
          </div>
        ))}

        {items.length < MAX_IMAGES && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-brand/50 bg-cream flex flex-col items-center justify-center text-muted hover:text-brand transition"
          >
            <PlusIcon />
            <span className="text-[10px] font-bold mt-1">Add</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesSelected}
        className="hidden"
      />

      <p className="text-[11px] text-muted mt-2">
        {items.length} / {MAX_IMAGES} images · First image will be the cover
        photo
      </p>
      {error && (
        <p className="text-xs text-accent font-semibold mt-1">{error}</p>
      )}
    </div>
  );
}
