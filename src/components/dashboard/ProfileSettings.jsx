import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { profileService, extractErrorMessage } from "../../services/app";
import { resolveStorageUrl } from "../../utils/image";
import { SpinnerIcon } from "../Icons";

const CameraIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" strokeLinejoin="round" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

export default function ProfileSettings() {
  const { currentUser, refreshProfile } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        phone: currentUser.phone || "",
        location: currentUser.location || "",
      });
      setAvatarPreview(
        currentUser.avatar ? resolveStorageUrl(currentUser.avatar) : null,
      );
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleAvatarSelect = (e) => {
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

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      errs.phone = "Enter a valid 10-digit mobile number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("phone", formData.phone);
      payload.append("location", formData.location);
      if (avatarFile) payload.append("avatar", avatarFile);

      await profileService.update(payload);
      await refreshProfile();
      toast.success("Profile updated successfully!");
      setAvatarFile(null);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-cream border text-ink text-sm rounded-xl px-4 py-3 outline-none transition ${
      errors[field]
        ? "border-accent focus:border-accent"
        : "border-border focus:border-brand"
    }`;

  const initials =
    formData.name
      ?.trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("") || "?";

  return (
    <div className="bg-paper border border-border rounded-3xl p-6 md:p-8">
      <h2 className="text-lg font-display font-bold text-ink">
        Profile Settings
      </h2>
      <p className="text-xs text-muted mt-1">
        Update your personal information and photo.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="flex items-center gap-5">
          <div className="relative group shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-brand/10 border-2 border-border flex items-center justify-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // agar file corrupt/missing ho to initials pe fallback
                    e.target.onerror = null;
                    e.target.style.display = "none";
                    setAvatarPreview(null);
                  }}
                />
              ) : (
                <span className="text-2xl font-display font-bold text-brand select-none">
                  {initials}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-full bg-ink/0 group-hover:bg-ink/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
              aria-label="Change photo"
            >
              <CameraIcon />
            </button>

            {/* mobile-friendly always-visible edit badge */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="md:hidden absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center border-2 border-paper shadow-sm"
              aria-label="Change photo"
            >
              <CameraIcon />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              className="hidden"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-brand hover:underline"
            >
              Change Photo
            </button>
            <p className="text-[11px] text-muted mt-1">JPG or PNG, max 3MB.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass("name")}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-[11px] text-accent font-semibold mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              className={inputClass("phone")}
              placeholder="9876543210"
            />
            {errors.phone && (
              <p className="text-[11px] text-accent font-semibold mt-1">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase mb-1.5">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={inputClass("location")}
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-muted uppercase mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={currentUser?.email || ""}
            disabled
            className="w-full bg-cream/50 border border-border text-muted text-sm rounded-xl px-4 py-3 outline-none cursor-not-allowed"
          />
          <p className="text-[11px] text-muted mt-1">
            Email cannot be changed here.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-brand hover:bg-brand-dark text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? <SpinnerIcon className="w-4 h-4" /> : null}
          Save Changes
        </button>
      </form>
    </div>
  );
}
