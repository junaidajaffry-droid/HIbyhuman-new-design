import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { studioInfo } from "../data/siteData";
import { ProposalFormData } from "../types";
import { X, CheckCircle2, Download, ShieldCheck, Sparkles, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
}) => {
  const [formData, setFormData] = useState<ProposalFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    company: "",
    serviceType: preselectedProduct || "Web & Mobile Development",
    budgetRange: "Pro Tier (£599 - £1,199)",
    notes: preselectedProduct ? `Inquiry regarding: ${preselectedProduct}` : "",
  });

  const [promoCode, setPromoCode] = useState("FIRST50");
  const [promoApplied, setPromoApplied] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [downloaded, setDownloaded] = useState(false);

  // Trigger celebratory confetti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: ["#0284c7", "#38bdf8", "#4f46e5", "#f43f5e", "#10b981", "#f59e0b"],
      zIndex: 99999,
      disableForReducedMotion: true,
      scalar: 1.05,
    });

    const timeout = setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0.25, y: 0.6 },
        colors: ["#38bdf8", "#0284c7", "#34d399", "#fef08a"],
        zIndex: 99999,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 0.75, y: 0.6 },
        colors: ["#38bdf8", "#6366f1", "#f43f5e", "#fef08a"],
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        serviceType: preselectedProduct,
        notes: `Inquiry regarding: ${preselectedProduct}`,
      }));
    }
  }, [preselectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setDownloaded(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "HBH-" + Math.floor(100000 + Math.random() * 900000);
    setReferenceId(ref);
    setIsSubmitted(true);
    triggerConfetti();
  };

  const downloadBrief = () => {
    const briefContent = `=====================================================
HiByHuman - Project Proposal & Architecture Brief
Human ideas. Powered by intelligent technology. | London, UK
=====================================================

Project Reference: ${referenceId || "HBH-" + Math.floor(100000 + Math.random() * 900000)}
Date Generated: ${new Date().toLocaleDateString("en-GB", { dateStyle: "full" })}

1. CLIENT & STAKEHOLDER INFORMATION:
   Client Name: ${formData.fullName || "Valued Partner"}
   Company / Organization: ${formData.company || "Direct Engagement"}
   Phone / WhatsApp: ${formData.phoneNumber || "On record"}
   Email Address: ${formData.email || "On record"}

2. PROJECT REQUIREMENTS & SCOPE:
   Target Service Domain: ${formData.serviceType}
   Budget Tier / Scope: ${formData.budgetRange}
   Promotion Applied: ${promoApplied ? `50% OFF FIRST ORDER (Code: ${promoCode || "FIRST50"})` : "None"}
   Project Objectives & Technical Brief:
   ${formData.notes || "Bespoke design and modern web/app development."}

3. HIBYHUMAN TRIPLE GUARANTEE:
   ✓ 100% Unique Design (No Ready-Made Templates)
   ✓ W3C Validated Clean Code & High-Performance Architecture
   ✓ 100% Money-Back & Satisfaction Guarantee
   ✓ Complete Intellectual Property & Source Code Ownership
   ✓ Dedicated UK Project Lead & Direct Communication Line

Studio Contact: ${studioInfo.email} | ${studioInfo.phone}
Studio Headquarters: ${studioInfo.location}
Website: ${studioInfo.website}
=====================================================`;

    const blob = new Blob([briefContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hibyhuman-proposal-${
      formData.fullName ? formData.fullName.toLowerCase().replace(/\s+/g, "-") : "brief"
    }.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
      >
        {/* Header */}
        <div className="p-6 sm:p-8 bg-neutral-950 text-white relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-400 mb-3 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LET'S TALK • INSTANT SCOPING</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Bring Your Human Ideas To Life
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Fill in your brief to receive a customized project proposal and milestone roadmap.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 50% Off First Order Activation Banner */}
                {promoApplied && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[10px] tracking-wider uppercase shrink-0">
                        50% OFF
                      </span>
                      <span className="text-xs text-rose-950 font-medium leading-tight">
                        First Order Discount: 50% will be applied to your scoping quote!
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-rose-700 bg-white/80 px-2 py-0.5 rounded border border-rose-200 shrink-0">
                      {promoCode}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Work Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7000 000000"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Target Service
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) =>
                        setFormData({ ...formData, serviceType: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-cyan-500 bg-white"
                    >
                      <option>Social Media Management</option>
                      <option>Branding & Visual Identity</option>
                      <option>Digital Marketing</option>
                      <option>Book Writing & Publishing</option>
                      <option>Web & Mobile Development</option>
                      <option>Interactive UI/UX Design</option>
                      <option>E-Commerce Stores & Gateways</option>
                      <option>SEO & Search Visibility</option>
                      <option>Pitch Decks & Presentations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Budget Scale
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) =>
                        setFormData({ ...formData, budgetRange: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-cyan-500 bg-white"
                    >
                      <option>Startup Tier (£199 - £599)</option>
                      <option>Pro Tier (£599 - £1,199)</option>
                      <option>Elite Tier (£1,200 - £3,000)</option>
                      <option>Enterprise Scale (£3,000+)</option>
                      <option>Monthly Retainer (£350 - £1,500/mo)</option>
                    </select>
                  </div>
                </div>

                {/* Promo Code Input Row */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-neutral-700">
                      Promotional Discount Code
                    </label>
                    {promoApplied && (
                      <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        50% Off First Order Applied
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. FIRST50"
                      value={promoCode}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setPromoCode(val);
                        setPromoApplied(val === "FIRST50" || val.includes("50"));
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 text-sm font-mono uppercase focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPromoCode("FIRST50");
                        setPromoApplied(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium cursor-pointer transition-colors"
                    >
                      Use FIRST50
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Project Notes & Technical Objectives
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your vision, target launch timeline, and key requirements..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center gap-2 text-xs text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    100% Money-Back Guarantee with strict NDA confidentiality.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-neutral-950 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry & Generate Proposal</span>
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold block mb-1">
                    Inquiry Received Successfully
                  </span>
                  <h4 className="text-2xl font-bold text-neutral-950">
                    Your Proposal is Ready
                  </h4>
                  <p className="text-sm text-neutral-600 mt-1 max-w-sm mx-auto">
                    A senior UK technical director has been assigned to your brief. Reference code:{" "}
                    <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
                      {referenceId}
                    </span>
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-left space-y-2 text-xs text-neutral-700">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Service:</span>
                    <span className="font-semibold text-neutral-900">{formData.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Contact:</span>
                    <span className="font-semibold text-neutral-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Turnaround Kickoff:</span>
                    <span className="font-semibold text-emerald-600">Within 24 Hours</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={downloadBrief}
                    className="flex-1 py-3.5 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>{downloaded ? "Downloaded Proposal Brief" : "Download Project Brief (.txt)"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
