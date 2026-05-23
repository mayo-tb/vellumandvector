"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/lib/constants";
import { submitContactForm } from "@/lib/api";

const BUDGET_OPTIONS = [
  "Under ₦200k",
  "₦200k – ₦500k",
  "₦500k – ₦1M",
  "₦1M+",
  "Let's discuss",
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    businessType: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const result = await submitContactForm({
        name: form.name,
        email: form.email,
        businessType: form.businessType,
        budget: form.budget,
        message: form.message,
      });
      if (result.status === "success") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "var(--color-tertiary)",
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: "13px",
    fontWeight: 600,
    color: "rgba(245,243,240,0.60)",
    marginBottom: "8px",
  };

  return (
    <section
      id="contact"
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
            Ready to Elevate{" "}
            <span style={{ color: "var(--color-secondary)" }}>Your Brand?</span>
          </h2>
          <p className="section-subheading">
            Tell us what you&rsquo;re building. We&rsquo;ll tell you exactly how we&rsquo;d build it.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.2s",
          }}
          className="lg:grid-cols-5"
        >
          {/* Form — 3 cols */}
          <div style={{ gridColumn: "span 3" }}>
            {status === "success" ? (
              <div
                className="glass"
                style={{
                  borderRadius: "24px",
                  padding: "48px",
                  textAlign: "center",
                  borderColor: "rgba(68,183,139,0.30)",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
                <h3
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "22px",
                    color: "#ffffff",
                    marginBottom: "12px",
                  }}
                >
                  Message received!
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(245,243,240,0.60)" }}>
                  We&rsquo;ll get back to you within 24 hours. You can also reach us on WhatsApp for faster response.
                </p>
              </div>
            ) : status === "error" ? (
              <div
                className="glass"
                style={{
                  borderRadius: "24px",
                  padding: "48px",
                  textAlign: "center",
                  borderColor: "rgba(239,68,68,0.30)",
                }}
              >
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
                <h3
                  style={{
                    fontFamily: "var(--font-headline)",
                    fontSize: "22px",
                    color: "#ffffff",
                    marginBottom: "12px",
                  }}
                >
                  Something went wrong
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "rgba(245,243,240,0.60)", marginBottom: "20px" }}>
                  We couldn&rsquo;t send your message. Please try again or reach us on WhatsApp.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-secondary"
                  style={{ margin: "0 auto" }}
                >
                  Try Again
                </button>
              </div>
            ) : (

              <form
                onSubmit={handleSubmit}
                className="glass"
                style={{ borderRadius: "24px", padding: "32px", display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label htmlFor="contact-name" style={labelStyle}>Full Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-secondary)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.12)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-secondary)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.12)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label htmlFor="contact-business" style={labelStyle}>Business Type</label>
                    <input
                      id="contact-business"
                      name="businessType"
                      type="text"
                      placeholder="e.g. Restaurant, Clinic"
                      value={form.businessType}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-secondary)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.12)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-budget" style={labelStyle}>Budget Range</label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-secondary)";
                        e.target.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.15)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.12)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="" style={{ background: "#0F172A" }}>Select a range</option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} style={{ background: "#0F172A" }}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" style={labelStyle}>Tell us about your project *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What are you building? What's your timeline? Any specific requirements?"
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--color-secondary)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(255,107,53,0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.12)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={status === "loading"}
                  style={{ width: "100%", opacity: status === "loading" ? 0.7 : 1 }}
                >
                  {status === "loading" ? (
                    <span className="animate-shimmer" style={{ display: "inline-block" }}>
                      Sending…
                    </span>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick contact — 2 cols */}
          <div style={{ gridColumn: "span 2", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* WhatsApp */}
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="glass"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                borderRadius: "16px",
                padding: "20px",
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow 250ms ease, border-color 250ms ease",
                borderColor: "rgba(37,211,102,0.20)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.15)";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.40)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "rgba(37,211,102,0.20)";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(37,211,102,0.12)",
                  border: "1px solid rgba(37,211,102,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#25D366">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.528 2.008 14.07 1 11.999 1 6.562 1 2.135 5.373 2.131 10.803c-.001 1.764.485 3.483 1.408 5.013l-.936 3.42 3.543-.918c1.517.825 3.197 1.258 4.851 1.258zm5.409-12.003c-.2-.445-.41-.454-.6-.462l-.51-.01c-.176 0-.46.065-.702.325-.24.26-.918.896-.918 2.186 0 1.29.938 2.533 1.07 2.71.13.178 1.841 2.8 4.46 3.93.624.27 1.11.43 1.489.55.627.2 1.198.17 1.65.1.503-.075 1.547-.63 1.765-1.24.217-.61.217-1.13.152-1.24-.065-.11-.24-.176-.51-.307-.27-.13-1.6-.79-1.847-.88-.247-.09-.427-.13-.6.13-.178.26-.69.88-.847 1.06-.157.18-.314.2-.584.07-.27-.13-1.139-.42-2.17-1.34-.8-.713-1.34-1.595-1.498-1.86-.157-.27-.017-.415.118-.55.122-.12.27-.318.406-.477.135-.16.18-.27.27-.45.09-.18.045-.338-.022-.47-.068-.13-.598-1.44-.82-1.98z" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>
                  WhatsApp
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(245,243,240,0.50)" }}>
                  Fastest response — usually same day
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SITE.email}`}
              className="glass"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                borderRadius: "16px",
                padding: "20px",
                textDecoration: "none",
                color: "inherit",
                transition: "box-shadow 250ms ease, border-color 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,107,53,0.12)";
                e.currentTarget.style.borderColor = "rgba(255,107,53,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(255,107,53,0.12)",
                  border: "1px solid rgba(255,107,53,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>
                  Email
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(245,243,240,0.50)" }}>
                  {SITE.email}
                </p>
              </div>
            </a>

            {/* Location */}
            <div
              className="glass"
              style={{
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(255,107,53,0.12)",
                  border: "1px solid rgba(255,107,53,0.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                  <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>
                  Location
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(245,243,240,0.50)" }}>
                  {SITE.location}
                </p>
              </div>
            </div>

            {/* Response time */}
            <div
              style={{
                borderRadius: "16px",
                padding: "20px",
                background: "rgba(255,107,53,0.06)",
                border: "1px solid rgba(255,107,53,0.15)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-tech)",
                  fontSize: "11px",
                  color: "var(--color-secondary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Response Time
              </p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "rgba(245,243,240,0.70)", lineHeight: 1.6 }}>
                We respond to all enquiries within{" "}
                <strong style={{ color: "#ffffff" }}>24 hours</strong> on business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
