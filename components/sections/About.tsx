"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "3+", label: "Live Projects", desc: "Crafted with precision" },
  { value: "2–8", label: "Week Delivery", desc: "From kickoff to launch" },
  { value: "100%", label: "Custom Built", desc: "Zero templates used" },
  { value: "₦", label: "Naira Pricing", desc: "No exchange rate shocks" },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #131B2E 0%, #0F172A 100%)",
      }}
    >
      {/* Wave transition divider at top */}
      <div 
        style={{ 
          position: "absolute", 
          top: "-2px", 
          left: 0, 
          width: "100%", 
          overflow: "hidden", 
          lineHeight: 0, 
          zIndex: 5 
        }}
      >
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          style={{ display: "block", width: "100%", height: "48px", transform: "rotate(180deg)" }}
        >
          <path d="M0,0 C320,90 1120,90 1440,0 L1440,120 L0,120 Z" fill="#0F172A" />
        </svg>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none z-0" />

      {/* Background glowing blob */}
      <div
        className="animate-blob-drift"
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          top: "15%",
          left: "-180px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          "--blob-duration": "18s",
          "--blob-delay": "2s",
        } as React.CSSProperties}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "56px",
          }}
          className="lg:grid-cols-2"
        >
          {/* Left: Copy */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                style={{
                  fontFamily: "var(--font-tech)",
                  fontSize: "12px",
                  color: "var(--color-secondary)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                — About Vellum & Vector
              </span>
            </div>

            <h2
              className="section-heading"
              style={{ color: "#ffffff", marginBottom: "24px", lineHeight: 1.15 }}
            >
              Built Different.{" "}
              <br />
              <span className="text-shimmer">On Purpose.</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                lineHeight: 1.8,
                color: "rgba(245,243,240,0.8)",
                marginBottom: "36px",
              }}
            >
              We are Vellum & Vector — a custom web design and engineering studio
              based in <strong style={{ color: "var(--color-tertiary)" }}>Lagos GRA</strong>. We
              build exclusively with React, TypeScript, Django, and PostgreSQL because we believe the
              technology behind your website dictates its success.
              <br />
              <br />
              Whether you need to project credibility for luxury real estate or capture high-value leads for a service business, we deliver stunning production-ready websites in{" "}
              <strong style={{ color: "var(--color-secondary)" }}>2–8 weeks</strong>. Complete transparency, local support, and zero compromise.
            </p>

            <div>
              <a href="#contact" className="btn-primary btn-sweep" style={{ display: "inline-flex" }}>
                Work With Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                width: "100%",
              }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass glass-hover-spotlight"
                  onMouseMove={handleMouseMove}
                  style={{
                    borderRadius: "24px",
                    padding: "32px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    minHeight: "160px",
                    transition: "transform 350ms cubic-bezier(0.16,1,0.3,1), border-color 300ms ease, box-shadow 300ms ease",
                    cursor: "default",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.35)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(255,107,53,0.12), 0 8px 32px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "42px",
                      fontWeight: 800,
                      color: "var(--color-secondary)",
                      lineHeight: 1,
                      marginBottom: "6px",
                      textShadow: "0 0 12px rgba(255,107,53,0.25)"
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-headline)",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      color: "rgba(245,243,240,0.50)",
                    }}
                  >
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
