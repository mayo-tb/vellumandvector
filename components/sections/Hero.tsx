"use client";

import React, { useEffect, useRef, useState } from "react";

// Animated scroll chevron
function ScrollChevron() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-65 cursor-pointer z-20" onClick={() => {
      document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
    }}>
      <span
        className="text-xs tracking-widest uppercase"
        style={{ fontFamily: "var(--font-tech)", fontSize: "10px", color: "var(--color-tertiary)", opacity: 0.8 }}
      >
        Scroll
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="animate-bounce"
        style={{ color: "var(--color-secondary)" }}
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCTAClick = (target: string) => {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "radial-gradient(circle at 50% 50%, #151e34 0%, #0F172A 100%)",
        padding: "120px 20px 80px",
      }}
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      {/* Aurora Mesh Blur Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none filter blur-[100px] opacity-40 z-0">
        {/* Blob 1: Orange/coral */}
        <div
          className="animate-aurora-1 absolute rounded-full"
          style={{
            width: "550px",
            height: "550px",
            top: "-10%",
            right: "5%",
            background: "radial-gradient(circle, rgba(255,107,53,0.3) 0%, rgba(15,23,42,0) 70%)",
          }}
        />
        {/* Blob 2: Indigo/Violet */}
        <div
          className="animate-aurora-2 absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            bottom: "-10%",
            left: "-5%",
            background: "radial-gradient(circle, rgba(79,70,229,0.35) 0%, rgba(15,23,42,0) 70%)",
          }}
        />
        {/* Blob 3: Accent/Gold */}
        <div
          className="animate-aurora-3 absolute rounded-full"
          style={{
            width: "450px",
            height: "450px",
            top: "30%",
            left: "25%",
            background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(15,23,42,0) 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        {/* Eyebrow tag */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass glow-card-pulse"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ 
              background: "var(--color-secondary)",
              boxShadow: "0 0 10px var(--color-secondary)"
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-tech)",
              fontSize: "12px",
              color: "rgba(245,243,240,0.9)",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Lagos GRA · Premium Web Agency
          </span>
        </div>

        {/* Main Headline with staggered animation */}
        <h1
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "clamp(38px, 7.5vw, 84px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#ffffff",
            marginBottom: "28px",
          }}
        >
          {/* Staggered Words */}
          <span 
            className="inline-block" 
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            We Design
          </span>{" "}
          <span 
            className="inline-block" 
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            Websites
          </span>{" "}
          <br className="hidden sm:inline" />
          <span 
            className="relative inline-block" 
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            <span className="text-shimmer pr-2">That Sell</span>
            {/* Elegant glowing accent stroke */}
            <svg
              className="absolute -bottom-3 left-0 w-full h-3"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q50,9 100,5"
                stroke="url(#headline-underline)"
                strokeWidth="3.5"
                fill="transparent"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: mounted ? 0 : 100,
                  transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1) 0.8s",
                }}
              />
              <defs>
                <linearGradient id="headline-underline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B35" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#FF6B35" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 2.5vw, 21px)",
            lineHeight: 1.7,
            color: "rgba(245,243,240,0.80)",
            marginBottom: "28px",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s",
          }}
        >
          High-performance, bespoke digital experiences tailored to scale your brand.
          <br />
          <span style={{ color: "rgba(245,243,240,0.55)", fontWeight: 500 }}>Engineered to perform. Built to convert.</span>
        </p>

        {/* Tech strip */}
        <p
          style={{
            fontFamily: "var(--font-tech)",
            fontSize: "13px",
            color: "rgba(245,243,240,0.40)",
            letterSpacing: "0.1em",
            marginBottom: "48px",
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.7s",
          }}
        >
          React · Django · TypeScript · PostgreSQL — not templates.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s",
          }}
        >
          <button
            className="btn-primary btn-sweep w-full sm:w-auto"
            onClick={() => handleCTAClick("#projects")}
            style={{ 
              minWidth: "220px",
              boxShadow: "0 0 30px rgba(255, 107, 53, 0.25)"
            }}
          >
            See Our Work
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="btn-secondary w-full sm:w-auto"
            onClick={() => handleCTAClick("#contact")}
            style={{ 
              minWidth: "220px",
              borderColor: "rgba(255, 107, 53, 0.60)",
              backdropFilter: "blur(4px)"
            }}
          >
            Start Your Project
          </button>
        </div>

        {/* Stats Summary Panel */}
        <div
          className="w-full flex justify-center mt-12"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.95s",
          }}
        >
          <div className="w-full max-w-xl grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1 sm:gap-2">
            {[
              { value: "3+", label: "Live Projects" },
              { value: "2–8", label: "Week Delivery" },
              { value: "₦", label: "Naira Pricing" },
            ].map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && (
                  <div 
                    className="h-8 w-[1px]" 
                    style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.15) 50%, transparent)" }}
                  />
                )}
                <div className="flex flex-col items-center justify-center">
                  <span
                    style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "clamp(20px, 3.8vw, 28px)",
                      fontWeight: 800,
                      color: "var(--color-secondary)",
                      lineHeight: 1.1,
                      textShadow: "0 0 10px rgba(255,107,53,0.25)"
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(9px, 1.7vw, 11px)",
                      color: "rgba(245,243,240,0.60)",
                      fontWeight: 600,
                      marginTop: "2px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <ScrollChevron />
    </section>
  );
}
