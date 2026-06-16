"use client";

import { useEffect, useRef, useState } from "react";

const NEW_SERVICES = [
  { id: "01", title: "Custom Website Design", desc: "Figma to React — interfaces built for your specific audience, not a template buyer." },
  { id: "02", title: "Full-Stack Development", desc: "Robust architectures engineered with React, Django, and PostgreSQL." },
  { id: "03", title: "E-Commerce Solutions", desc: "High-conversion storefronts built to handle complex transactions seamlessly." },
  { id: "04", title: "SEO & Performance", desc: "Technical optimization that ranks higher on Google and loads instantly on 3G." },
  { id: "05", title: "API & Backend Systems", desc: "Secure, scalable infrastructure that powers your entire business logic." },
  { id: "06", title: "Post-Launch Support", desc: "Ongoing maintenance and dedicated feature development to keep you growing." }
];

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

  return (
    <section
      id="services"
      ref={ref}
      className="bg-white overflow-hidden"
      style={{
        padding: "120px clamp(24px, 8vw, 80px)",
      }}
    >
      <div 
        className="max-w-6xl mx-auto w-full relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div className="mb-20">
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#1B4FD8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "24px",
            }}
          >
            What We Build
          </span>
          <h2 
            style={{ 
              fontFamily: "sans-serif",
              fontSize: "48px",
              color: "#0A0A0A",
              lineHeight: 1.1,
            }}
          >
            Every service. One team. No handoffs.
          </h2>
        </div>

        {/* List Layout */}
        <div 
          className="flex flex-col"
          style={{ borderTop: "1px solid #E5E9F0" }}
        >
          {NEW_SERVICES.map((service, i) => (
            <div
              key={service.id}
              className="group flex flex-col md:flex-row md:items-center py-8 px-4 md:px-8 transition-colors duration-150 ease-in-out cursor-default"
              style={{
                borderBottom: "1px solid #E5E9F0",
                borderLeft: "2px solid transparent",
                transition: "background-color 0.15s ease, border-left-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F5F7FF";
                e.currentTarget.style.borderLeftColor = "#1B4FD8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderLeftColor = "transparent";
              }}
            >
              {/* LEFT: Numeral */}
              <div className="w-16 md:w-24 mb-4 md:mb-0 flex-shrink-0">
                <span
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "32px",
                    color: "#E5E9F0",
                    lineHeight: 1,
                  }}
                >
                  {service.id}
                </span>
              </div>

              {/* MIDDLE-LEFT: Title */}
              <div className="w-full md:w-1/3 md:pr-6 mb-2 md:mb-0 flex-shrink-0">
                <span
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "17px",
                    fontWeight: 500,
                    color: "#0A0A0A",
                  }}
                >
                  {service.title}
                </span>
              </div>

              {/* MIDDLE: Description */}
              <div className="flex-1 md:pr-6 mb-4 md:mb-0">
                <span
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: 1.6,
                  }}
                >
                  {service.desc}
                </span>
              </div>

              {/* RIGHT: Arrow */}
              <div className="w-8 flex justify-start md:justify-end">
                <span
                  className="transition-transform duration-150 ease-in-out group-hover:translate-x-1"
                  style={{
                    color: "#1B4FD8",
                    fontSize: "18px",
                  }}
                >
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
