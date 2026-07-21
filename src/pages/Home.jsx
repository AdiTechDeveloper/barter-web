import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import DynamicCategories from "../components/DynamicCategories";
import { useAuth } from "../context/AuthContext";
import { useCatalog } from "../hooks/useCatalog";

export default function Home() {
  const navigate = useNavigate();
  const { requireAuth, openAuth } = useAuth();
  const { categories, loading } = useCatalog();
  const howItWorksRef = useRef(null);

  return (
    <div>
      <Hero
        onRegisterClick={() => openAuth("register")}
        onUploadRequirementClick={() =>
          requireAuth(() => navigate("/dashboard"))
        }
      />

      <DynamicCategories categories={categories} loading={loading} />

      <WhyChooseUs />
    </div>
  );
}
