import React from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import HowItWorksPage from "./pages/HowItWorksPage";
import CategoriesPage from "./pages/CategoriesPage";
import BrowseListings from "./pages/BrowseListings";
import MembershipPlans from "./pages/MembershipPlans";
import SuccessStories from "./pages/SuccessStories";
import Blog from "./pages/Blog";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import PagePlaceholder from "./pages/PagePlaceholder";
import Dashboard from "./pages/Dashboard";
import ItemDetail from "./pages/ItemDetail";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/browse" element={<BrowseListings />} />
          <Route path="/membership" element={<MembershipPlans />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Route>
      </Routes>
    </>
  );
}
