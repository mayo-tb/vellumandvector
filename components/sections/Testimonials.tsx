"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, type Testimonial } from "@/lib/constants";
import { type ApiTestimonial } from "@/lib/api";

interface TestimonialsProps {
  initialTestimonials?: ApiTestimonial[] | null;
}

export default function Testimonials({ initialTestimonials }: TestimonialsProps) {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const testimonials: Testimonial[] = initialTestimonials && initialTestimonials.length > 0
    ? initialTestimonials.map((t) => ({
        id: t.id,
        quote: t.quote,
        author: (t as any).client_name || (t as any).author || "Anonymous",
        businessType: (t as any).business_type || t.business_type || (t as any).businessType || "Client",
        city: t.city || "",
      }))
    : TESTIMONIALS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto-advance on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-padding"
      style={{ background: "var(--color-primary)" }}
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
            What{" "}
            <span style={{ color: "var(--color-secondary)" }}>Clients Say</span>
          </h2>
          <p className="section-subheading">Don&rsquo;t take our word for it.</p>
        </div>

        {/* Testimonial Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="glass"
              style={{
                borderRadius: "20px",
                padding: "28px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s`,
                borderColor:
                  i === activeIndex
                    ? "rgba(255,107,53,0.35)"
                    : "rgba(255,255,255,0.10)",
                boxShadow:
                  i === activeIndex
                    ? "0 8px 40px rgba(255,107,53,0.15)"
                    : "var(--glass-shadow)",
              }}
            >
              {/* Quote mark */}
              <div
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "48px",
                  lineHeight: 1,
                  color: "var(--color-secondary)",
                  opacity: 0.4,
                  marginBottom: "12px",
                }}
              >
                "
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "rgba(245,243,240,0.80)",
                  marginBottom: "20px",
                  fontStyle: "italic",
                }}
              >
                {t.quote}
              </p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "16px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#ffffff",
                    marginBottom: "2px",
                  }}
                >
                  {t.author}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    color: "rgba(245,243,240,0.45)",
                  }}
                >
                  {t.businessType} · {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background:
                  i === activeIndex
                    ? "var(--color-secondary)"
                    : "rgba(245,243,240,0.20)",
                border: "none",
                cursor: "pointer",
                transition: "all 300ms ease",
                padding: 0,
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
