"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS_STEPS } from "@/lib/constants";

export default function Process() {
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
      id="process"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2 className="section-heading" style={{ color: "#ffffff" }}>
            From Brief{" "}
            <span style={{ color: "var(--color-secondary)" }}>to Launch</span>
          </h2>
          <p className="section-subheading">
            A clear process so you always know where your project stands.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.number}
              style={{
                display: "flex",
                gap: "24px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-24px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s`,
              }}
            >
              {/* Left: number + connector line */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    background:
                      i === 0
                        ? "var(--color-secondary)"
                        : "rgba(255,107,53,0.12)",
                    border: `2px solid ${i === 0 ? "transparent" : "rgba(255,107,53,0.30)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-tech)",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: i === 0 ? "#fff" : "var(--color-secondary)",
                    flexShrink: 0,
                    transition: "background 300ms ease",
                  }}
                >
                  {step.number}
                </div>

                {/* Connector */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    style={{
                      width: "2px",
                      flex: 1,
                      minHeight: "40px",
                      background:
                        "linear-gradient(to bottom, rgba(255,107,53,0.30) 0%, rgba(255,107,53,0.05) 100%)",
                      margin: "6px 0",
                    }}
                  />
                )}
              </div>

              {/* Right: content */}
              <div
                className="glass"
                style={{
                  borderRadius: "16px",
                  padding: "20px 24px",
                  flex: 1,
                  marginBottom: i < PROCESS_STEPS.length - 1 ? "12px" : 0,
                  cursor: "default",
                  transition: "box-shadow 250ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,107,53,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "8px",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "rgba(245,243,240,0.60)",
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-12 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.7s",
          }}
        >
          <a href="#contact" className="btn-primary" style={{ display: "inline-flex" }}>
            Start With Discovery
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
