"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedPortfolio from "@/components/FeaturedPortfolio";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import LocationSection from "@/components/LocationSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import PropertyDetailsModal from "@/components/PropertyDetailsModal";
import ContactModal from "@/components/ContactModal";
import FloatingSocial from "@/components/FloatingSocial";
import ValuablePropertyPopup from "@/components/ValuablePropertyPopup";

export default function HomeClient({ siteConfigData, propertiesData }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [heroFilterState, setHeroFilterState] = useState(null);

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
  };

  const handleHeroFilterSearch = (filters) => {
    setHeroFilterState(filters);
    if (filters.category) {
      setActiveCategory(filters.category);
    }
  };

  const handleViewDetails = (property) => {
    setSelectedPropertyDetails(property);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Sticky Premium Navbar */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        siteConfig={siteConfigData}
      />

      {/* Floating Valuable Property Notification Popup */}
      <ValuablePropertyPopup />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onFilterSearch={handleHeroFilterSearch}
          onOpenContactModal={() => setIsContactModalOpen(true)}
          heroData={siteConfigData?.hero}
          siteConfig={siteConfigData}
        />

        {/* Featured Portfolio Section */}
        <FeaturedPortfolio
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          onViewDetails={handleViewDetails}
          heroFilterState={heroFilterState}
          propertiesData={propertiesData}
        />

        {/* Services Section */}
        <ServicesSection
          onOpenContactModal={() => setIsContactModalOpen(true)}
          services={siteConfigData?.services}
          siteConfig={siteConfigData}
        />

        {/* About Section */}
        <AboutSection siteConfig={siteConfigData} />

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={siteConfigData?.testimonials} />

        {/* Location Section */}
        <LocationSection
          onOpenContactModal={() => setIsContactModalOpen(true)}
          siteConfig={siteConfigData}
        />
      </main>

      {/* Multi-column Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        siteConfig={siteConfigData}
        propertiesData={propertiesData}
      />

      {/* Expandable Floating Social Toggle */}
      <FloatingSocial siteConfig={siteConfigData} />

      {/* Property Details Modal */}
      {selectedPropertyDetails && (
        <PropertyDetailsModal
          property={selectedPropertyDetails}
          onClose={() => setSelectedPropertyDetails(null)}
          onOpenContactModal={() => setIsContactModalOpen(true)}
        />
      )}

      {/* Site Visit / General Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        siteConfig={siteConfigData}
      />
    </div>
  );
}
