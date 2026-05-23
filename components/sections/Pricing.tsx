"use client";

import { useEffect, useRef, useState } from "react";
import { PRICING_TIERS } from "@/lib/constants";

export default function Pricing() {
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

  return (
    <section
      id="pricing"
      ref={ref}
      className="section-padding"
      style={{
        background:
          "linear-gradient(180deg, #0F172A 0%, #111827 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2 className="section-heading" style={{ color: "#ffffff" }}>
            Transparent{" "}
            <span style={{ color: "var(--color-secondary)" }}>Pricing</span>
          </h2>
          <p className="section-subheading">
            No retainer surprises. No hidden fees. You pay in milestones — not upfront.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
            alignItems: "start",
          }}
        >
          {PRICING_TIERS.map((tier, i) => (
            <div
              key={tier.id}
              style={{
                borderRadius: "24px",
                padding: "32px",
                background: tier.highlighted
                  ? "linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(255,107,53,0.05) 100%)"
                  : "rgba(255,255,255,0.05)",
                border: tier.highlighted
                  ? "1px solid rgba(255,107,53,0.40)"
                  : "1px solid rgba(255,255,255,0.08)",
                boxShadow: tier.highlighted
                  ? "0 0 40px rgba(255,107,53,0.15)"
                  : "none",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? tier.highlighted ? "translateY(-8px)" : "translateY(0)"
                  : "translateY(24px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s`,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Popular badge */}
              {tier.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    padding: "4px 12px",
                    borderRadius: "100px",
                    background: "var(--color-secondary)",
                    fontFamily: "var(--font-tech)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Popular
                </div>
              )}

              <p
                style={{
                  fontFamily: "var(--font-tech)",
                  fontSize: "12px",
                  color: "rgba(245,243,240,0.50)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {tier.name}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: tier.highlighted ? "var(--color-secondary)" : "#ffffff",
                  marginBottom: "8px",
                  lineHeight: 1.1,
                }}
              >
                {tier.range}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "rgba(245,243,240,0.50)",
                  marginBottom: "24px",
                  lineHeight: 1.5,
                }}
              >
                {tier.bestFor}
              </p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "rgba(245,243,240,0.75)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "var(--color-secondary)", flexShrink: 0, marginTop: "2px" }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={tier.highlighted ? "btn-primary" : "btn-secondary"}
                style={{ display: "flex", width: "100%", justifyContent: "center" }}
              >
                {tier.cta === "Most Popular" ? "Get Started" : tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-8 text-sm"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(245,243,240,0.35)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
          }}
        >
          All projects include mobile-first design, SEO setup, performance optimisation, and 30 days post-launch support.
        </p>
      </div>
    </section>
  );
}
