import React, { useState } from "react";
import { HiByHumanMark } from "./HiByHumanLogo";
import { Menu, X, ArrowUpRight, Sparkles, Tag, Check, Copy } from "lucide-react";

interface NavbarProps {
  onOpenFittingModal: (product?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFittingModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promoVisible, setPromoVisible] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Packages", href: "#pricing" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText("FIRST50");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex flex-col transition-all">
        {/* Top 50% OFF Promotional Announcement Banner */}
        {promoVisible && (
          <div className="w-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-cyan-950 text-white px-4 sm:px-8 py-2 border-b border-cyan-500/30 text-xs sm:text-sm font-medium flex items-center justify-between shadow-md transition-all">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400 text-neutral-950 text-[11px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                <Sparkles className="w-3 h-3 text-neutral-950" />
                <span>50% OFF FIRST ORDER</span>
              </span>

              <span className="text-white font-medium text-xs sm:text-sm">
                Special welcome discount for new clients! Use code:
              </span>

              {/* Copyable Promo Code Badge */}
              <button
                type="button"
                onClick={handleCopyCode}
                title="Click to copy promo code"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold text-xs tracking-wider cursor-pointer transition-colors"
              >
                <Tag className="w-3 h-3 text-cyan-400" />
                <span>FIRST50</span>
                {copiedCode ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-neutral-400" />
                )}
              </button>

              <span className="hidden md:inline text-neutral-400 text-xs">
                • Applies to all design, development & branding packages
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0 ml-2">
              <button
                type="button"
                onClick={() =>
                  onOpenFittingModal("50% Off First Order Promotion (Code: FIRST50)")
                }
                className="px-3 py-1 rounded-full bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-all shadow-sm cursor-pointer whitespace-nowrap hidden sm:inline-flex items-center gap-1"
              >
                <span>Claim 50% Off</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={() => setPromoVisible(false)}
                aria-label="Dismiss promotional announcement"
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Primary Navbar Bar */}
        <div className="w-full px-6 sm:px-10 py-3.5 sm:py-4 flex flex-row justify-between items-center bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <HiByHumanMark
              className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105 duration-200"
              animated={false}
            />
            <div className="flex items-center gap-1">
              <span className="text-[21px] sm:text-[24px] tracking-tight text-black font-bold select-none font-sans">
                HiByHuman
              </span>
              <span className="text-[#00d4ff] text-lg sm:text-xl font-black select-none leading-none -mt-1 ml-0.5">
                ✳
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row items-center text-[17px] xl:text-[19px] font-normal text-black select-none">
            {navItems.map((item, idx) => (
              <React.Fragment key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-cyan-600 transition-colors"
                >
                  {item.label}
                </a>
                {idx < navItems.length - 1 && (
                  <span className="opacity-40 select-none mx-2">,</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenFittingModal("50% Off First Order - Consultation")}
              className="hidden md:flex items-center gap-1.5 text-[17px] lg:text-[19px] font-normal text-black underline underline-offset-4 decoration-black/60 hover:decoration-cyan-500 hover:text-cyan-600 transition-all cursor-pointer bg-transparent border-0 p-0"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-24 px-6 pb-10 flex flex-col justify-between lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Navigation Menu
            </span>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="text-2xl font-medium text-neutral-900 hover:text-cyan-600 transition-colors py-2 border-b border-neutral-100"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFittingModal("Let's Talk - Consultation");
              }}
              className="w-full py-4 rounded-full bg-neutral-950 text-white font-medium text-center hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Let's Talk — Start Project
            </button>
            <div className="text-center text-xs font-mono text-neutral-500">
              Built for Next Digital Era • London & Global
            </div>
          </div>
        </div>
      )}
    </>
  );
};
