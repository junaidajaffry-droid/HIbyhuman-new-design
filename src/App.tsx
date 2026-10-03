import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";
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
import { ArrowUp, ArrowDown } from "lucide-react";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | undefined>(
    undefined
  );
  const [scrollProgressVal, setScrollProgressVal] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  const [showScrollCompanion, setShowScrollCompanion] = useState(false);

  // Framer Motion scroll tracker for global page progress
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Initialize Lenis smooth momentum scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;
      setScrollProgressVal(Math.round(progress));

      if (currentScrollY > 180) {
        setShowScrollCompanion(true);
      } else {
        setShowScrollCompanion(false);
      }

      if (currentScrollY > lastScrollY + 2) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY - 2) {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  const handleOpenModal = (product?: string) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-neutral-900 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      {/* Global Fixed Spring Parallax Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-rose-500 origin-left z-[60] pointer-events-none"
      />

      {/* Dynamic Animated Page Background with Floating Mesh Orbs & Parallax Particles */}
      <ScrollGradientBackground />

      {/* Fixed Navigation Bar */}
      <Navbar onOpenFittingModal={handleOpenModal} />

      {/* Main Experience Stream */}
      <main className="flex-1 flex flex-col w-full pt-24 sm:pt-28">
        {/* Hero Banner with Multi-Layered Scroll Parallax */}
        <HeroSection onOpenFittingModal={handleOpenModal} />

        {/* 01: Core Services Pillars */}
        <ServicesSection onOpenFittingModal={handleOpenModal} />

        {/* 02: Transparent Fixed-Price Packages with Hover Color Shift & 50% Off */}
        <PricingSection onOpenFittingModal={handleOpenModal} />

        {/* 03: Featured Client Case Studies */}
        <CaseStudiesSection onOpenFittingModal={handleOpenModal} />

        {/* 04: Portfolio & Multi-Disciplinary Deliverables Roster */}
        <WorkSection onOpenFittingModal={handleOpenModal} />

        {/* 05: About Studio Philosophy, Guarantees, Testimonials & Trusted By Marquee */}
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

      {/* Floating Parallax Scroll Companion & Back-to-Top Indicator */}
      {showScrollCompanion && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-neutral-950/85 hover:bg-neutral-950 text-white backdrop-blur-md px-3.5 py-2 rounded-full border border-neutral-800 shadow-xl transition-all cursor-pointer group hover:scale-105"
          onClick={handleScrollToTop}
          title="Click to scroll to top"
        >
          {/* Scroll Direction Icon Indicator */}
          <div className="p-1 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:text-neutral-950 transition-colors">
            {scrollDirection === "down" ? (
              <ArrowDown className="w-3.5 h-3.5" />
            ) : (
              <ArrowUp className="w-3.5 h-3.5" />
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-cyan-400 font-bold">{scrollProgressVal}%</span>
            <span className="hidden sm:inline text-neutral-400 group-hover:text-neutral-200">
              {scrollProgressVal > 90 ? "Top" : "Scroll"}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
