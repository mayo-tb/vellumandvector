"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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
      id="services"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: "#0F172A" }}
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none z-0" />

      {/* Subtle Aurora Glow */}
      <div
        className="animate-blob-drift"
        style={{
          position: "absolute",
          width: "550px",
          height: "550px",
          bottom: "-10%",
          right: "-100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          "--blob-duration": "22s",
          "--blob-delay": "1s",
        } as React.CSSProperties}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-3">
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
              — Services
            </span>
          </div>

          <h2 className="section-heading" style={{ color: "#ffffff" }}>
            What We <span className="text-shimmer">Build</span>
          </h2>
          <p className="section-subheading" style={{ color: "rgba(245,243,240,0.60)", maxWidth: "580px", marginLeft: "auto", marginRight: "auto" }}>
            From design concept to robust backend engineering — custom digital products built to perform.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className="glass glass-hover-spotlight"
              onMouseMove={handleMouseMove}
              style={{
                borderRadius: "24px",
                padding: "36px 32px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.08}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.08}s, border-color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.16,1,0.3,1)`,
                cursor: "default",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.35)";
                e.currentTarget.style.boxShadow = "0 16px 40px rgba(255,107,53,0.12), 0 8px 32px rgba(0,0,0,0.2)";
                const iconContainer = e.currentTarget.querySelector(".service-icon-box") as HTMLDivElement;
                if (iconContainer) {
                  iconContainer.style.transform = "scale(1.1) rotate(6deg)";
                  iconContainer.style.borderColor = "rgba(255,107,53,0.40)";
                  iconContainer.style.background = "rgba(255,107,53,0.20)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.boxShadow = "";
                const iconContainer = e.currentTarget.querySelector(".service-icon-box") as HTMLDivElement;
                if (iconContainer) {
                  iconContainer.style.transform = "scale(1) rotate(0deg)";
                  iconContainer.style.borderColor = "rgba(255,107,53,0.20)";
                  iconContainer.style.background = "rgba(255,107,53,0.12)";
                }
              }}
            >
              {/* Icon Container */}
              <div
                className="service-icon-box"
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  background: "rgba(255,107,53,0.12)",
                  border: "1px solid rgba(255,107,53,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  marginBottom: "24px",
                  transition: "all 300ms ease",
                  color: "var(--color-secondary)",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "12px",
                  lineHeight: 1.3,
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(245,243,240,0.65)",
                  marginBottom: "24px",
                  flex: 1,
                }}
              >
                {service.description}
              </p>

              {service.tech && (
                <div style={{ marginTop: "auto" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      fontFamily: "var(--font-tech)",
                      fontSize: "11px",
                      color: "rgba(245,243,240,0.50)",
                      fontWeight: 600,
                    }}
                  >
                    {service.tech}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
