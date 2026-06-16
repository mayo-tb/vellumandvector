"use client";

import { useEffect, useRef, useState } from "react";

const NEW_PRICING_TIERS = [
  {
    id: "essentials",
    name: "ESSENTIALS",
    price: "Starting at ₦150k",
    features: [
      "Custom UI/UX Design",
      "Responsive Frontend (Next.js)",
      "Basic SEO Setup",
      "Contact Form Integration",
    ],
    cta: "Start Project",
    highlighted: false,
  },
  {
    id: "professional",
    name: "PROFESSIONAL",
    price: "Starting at ₦400k",
    features: [
      "Everything in Essentials",
      "Custom Backend (Django)",
      "Database & Authentication",
      "CMS Integration",
      "Payment Gateway Setup",
    ],
    cta: "Start Project",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    price: "Custom Scope",
    features: [
      "Everything in Professional",
      "Scalable Cloud Architecture",
      "Complex 3rd-Party APIs",
      "SLA & Priority Support",
      "Post-launch Retainer",
    ],
    cta: "Let's Talk →",
    highlighted: false,
  }
];

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
      className="bg-white"
      style={{ padding: "120px clamp(24px, 8vw, 80px)" }}
    >
      <div 
        className="max-w-6xl mx-auto w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            style={{ 
              fontFamily: "sans-serif",
              fontSize: "48px",
              color: "#0A0A0A",
              lineHeight: 1.1,
              marginBottom: "16px"
            }}
          >
            Transparent Pricing
          </h2>
          <p 
            style={{ 
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
            }}
          >
            No retainer surprises. No hidden fees. You pay in milestones.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          className="grid gap-6 grid-cols-1 md:grid-cols-3 items-start"
        >
          {NEW_PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className="relative flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: tier.highlighted ? "2px solid #1B4FD8" : "1px solid #E5E9F0",
                padding: tier.highlighted ? "56px 32px 36px 32px" : "36px 32px",
                overflow: "hidden",
                boxShadow: tier.highlighted ? "0 20px 40px rgba(27, 79, 216, 0.08)" : "0 4px 20px rgba(0, 0, 0, 0.03)",
              }}
            >
              {tier.highlighted && (
                <div 
                  className="absolute top-0 left-0 w-full text-center"
                  style={{
                    backgroundColor: "#EEF2FF",
                    padding: "6px 0",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#1B4FD8",
                  }}
                >
                  Most Chosen
                </div>
              )}

              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                {tier.name}
              </p>

              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "40px",
                  color: "#0A0A0A",
                  marginBottom: "32px",
                  lineHeight: 1.1,
                }}
              >
                {tier.price}
              </p>

              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {tier.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "14px",
                      color: "#374151",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "#1B4FD8", fontWeight: "bold" }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="flex items-center justify-center transition-all duration-200 hover:opacity-90"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "12px 24px",
                  borderRadius: "8px",
                  border: "1px solid #1B4FD8",
                  backgroundColor: tier.highlighted ? "#1B4FD8" : "transparent",
                  color: tier.highlighted ? "#FFFFFF" : "#1B4FD8",
                }}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-12"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "13px",
            color: "#9CA3AF",
          }}
        >
          All projects include mobile-first design, SEO setup, performance optimisation, and 30 days post-launch support.
        </p>
      </div>
    </section>
  );
}
