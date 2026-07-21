import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  itemService,
  categoryService,
  extractErrorMessage,
} from "../../services/app";
import { resolveStorageUrl } from "../../utils/image";
import { SpinnerIcon, CloseIcon } from "../Icons";
import CategorySelect from "../CategorySelect";
import ImageUploader from "../ImageUploader";

const CONDITION_OPTIONS = ["New", "Like New", "Good", "Fair"];

export default function ItemFormModal({ item, onClose, onSaved }) {
  const isEditMode = !!item;

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");
  const [condition, setCondition] = useState(item?.condition || "");
  const [categoryId, setCategoryId] = useState(
    item?.category?.id || item?.category_id || null,
  );
  const [barterWishes, setBarterWishes] = useState(item?.barter_wishes || "");
  const [imageItems, setImageItems] = useState(() => {
    if (item?.images?.length) {
      return item.images.map((img) => ({
        type: "existing",
        id: img.id,
        url: resolveStorageUrl(img.image_path),
      }));
    }
    if (item?.first_image_url) {
      return [{ type: "existing", id: null, url: item.first_image_url }];
    }
    return [];
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    categoryService
      .getAll()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (!condition) errs.condition = "Please select a condition.";
    if (!categoryId) errs.category = "Please select a category.";
    if (!barterWishes.trim())
      errs.barterWishes = "Please share what you're looking to trade for.";
    if (imageItems.length === 0) errs.images = "At least 1 image is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("condition", condition);
      formData.append("category_id", categoryId);
      formData.append("barter_wishes", barterWishes);

      imageItems
        .filter((img) => img.type === "new")
        .forEach((img) => formData.append("images[]", img.file));

      if (isEditMode) {
        const originalImageIds = (item.images || []).map((img) => img.id);
        const retainedImageIds = imageItems
          .filter((img) => img.type === "existing" && img.id)
          .map((img) => img.id);
        const removedImageIds = originalImageIds.filter(
          (id) => !retainedImageIds.includes(id),
        );

        removedImageIds.forEach((id) =>
          formData.append("remove_image_ids[]", id),
        );
      }

      if (isEditMode) {
        await itemService.update(item.id, formData);
        toast.success("Listing updated successfully!");
      } else {
        await itemService.create(formData);
        toast.success("Listing created successfully!");
      }

      onSaved();
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-cream text-ink placeholder:text-muted text-sm border rounded-2xl px-4 py-3 outline-none transition ${
      errors[field]
        ? "border-accent focus:border-accent"
        : "border-border focus:border-brand"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-paper w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 bg-paper flex items-center justify-between px-5 py-4 border-b border-border z-10">
          <h2 className="font-display font-extrabold text-base text-ink">
            {isEditMode ? "Edit Listing" : "Create New Listing"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-cream text-muted hover:text-ink transition"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Photos
            </label>
            <ImageUploader
              items={imageItems}
              onChange={setImageItems}
              error={errors.images}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title)
                  setErrors((p) => ({ ...p, title: undefined }));
              }}
              placeholder="e.g. iPhone 14 Pro - 256GB"
              className={inputClass("title")}
            />
            {errors.title && (
              <p className="text-[11px] text-accent font-semibold mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Category
            </label>
            <CategorySelect
              categories={categories}
              value={categoryId}
              onChange={(id) => {
                setCategoryId(id);
                if (errors.category)
                  setErrors((p) => ({ ...p, category: undefined }));
              }}
              error={errors.category}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Condition
            </label>
            <div className="flex flex-wrap gap-2">
              {CONDITION_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setCondition(opt);
                    if (errors.condition)
                      setErrors((p) => ({ ...p, condition: undefined }));
                  }}
                  className={`text-xs font-bold px-3.5 py-2 rounded-full border transition ${
                    condition === opt
                      ? "bg-brand text-white border-brand"
                      : "bg-cream text-muted border-border hover:text-ink"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.condition && (
              <p className="text-[11px] text-accent font-semibold mt-1.5">
                {errors.condition}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description)
                  setErrors((p) => ({ ...p, description: undefined }));
              }}
              rows={3}
              placeholder="Describe the item's condition, features, etc."
              className={`${inputClass("description")} resize-none`}
            />
            {errors.description && (
              <p className="text-[11px] text-accent font-semibold mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              What are you looking to trade for?
            </label>
            <textarea
              value={barterWishes}
              onChange={(e) => {
                setBarterWishes(e.target.value);
                if (errors.barterWishes)
                  setErrors((p) => ({ ...p, barterWishes: undefined }));
              }}
              rows={2}
              placeholder="e.g. Looking for an iPad Air or Pro"
              className={`${inputClass("barterWishes")} resize-none`}
            />
            {errors.barterWishes && (
              <p className="text-[11px] text-accent font-semibold mt-1">
                {errors.barterWishes}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-brand hover:bg-brand-dark text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {saving ? <SpinnerIcon className="w-4 h-4" /> : null}
            {isEditMode ? "Update Listing" : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
}
