import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CloseIcon, SpinnerIcon } from "./Icons";
import { authService, extractErrorMessage } from "../services/app";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[6-9]\d{9}$/; // Indian 10-digit mobile starting 6-9

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  defaultMode = "login",
}) {
  const [isRegister, setIsRegister] = useState(defaultMode === "register");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setIsRegister(defaultMode === "register");
      setFieldErrors({});
    }
  }, [isOpen, defaultMode]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // typing shuru hote hi us field ka error hata do (instant feedback)
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const errors = {};

    if (isRegister) {
      if (!formData.name.trim()) {
        errors.name = "Full name is required.";
      } else if (formData.name.trim().length < 3) {
        errors.name = "Name must be at least 3 characters.";
      }

      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required.";
      } else if (!PHONE_REGEX.test(formData.phone.trim())) {
        errors.phone = "Enter a valid 10-digit mobile number.";
      }
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (isRegister) {
      if (!formData.password_confirmation) {
        errors.password_confirmation = "Please confirm your password.";
      } else if (formData.password !== formData.password_confirmation) {
        errors.password_confirmation = "Passwords do not match.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);

    try {
      let data;
      if (isRegister) {
        data = await authService.register(formData);
        toast.success("Account created successfully! Welcome aboard.");
      } else {
        data = await authService.login({
          email: formData.email,
          password: formData.password,
        });
        toast.success("Logged in successfully!");
      }
      onAuthSuccess(data.user);
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full bg-cream border text-ink text-sm rounded-xl px-4 py-3 outline-none transition ${
      fieldErrors[field]
        ? "border-accent focus:border-accent"
        : "border-border focus:border-brand"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-paper rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-border max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-ink transition"
        >
          <CloseIcon />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-display font-extrabold text-ink tracking-tight">
            {isRegister ? "Join the Hub" : "Welcome Back"}
          </h2>
          <p className="text-xs text-muted mt-1.5">
            {isRegister
              ? "Create an account to start bartering items"
              : "Access your dashboard & pending swap offers"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={inputClass("name")}
                placeholder="John Doe"
              />
              {fieldErrors.name && (
                <p className="text-[11px] text-accent font-semibold mt-1">
                  {fieldErrors.name}
                </p>
              )}
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength={10}
                className={inputClass("phone")}
                placeholder="9876543210"
              />
              {fieldErrors.phone && (
                <p className="text-[11px] text-accent font-semibold mt-1">
                  {fieldErrors.phone}
                </p>
              )}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClass("email")}
              placeholder="you@domain.com"
            />
            {fieldErrors.email && (
              <p className="text-[11px] text-accent font-semibold mt-1">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-muted uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={inputClass("password")}
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <p className="text-[11px] text-accent font-semibold mt-1">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-muted uppercase mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                className={inputClass("password_confirmation")}
                placeholder="••••••••"
              />
              {fieldErrors.password_confirmation && (
                <p className="text-[11px] text-accent font-semibold mt-1">
                  {fieldErrors.password_confirmation}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand hover:bg-brand-dark text-white text-xs font-bold py-3.5 rounded-xl transition shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <SpinnerIcon className="w-4 h-4" /> : null}
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account yet?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setFieldErrors({});
              }}
              className="text-brand font-bold hover:underline"
            >
              {isRegister ? "Sign In" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
