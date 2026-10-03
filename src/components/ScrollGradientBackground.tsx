import React, { useEffect, useState } from "react";

export const ScrollGradientBackground: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, currentScrollY / maxScroll)) : 0;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Compute dynamic gradient color stops and angles based on scrollProgress (0 to 1)
  // Rotating angle: starts at 135deg and rotates smoothly up to 315deg with scroll
  const gradientAngle = 135 + scrollProgress * 180;

  // Key color stops dynamically shifting with scroll depth:
  // 0.0 - 0.25 (Top): Ice Cyan (#e0f7fa) -> Soft Sky (#e0f2fe) -> Lavender (#f3e8ff)
  // 0.25 - 0.50 (Mid-top): Violet (#ede9fe) -> Electric Indigo tint (#e0e7ff) -> Mint (#e6fffa)
  // 0.50 - 0.75 (Mid-bottom): Cyber Teal (#ccfbf1) -> Amber tint (#fef3c7) -> Rose tint (#ffe4e6)
  // 0.75 - 1.00 (Bottom): Deep Sapphire tint (#dbeafe) -> Aquamarine (#cffafe) -> Clean Ice (#f8fafc)

  // Floating mesh positions based on scroll
  const orb1Y = 10 + scrollProgress * 55; // 10% to 65%
  const orb1X = 15 + Math.sin(scrollProgress * Math.PI * 2) * 20; // gentle oscillation
  const orb2Y = 60 - scrollProgress * 40; // 60% to 20%
  const orb2X = 75 - Math.cos(scrollProgress * Math.PI * 2) * 15;
  const orb3Y = 85 - scrollProgress * 30; // 85% to 55%

  // Gradient hue shift for the ambient orbs
  const hue1 = (190 + scrollProgress * 140) % 360; // 190 (cyan) -> 330 (rose/violet)
  const hue2 = (260 + scrollProgress * 100) % 360; // 260 (purple) -> 360 (red/orange)
  const hue3 = (160 + scrollProgress * 80) % 360; // 160 (emerald) -> 240 (blue)

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden transition-all duration-700 ease-out"
    >
      {/* Dynamic Base Gradient Layer */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          background: `linear-gradient(${gradientAngle}deg, 
            hsl(${hue1}, 85%, 97%) 0%, 
            hsl(${hue2}, 70%, 96%) 35%, 
            hsl(${hue3}, 75%, 95%) 70%, 
            hsl(${(hue1 + 60) % 360}, 80%, 98%) 100%)`,
        }}
      />

      {/* Floating Ambient Mesh Orb 1 (Top / Left) */}
      <div
        className="absolute w-[680px] h-[680px] rounded-full blur-[140px] opacity-45 mix-blend-multiply transition-all duration-700 ease-out"
        style={{
          top: `${orb1Y}%`,
          left: `${orb1X}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(${hue1}, 95%, 75%) 0%, transparent 70%)`,
        }}
      />

      {/* Floating Ambient Mesh Orb 2 (Right / Center) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-40 mix-blend-multiply transition-all duration-700 ease-out"
        style={{
          top: `${orb2Y}%`,
          left: `${orb2X}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(${hue2}, 90%, 78%) 0%, transparent 70%)`,
        }}
      />

      {/* Floating Ambient Mesh Orb 3 (Bottom Center) */}
      <div
        className="absolute w-[720px] h-[720px] rounded-full blur-[160px] opacity-35 mix-blend-multiply transition-all duration-700 ease-out"
        style={{
          top: `${orb3Y}%`,
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, hsl(${hue3}, 90%, 76%) 0%, transparent 70%)`,
        }}
      />

      {/* Subtle fine matrix overlay for depth */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  );
};
