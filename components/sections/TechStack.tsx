"use client";

import { useEffect, useRef, useState } from "react";
import { TECH_STACK, type TechItem } from "@/lib/constants";

// SVG icons as inline components (no external dependency needed)
const TECH_ICONS: Record<string, React.ReactNode> = {
  React: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.5" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="#3178C6" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#3178C6"/>
      <text x="3" y="17" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">TS</text>
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="black" stroke="white" strokeWidth="0.5"/>
      <path d="M7 8.5L16.5 15.5M7 8.5v7M16.5 8.5v7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8C16.2 7.2 19.35 5.85 22.95 6.75C25.004 7.263 26.472 8.754 28.097 10.403C30.744 13.09 33.808 16.2 40.5 16.2C47.7 16.2 52.2 12.6 54 5.4C51.3 9 48.15 10.35 44.55 9.45C42.496 8.937 41.028 7.446 39.403 5.797C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27C2.7 23.4 5.85 22.05 9.45 22.95C11.504 23.464 12.972 24.954 14.597 26.603C17.244 29.29 20.308 32.4 27 32.4C34.2 32.4 38.7 28.8 40.5 21.6C37.8 25.2 34.65 26.55 31.05 25.65C28.996 25.137 27.528 23.646 25.903 21.997C23.256 19.31 20.192 16.2 13.5 16.2Z" fill="#06B6D4"/>
    </svg>
  ),
  Django: (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#092E20"/>
      <text x="3" y="16" fill="#44B78B" fontSize="8" fontWeight="bold" fontFamily="monospace">DJG</text>
    </svg>
  ),
  "Django REST Framework": (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#1a1a1a"/>
      <text x="2.5" y="16" fill="#A30000" fontSize="7" fontWeight="bold" fontFamily="monospace">DRF</text>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656L6.208 5.4h5.814v.8H3.887S0 5.752 0 11.914c0 6.163 3.405 5.943 3.405 5.943H5.4v-2.86s-.116-3.405 3.35-3.405h5.773s3.24.052 3.24-3.132V3.24S18.28 0 11.914 0zm-3.21 1.87a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z" fill="#4584B6"/>
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.008-2.744H12v-.8h8.135S24 18.248 24 12.086c0-6.163-3.405-5.943-3.405-5.943H18.6v2.86s.116 3.405-3.35 3.405H9.477S6.237 12.356 6.237 15.54V20.76S5.72 24 12.086 24zm3.21-1.87a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1z" fill="#FFD43B"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#336791"/>
      <text x="2" y="16" fill="white" fontSize="7.5" fontWeight="bold" fontFamily="monospace">PG</text>
      <text x="2" y="21" fill="#a8c8e8" fontSize="5.5" fontFamily="monospace">SQL</text>
    </svg>
  ),
  Cloudinary: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#3448C5"/>
      <path d="M7 14c-2.2 0-4-1.8-4-4s1.8-4 4-4c.3 0 .6 0 .9.1C8.5 4.4 10.1 3 12 3c2.5 0 4.5 2 4.5 4.5 0 .2 0 .4-.1.6C18 8.5 19 9.8 19 11.5c0 1.9-1.6 3.5-3.5 3.5H7z" fill="white" opacity="0.9"/>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#000000" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
      <path d="M12 5L21 19H3L12 5Z" fill="white"/>
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#BB4FFF" opacity="0.15"/>
      <path d="M5 5h14v7H5V5zM5 12h7l7 7H5V12z" fill="#BB4FFF"/>
    </svg>
  ),
};

function TechBadgeCard({ tech, index }: { tech: TechItem; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), index * 80);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const icon = TECH_ICONS[tech.name];

  return (
    <div
      ref={ref}
      className="tech-badge glass animate-badge-float"
      title={tech.name}
      style={{
        "--float-duration": tech.floatDuration,
        "--float-delay": tech.floatDelay,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "scale(1) translateY(0) rotate(0deg)"
          : "scale(0.6) translateY(10px) rotate(10deg)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)`,
      } as React.CSSProperties}
    >
      {/* Icon */}
      <div style={{ width: "36px", height: "36px", flexShrink: 0 }}>
        {icon || (
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              background: `rgba(${parseInt(tech.color.slice(1, 3), 16)}, ${parseInt(tech.color.slice(3, 5), 16)}, ${parseInt(tech.color.slice(5, 7), 16)}, 0.2)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: tech.color,
              fontSize: "11px",
              fontFamily: "var(--font-tech)",
              fontWeight: 700,
            }}
          >
            {tech.label.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-tech)",
          fontSize: "10px",
          fontWeight: 700,
          color: "var(--color-tertiary)",
          textAlign: "center",
          lineHeight: 1.2,
          letterSpacing: "0.02em",
        }}
      >
        {tech.label}
      </span>
    </div>
  );
}

const CATEGORIES: Array<{ key: "Frontend" | "Backend" | "Infrastructure"; label: string }> = [
  { key: "Frontend", label: "Frontend" },
  { key: "Backend", label: "Backend" },
  { key: "Infrastructure", label: "Infrastructure" },
];

export default function TechStack() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tech-stack" ref={sectionRef} style={{ background: "var(--color-tertiary)", position: "relative" }}>
      {/* Wave divider top */}
      <div style={{ marginTop: "-2px", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="#0F172A" />
        </svg>
      </div>

      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            className="text-center mb-12"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h2 className="section-heading" style={{ color: "var(--color-primary)" }}>
              Built With Modern,{" "}
              <span style={{ color: "var(--color-secondary)" }}>Scalable Tech</span>
            </h2>
            <p className="section-subheading" style={{ color: "var(--color-supporting)" }}>
              Fast. Secure. Future-Proof.
            </p>
          </div>

          {/* Badge groups by category */}
          {CATEGORIES.map((cat) => {
            const items = TECH_STACK.filter((t) => t.category === cat.key);
            const startIndex = TECH_STACK.filter(
              (t, i) => TECH_STACK.findIndex((x) => x.category === cat.key) > i
            ).length;

            return (
              <div key={cat.key} className="mb-8">
                <p
                  className="mb-4 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    fontFamily: "var(--font-tech)",
                    color: "rgba(45,62,80,0.5)",
                    opacity: sectionVisible ? 1 : 0,
                    transition: "opacity 0.6s ease 0.2s",
                  }}
                >
                  {cat.label}
                </p>
                {/* Glassmorphic container on light bg */}
                <div
                  className="glass-light rounded-2xl p-5"
                  style={{ borderRadius: "16px" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {items.map((tech, i) => (
                      <TechBadgeCard
                        key={tech.name}
                        tech={tech}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Supporting copy */}
          <p
            className="text-center mt-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              lineHeight: 1.7,
              color: "var(--color-supporting)",
              opacity: sectionVisible ? 1 : 0,
              transition: "opacity 0.7s ease 0.4s",
            }}
          >
            React and TypeScript for blazing-fast, interactive interfaces. Django and
            PostgreSQL power secure, scalable backends. Together, they create websites
            that perform on 4G Lagos networks and grow with your business.
          </p>

          {/* Callout box */}
          <div
            className="mt-8 p-6 rounded-2xl"
            style={{
              background: "rgba(255,107,53,0.05)",
              borderLeft: "3px solid var(--color-secondary)",
              borderRadius: "12px",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--color-primary)",
                marginBottom: "6px",
              }}
            >
              Modern Stack = Future-Proof Investment
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--color-supporting)", lineHeight: 1.6 }}>
              Built on proven, widely-supported, open-source technologies — no vendor lock-in,
              straightforward maintenance, and long-term stability as your business scales.
            </p>
          </div>
        </div>
      </div>

      {/* Wave divider bottom */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z" fill="#0F172A" />
        </svg>
      </div>
    </section>
  );
}
