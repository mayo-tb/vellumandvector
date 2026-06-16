"use client";

import { SITE } from "@/lib/constants";

const NAVIGATE_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const SERVICES_LINKS = [
  { label: "Custom Design", href: "#services" },
  { label: "Full-Stack Dev", href: "#services" },
  { label: "E-Commerce", href: "#services" },
  { label: "SEO & Performance", href: "#services" },
  { label: "API Systems", href: "#services" },
  { label: "Post-Launch", href: "#services" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#0A0A0A",
        padding: "80px 20px 40px",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        
        {/* TOP SECTION */}
        <div className="flex flex-col items-center text-center" style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontFamily: "sans-serif",
              fontSize: "40px",
              color: "#FFFFFF",
              marginBottom: "24px",
              lineHeight: 1.1,
            }}
          >
            Ready to build something Lagos will remember?
          </h2>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="flex items-center justify-center transition-all duration-200 hover:bg-white hover:text-[#0A0A0A]"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#FFFFFF",
              border: "1px solid #FFFFFF",
              borderRadius: "8px",
              padding: "12px 28px",
            }}
          >
            Start a Project →
          </a>
        </div>

        {/* 4-COLUMN GRID */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          style={{ marginBottom: "60px" }}
        >
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <span 
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#FFFFFF",
                marginBottom: "16px",
              }}
            >
              Vellum&Vector
            </span>
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "13px",
                color: "#6B7280",
                lineHeight: 1.7,
                marginBottom: "24px",
                maxWidth: "240px",
              }}
            >
              Premium web design & engineering studio. Based in Lagos GRA.
            </p>
            <div className="flex gap-4">
              {/* Twitter/X */}
              <a href="#" className="text-[#6B7280] hover:text-[#FFFFFF] transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-[#6B7280] hover:text-[#FFFFFF] transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              {/* Behance */}
              <a href="#" className="text-[#6B7280] hover:text-[#FFFFFF] transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 7h4c1.93 0 3.5 1.57 3.5 3.5S12.43 14 10.5 14h-4V7z"></path>
                  <path d="M6.5 14h4.5c1.93 0 3.5 1.57 3.5 3.5S12.93 21 11 21h-4.5v-7z"></path>
                  <path d="M15 10h4"></path>
                  <path d="M15.5 14h5a3.5 3.5 0 0 0-7 0v1a3.5 3.5 0 0 0 7 0"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigate */}
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}
            >
              Navigate
            </span>
            <ul className="flex flex-col gap-[8px]">
              {NAVIGATE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors duration-150"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}
            >
              Services
            </span>
            <ul className="flex flex-col gap-[8px]">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors duration-150"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <span
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                color: "#6B7280",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}
            >
              Get In Touch
            </span>
            <div className="flex flex-col gap-[8px]">
              <a
                href={`mailto:${SITE.email}`}
                className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors duration-150"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                }}
              >
                {SITE.email}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors duration-150"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "14px",
                }}
              >
                WhatsApp
              </a>
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "13px",
                  color: "#6B7280",
                  marginTop: "8px"
                }}
              >
                Lagos GRA, Lagos, Nigeria
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
          style={{ borderTop: "1px solid #1F1F1F" }}
        >
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              color: "#6B7280",
            }}
          >
            © {year} Vellum & Vector. All rights reserved.
          </span>
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              color: "#6B7280",
            }}
          >
            Made in Lagos, Nigeria 🇳🇬
          </span>
        </div>

      </div>
    </footer>
  );
}
