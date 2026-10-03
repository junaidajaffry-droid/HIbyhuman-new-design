import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export const ScrollGradientBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Framer Motion scroll hooks
  const { scrollY, scrollYProgress } = useScroll();

  // Smooth springs for buttery parallax translation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Parallax offsets for different background depths
  const orb1ParallaxY = useTransform(smoothProgress, [0, 1], [-40, 240]);
  const orb2ParallaxY = useTransform(smoothProgress, [0, 1], [30, -220]);
  const orb3ParallaxY = useTransform(smoothProgress, [0, 1], [-20, 180]);
  const gridParallaxY = useTransform(smoothProgress, [0, 1], [0, -120]);
  const auroraAngle = useTransform(smoothProgress, [0, 1], [135, 315]);

  // Track scroll direction and mouse position
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY + 2) {
        setScrollDir("down");
      } else if (currentY < lastY - 2) {
        setScrollDir("up");
      }
      lastY = currentY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Ambient floating particle canvas with scroll-reactive velocity
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate lightweight floating stardust particles
    const particleCount = Math.min(48, Math.floor(window.innerWidth / 30));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.45 + 0.15,
      speedY: (Math.random() - 0.5) * 0.4,
      speedX: (Math.random() - 0.5) * 0.3,
      color:
        Math.random() > 0.5
          ? "rgba(0, 212, 255, " // cyan
          : Math.random() > 0.5
          ? "rgba(168, 85, 247, " // purple
          : "rgba(16, 185, 129, ", // emerald
    }));

    let lastScrollVal = window.scrollY;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollVal = window.scrollY;
      const scrollDelta = (currentScrollVal - lastScrollVal) * 0.12;
      lastScrollVal = currentScrollVal;

      particles.forEach((p) => {
        // Natural gentle drift + scroll parallax momentum
        p.y += p.speedY - scrollDelta;
        p.x += p.speedX;

        // Wrap around canvas edges
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color + "0.6)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Compute dynamic chromatic spectrum based on mouse & scroll
  const mouseOffsetX = (mousePos.x - 0.5) * 35;
  const mouseOffsetY = (mousePos.y - 0.5) * 35;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-50 overflow-hidden select-none"
    >
      {/* Dynamic Animated Base Aurora Gradient */}
      <motion.div
        className="absolute inset-0 animate-aurora opacity-95 transition-opacity duration-1000"
        style={{
          background: `linear-gradient(135deg, 
            #fafcff 0%, 
            #f0f8ff 25%, 
            #f7f2ff 50%, 
            #eefdfa 75%, 
            #fcf8f6 100%)`,
        }}
      />

      {/* Floating Animated Chromatic Mesh Orb 1: Electric Cyan (Top-Left) */}
      <motion.div
        className="absolute w-[720px] h-[720px] rounded-full blur-[140px] opacity-45 mix-blend-multiply animate-float-orb1"
        style={{
          top: "8%",
          left: "12%",
          x: mouseOffsetX * 1.2,
          y: orb1ParallaxY,
          background:
            "radial-gradient(circle, rgba(0, 212, 255, 0.45) 0%, rgba(99, 102, 241, 0.25) 45%, transparent 70%)",
        }}
      />

      {/* Floating Animated Chromatic Mesh Orb 2: Neon Purple / Fuchsia (Mid-Right) */}
      <motion.div
        className="absolute w-[680px] h-[680px] rounded-full blur-[150px] opacity-40 mix-blend-multiply animate-float-orb2"
        style={{
          top: "42%",
          right: "8%",
          x: -mouseOffsetX * 1.5,
          y: orb2ParallaxY,
          background:
            "radial-gradient(circle, rgba(217, 70, 239, 0.42) 0%, rgba(168, 85, 247, 0.22) 50%, transparent 70%)",
        }}
      />

      {/* Floating Animated Chromatic Mesh Orb 3: Emerald & Amber Gold (Bottom-Left / Center) */}
      <motion.div
        className="absolute w-[750px] h-[750px] rounded-full blur-[160px] opacity-35 mix-blend-multiply animate-float-orb3"
        style={{
          bottom: "10%",
          left: "28%",
          x: mouseOffsetX * 0.8,
          y: orb3ParallaxY,
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(245, 158, 11, 0.2) 55%, transparent 70%)",
        }}
      />

      {/* Interactive Stardust Particle Field (Responds to Scroll Velocity & Direction) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* Parallax Fine Micro-Dot Digital Matrix Overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.032] pointer-events-none"
        style={{
          y: gridParallaxY,
          backgroundImage: "radial-gradient(#000000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle Scroll Direction Flare Accent at Viewport Rim */}
      <div
        className={`absolute inset-x-0 h-1 transition-opacity duration-700 pointer-events-none ${
          scrollDir === "down" ? "top-0 opacity-20" : "bottom-0 opacity-20"
        } bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 blur-sm`}
      />
    </div>
  );
};
