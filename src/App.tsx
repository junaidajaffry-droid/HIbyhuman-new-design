import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { PricingSection } from "./components/PricingSection";
import { CaseStudiesSection } from "./components/CaseStudiesSection";
import { WorkSection } from "./components/WorkSection";
import { AboutSection } from "./components/AboutSection";
import { ProcessSection } from "./components/ProcessSection";
import { FaqSection } from "./components/FaqSection";
import { FooterSection } from "./components/FooterSection";
import { ConsultationModal } from "./components/ConsultationModal";
import { ScrollGradientBackground } from "./components/ScrollGradientBackground";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined
  );

  const handleOpenModal = (product?: string) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative min-h-screen text-neutral-900 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      {/* Dynamic Scroll-Linked Ambient Gradient Background */}
      <ScrollGradientBackground />

      {/* Fixed Navigation Bar */}
      <Navbar onOpenFittingModal={handleOpenModal} />

      {/* Main Experience Stream */}
      <main className="flex-1 flex flex-col w-full pt-24 sm:pt-28">
        {/* Hero Banner */}
        <HeroSection onOpenFittingModal={handleOpenModal} />

        {/* 01: Core Services Pillars */}
        <ServicesSection onOpenFittingModal={handleOpenModal} />

        {/* 02: Transparent Fixed-Price Packages with Hover Color Shift & 50% Off */}
        <PricingSection onOpenFittingModal={handleOpenModal} />

        {/* 03: Featured Client Case Studies */}
        <CaseStudiesSection onOpenFittingModal={handleOpenModal} />

        {/* 04: Portfolio & Multi-Disciplinary Deliverables Roster */}
        <WorkSection onOpenFittingModal={handleOpenModal} />

        {/* 05: About Studio Philosophy, Guarantees & Testimonials */}
        <AboutSection onOpenFittingModal={handleOpenModal} />

        {/* 06: The 4-Phase Delivery Sprint Lifecycle */}
        <ProcessSection onOpenFittingModal={handleOpenModal} />

        {/* 07: Frequently Asked Questions */}
        <FaqSection onOpenFittingModal={handleOpenModal} />
      </main>

      {/* Footer Section */}
      <FooterSection onOpenFittingModal={handleOpenModal} />

      {/* Interactive Consultation / Proposal Scoping Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        preselectedProduct={selectedProduct}
      />
    </div>
  );
}
