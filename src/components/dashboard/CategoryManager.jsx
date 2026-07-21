import React, { useState, useEffect, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { categoryService, extractErrorMessage } from "../../services/app";
import { resolveCategoryImage } from "../../utils/image";
import { SpinnerIcon, CloseIcon, SearchIcon } from "../Icons";
import ConfirmDialog from "../ConfirmDialog";

const PER_PAGE = 8;

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 20h9" strokeLinecap="round" />
    <path
      d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
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

const InfoIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
  </svg>
);

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const gridRef = useRef(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (expandedId === null) return;
    const handleClickOutside = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setExpandedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expandedId]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q),
    );
  }, [categories, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / PER_PAGE),
  );
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const resetForm = () => {
    setName("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
  };

  const openAddModal = () => {
    setEditingCategory(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setName(cat.name || "");
    setDescription(cat.description || "");
    setImageFile(null);
    setImagePreview(
      cat.image_path ? resolveCategoryImage(cat.image_path) : null,
    );
    setErrors({});
    setModalOpen(true);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Image must be under 3MB.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((p) => ({ ...p, image: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Category name is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (!editingCategory && !imageFile)
      errs.image = "Category image is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      if (editingCategory) {
        await categoryService.update(editingCategory.id, formData);
        toast.success("Category updated successfully!");
      } else {
        await categoryService.create(formData);
        toast.success("Category added successfully!");
      }
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await categoryService.delete(deleteTarget.id);
      toast.success("Category deleted.");
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-cream border text-ink text-sm rounded-xl px-4 py-3 outline-none transition ${
      errors[field]
        ? "border-accent focus:border-accent"
        : "border-border focus:border-brand"
    }`;

  return (
    <div className="bg-paper border border-border rounded-3xl p-4 sm:p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-display font-bold text-ink">
            Manage Categories
          </h2>
          <p className="text-xs text-muted mt-1">
            Add, edit, or remove trade categories.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-brand-dark transition shadow-sm shrink-0 self-start sm:self-auto"
        >
          + Add Category
        </button>
      </div>

      <div className="relative mb-5">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted text-sm">
          <SearchIcon />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories by name or description..."
          className="w-full bg-cream text-ink placeholder:text-muted text-sm border border-border focus:border-brand rounded-full pl-10 pr-4 py-2.5 outline-none transition"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-2xl">
          <p className="text-sm text-muted">
            {searchQuery
              ? `No categories match "${searchQuery}".`
              : "No categories yet. Add your first one."}
          </p>
        </div>
      ) : (
        <>
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {paginatedCategories.map((cat) => {
              const isExpanded = expandedId === cat.id;
              return (
                <div
                  key={cat.id}
                  className="relative bg-cream border border-border rounded-2xl p-2.5 flex flex-col hover:border-brand/40 hover:shadow-md transition"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-paper">
                    <img
                      src={resolveCategoryImage(cat.image_path)}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/200x200/F6F7F4/6E7D75?text=No+Image";
                      }}
                    />

                    <div className="absolute top-1.5 right-1.5 flex gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="w-7 h-7 rounded-full bg-paper/90 backdrop-blur-sm text-brand flex items-center justify-center shadow-sm hover:bg-paper transition"
                        aria-label="Edit category"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="w-7 h-7 rounded-full bg-paper/90 backdrop-blur-sm text-accent flex items-center justify-center shadow-sm hover:bg-paper transition"
                        aria-label="Delete category"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1 mt-2.5">
                    <p className="text-xs md:text-sm font-bold text-ink leading-snug line-clamp-2">
                      {cat.name}
                    </p>
                    {cat.description && (
                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : cat.id)
                        }
                        className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition ${
                          isExpanded
                            ? "bg-brand text-white"
                            : "text-muted hover:text-brand"
                        }`}
                        aria-label="Toggle description"
                      >
                        <InfoIcon />
                      </button>
                    )}
                  </div>

                  {/* Floating popover — grid layout ko disturb nahi karta */}
                  {isExpanded && cat.description && (
                    <div className="absolute z-20 left-0 right-0 top-full mt-2 bg-paper border border-border rounded-2xl shadow-xl p-3.5 animate-fade-in">
                      <p className="text-[11px] text-muted leading-relaxed">
                        {cat.description}
                      </p>
                      <span className="absolute -top-1.5 right-4 w-3 h-3 bg-paper border-t border-l border-border rotate-45" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-border">
              <p className="text-[11px] text-muted order-2 sm:order-1">
                Page {currentPage} of {totalPages} · {filteredCategories.length}{" "}
                categories
              </p>
              <div className="flex items-center gap-2 order-1 sm:order-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border border-border text-ink hover:border-brand/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Prev
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border border-border text-ink hover:border-brand/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm">
          <div className="bg-paper rounded-3xl max-w-md w-full p-6 shadow-2xl border border-border relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-ink transition"
            >
              <CloseIcon />
            </button>

            <h3 className="text-base font-display font-bold text-ink">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h3>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-1.5">
                  Category Image
                </label>
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded-2xl overflow-hidden bg-cream border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-brand/50 transition shrink-0"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-muted text-center px-1">
                        Upload
                      </span>
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-bold text-brand hover:underline"
                    >
                      {imagePreview ? "Change Image" : "Select Image"}
                    </button>
                    <p className="text-[11px] text-muted mt-1">
                      JPG or PNG, max 3MB.
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
                {errors.image && (
                  <p className="text-[11px] text-accent font-semibold mt-1.5">
                    {errors.image}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-1.5">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name)
                      setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  className={inputClass("name")}
                  placeholder="e.g. Electronics & Gadgets"
                />
                {errors.name && (
                  <p className="text-[11px] text-accent font-semibold mt-1">
                    {errors.name}
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
                  className={`${inputClass("description")} resize-none`}
                  placeholder="Brief description of this category"
                />
                {errors.description && (
                  <p className="text-[11px] text-accent font-semibold mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-brand hover:bg-brand-dark text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {saving ? <SpinnerIcon className="w-4 h-4" /> : null}
                {editingCategory ? "Update Category" : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this category?"
        message={
          deleteTarget
            ? `"${deleteTarget.name}" will be permanently removed. This action cannot be undone.`
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
