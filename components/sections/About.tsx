"use client";

import { useEffect, useRef, useState } from "react";

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

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#F5F7FF",
        padding: "120px clamp(24px, 8vw, 80px)",
      }}
    >
      <div 
        className="mx-auto" 
        style={{ 
          maxWidth: "1200px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* TOP */}
        <div className="mb-16">
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#1B4FD8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "24px",
            }}
          >
            About Vellum & Vector
          </p>
          <h2
            style={{
              fontFamily: "sans-serif",
              fontSize: "52px",
              color: "#0A0A0A",
              lineHeight: 1.1,
              maxWidth: "800px",
            }}
          >
            We're the studio that treats your website like a product, not a poster.
          </h2>
        </div>

        {/* BODY */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column (60%) */}
          <div className="lg:w-[60%] flex flex-col gap-6">
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#374151",
                lineHeight: 1.75,
              }}
            >
              We are Vellum & Vector, a premium web design and engineering studio based in Lagos GRA. We build exclusively with robust modern stacks like React and Django to deliver high-performance digital experiences.
            </p>
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#374151",
                lineHeight: 1.75,
              }}
            >
              Our philosophy is simple: we believe the technology behind your site dictates its long-term success. That's exactly why we never use rigid page builders, bloated plugins, or generic pre-made templates.
            </p>
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#374151",
                lineHeight: 1.75,
              }}
            >
              When you partner with us, you aren't just getting a website—you get a dedicated engineering team that remains actively involved post-launch to ensure your product scales seamlessly with your business.
            </p>

            <a
              href="#contact"
              className="mt-4 hover:underline transition-all w-fit"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#1B4FD8",
                textDecoration: "none",
              }}
            >
              Work With Us →
            </a>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:w-[40%] flex flex-col gap-8 mt-8 lg:mt-0">
            {/* Row 1 */}
            <div style={{ borderTop: "1px solid #E5E9F0", paddingTop: "24px" }}>
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "11px",
                  color: "#1B4FD8",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                01
              </span>
              <h3
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  marginBottom: "4px",
                }}
              >
                No templates, ever.
              </h3>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  color: "#6B7280",
                }}
              >
                Every line of code and pixel is meticulously crafted for your exact brand requirements.
              </p>
            </div>

            {/* Row 2 */}
            <div style={{ borderTop: "1px solid #E5E9F0", paddingTop: "24px" }}>
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "11px",
                  color: "#1B4FD8",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                02
              </span>
              <h3
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  marginBottom: "4px",
                }}
              >
                You own everything from day one.
              </h3>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  color: "#6B7280",
                }}
              >
                We hand over the intellectual property, source code, and complete deployment access.
              </p>
            </div>

            {/* Row 3 */}
            <div style={{ borderTop: "1px solid #E5E9F0", paddingTop: "24px" }}>
              <span
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "11px",
                  color: "#1B4FD8",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                03
              </span>
              <h3
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  marginBottom: "4px",
                }}
              >
                We build for Nigerian network speeds.
              </h3>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  color: "#6B7280",
                }}
              >
                Highly optimized assets ensure your site loads instantly, even on 3G connections.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
