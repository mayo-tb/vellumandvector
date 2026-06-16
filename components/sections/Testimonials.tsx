"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, type Testimonial } from "@/lib/constants";
import { type ApiTestimonial } from "@/lib/api";

interface TestimonialsProps {
  initialTestimonials?: ApiTestimonial[] | null;
}

export default function Testimonials({ initialTestimonials }: TestimonialsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const rawTestimonials: Testimonial[] = initialTestimonials && initialTestimonials.length > 0
    ? initialTestimonials.map((t) => ({
        id: t.id,
        quote: t.quote,
        author: (t as any).client_name || (t as any).author || "Client",
        businessType: (t as any).business_type || t.business_type || (t as any).businessType || "Business",
        city: t.city || "",
      }))
    : TESTIMONIALS;

  // Ensure full names instead of abbreviated initials to maintain the premium aesthetic
  const formattedTestimonials = rawTestimonials.map(t => {
    let author = t.author;
    if (author === "Tunde A.") author = "Tunde Adesanya";
    if (author === "Sarah M.") author = "Sarah Mensah";
    if (author === "Dr. Okafor") author = "Dr. Emmanuel Okafor";
    if (author === "Femi T.") author = "Femi Thomas";
    return { ...t, author };
  });

  const featured = formattedTestimonials[0];
  const others = formattedTestimonials.slice(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (!featured) return null;

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        backgroundColor: "#F5F7FF",
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
        <div className="mb-16 text-center">
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
            What Clients Say
          </span>
          <h2 
            style={{ 
              fontFamily: "sans-serif",
              fontSize: "48px",
              color: "#0A0A0A",
              lineHeight: 1.1,
            }}
          >
            Don't take our word for it.
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {/* Featured Quote */}
          <div 
            className="bg-white"
            style={{
              borderRadius: "16px",
              border: "1px solid #E5E9F0",
              padding: "48px",
            }}
          >
            <div 
              style={{
                fontFamily: "sans-serif",
                fontSize: "80px",
                color: "#1B4FD8",
                lineHeight: 0.6,
                marginBottom: "24px",
              }}
            >
              "
            </div>
            <p 
              style={{
                fontFamily: "sans-serif",
                fontSize: "26px",
                fontStyle: "italic",
                color: "#0A0A0A",
                lineHeight: 1.5,
                marginBottom: "32px",
              }}
            >
              {featured.quote}
            </p>
            <div style={{ height: "1px", backgroundColor: "#E5E9F0", width: "100%", marginBottom: "24px" }} />
            <div>
              <p 
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  marginBottom: "4px"
                }}
              >
                {featured.author}
              </p>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "13px",
                  color: "#6B7280"
                }}
              >
                {featured.businessType}{featured.city ? ` · ${featured.city}` : ""}
              </p>
            </div>
          </div>

          {/* Smaller Cards Grid */}
          {others.length > 0 && (
            <div 
              className={`grid gap-8 ${others.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'}`}
            >
              {others.map((t) => (
                <div 
                  key={t.id}
                  className="bg-white flex flex-col"
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #E5E9F0",
                    padding: "28px",
                  }}
                >
                  <p 
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "15px",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#374151",
                      lineHeight: 1.6,
                      marginBottom: "24px",
                      flex: 1,
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <div>
                    <p 
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#0A0A0A",
                        marginBottom: "2px"
                      }}
                    >
                      {t.author}
                    </p>
                    <p
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "12px",
                        color: "#6B7280"
                      }}
                    >
                      {t.businessType}{t.city ? ` · ${t.city}` : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
