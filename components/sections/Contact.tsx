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

  const inputClasses = "w-full bg-white border border-[#D1D5DB] rounded-[8px] font-sans text-[14px] text-[#0A0A0A] outline-none transition-shadow placeholder:text-[#9CA3AF] focus:border-[#1B4FD8] focus:ring-1 focus:ring-[#1B4FD8]";

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        backgroundColor: "#F5F7FF",
        padding: "120px clamp(24px, 8vw, 80px)",
      }}
    >
      <div 
        className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-16"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* LEFT COLUMN */}
        <div className="w-full md:w-1/2 flex flex-col pt-4">
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#1B4FD8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              display: "block"
            }}
          >
            Get In Touch
          </span>
          <h2
            style={{
              fontFamily: "sans-serif",
              fontSize: "44px",
              color: "#0A0A0A",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Tell us what you're building.
          </h2>
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "15px",
              color: "#6B7280",
              lineHeight: 1.6,
            }}
          >
            We'll respond within 24 hours with a clear outline of how we'd approach your project.
          </p>

          <div className="mt-10 flex flex-col gap-6">
            {/* Email Row */}
            <div className="flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <div>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#6B7280", marginBottom: "2px" }}>Email</p>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", fontWeight: 500, color: "#0A0A0A" }}>oyekanboluwatife6@gmail.com</p>
              </div>
            </div>

            {/* WhatsApp Row */}
            <div className="flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#6B7280", marginBottom: "2px" }}>WhatsApp</p>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", fontWeight: 500, color: "#0A0A0A" }}>{SITE.whatsapp.replace("https://wa.me/", "+")}</p>
              </div>
            </div>

            {/* Location Row */}
            <div className="flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B4FD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", color: "#6B7280", marginBottom: "2px" }}>Location</p>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px", fontWeight: 500, color: "#0A0A0A" }}>Lagos GRA, Lagos</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Form) */}
        <div className="w-full md:w-1/2">
          {status === "success" ? (
             <div className="bg-white flex flex-col items-center justify-center h-full" style={{ borderRadius: "16px", border: "1px solid #E5E9F0", padding: "48px 36px", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px", color: "#1B4FD8" }}>✓</div>
                <h3 style={{ fontFamily: "sans-serif", fontSize: "28px", color: "#0A0A0A", marginBottom: "12px" }}>Message received.</h3>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", color: "#6B7280" }}>We'll respond within 24 hours.</p>
             </div>
          ) : status === "error" ? (
             <div className="bg-white flex flex-col items-center justify-center h-full" style={{ borderRadius: "16px", border: "1px solid #E5E9F0", padding: "48px 36px", textAlign: "center" }}>
                <div style={{ fontSize: "40px", marginBottom: "16px", color: "#EF4444" }}>⚠️</div>
                <h3 style={{ fontFamily: "sans-serif", fontSize: "28px", color: "#0A0A0A", marginBottom: "12px" }}>Something went wrong</h3>
                <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", color: "#6B7280", marginBottom: "24px" }}>We couldn't send your message.</p>
                <button onClick={() => setStatus("idle")} style={{ backgroundColor: "#1B4FD8", color: "#FFFFFF", padding: "12px 24px", borderRadius: "8px", fontFamily: "Roboto, sans-serif", fontSize: "15px", fontWeight: 500 }}>Try Again</button>
             </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="bg-white flex flex-col gap-4"
              style={{
                borderRadius: "16px",
                border: "1px solid #E5E9F0",
                padding: "36px",
              }}
            >
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={inputClasses}
                style={{ minHeight: "44px", padding: "0 14px" }}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
                style={{ minHeight: "44px", padding: "0 14px" }}
              />
              <div className="flex gap-4 flex-col md:flex-row">
                <input
                  name="businessType"
                  type="text"
                  placeholder="Business Type"
                  value={form.businessType}
                  onChange={handleChange}
                  className={inputClasses}
                  style={{ minHeight: "44px", padding: "0 14px" }}
                />
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClasses}
                  style={{ minHeight: "44px", padding: "0 14px", color: form.budget ? "#0A0A0A" : "#9CA3AF", cursor: "pointer" }}
                >
                  <option value="" disabled hidden>Budget Range</option>
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} style={{ color: "#0A0A0A" }}>{opt}</option>
                  ))}
                </select>
              </div>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Project Description"
                value={form.message}
                onChange={handleChange}
                className={inputClasses}
                style={{ padding: "14px", resize: "vertical", minHeight: "100px" }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  backgroundColor: "#1B4FD8",
                  color: "#FFFFFF",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "14px 28px",
                  borderRadius: "8px",
                  width: "100%",
                  marginTop: "8px",
                  opacity: status === "loading" ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.2s ease"
                }}
              >
                {status === "loading" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
