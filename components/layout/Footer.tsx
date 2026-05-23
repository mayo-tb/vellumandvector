"use client";

import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        background: "#080E1C",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "64px 20px 32px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            marginBottom: "48px",
          }}
          className="md:grid-cols-3"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #FF6B35 0%, #ff8c5a 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-headline)",
                  fontWeight: 800,
                  fontSize: "16px",
                  color: "#fff",
                }}
              >
                V
              </div>
              <span
                style={{
                  fontFamily: "var(--font-headline)",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#ffffff",
                }}
              >
                Vellum<span style={{ color: "var(--color-secondary)" }}>&</span>Vector
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "rgba(245,243,240,0.45)",
                lineHeight: 1.7,
                maxWidth: "260px",
                marginBottom: "20px",
              }}
            >
              Premium web design & development. Based in Lagos GRA.
              Built with React, TypeScript, Django, and PostgreSQL.
            </p>

            <p
              style={{
                fontFamily: "var(--font-tech)",
                fontSize: "11px",
                color: "rgba(245,243,240,0.25)",
                letterSpacing: "0.08em",
              }}
            >
              React · Django · TypeScript · PostgreSQL
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-tech)",
                fontSize: "11px",
                color: "rgba(245,243,240,0.40)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Navigate
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "rgba(245,243,240,0.55)",
                      padding: 0,
                      transition: "color 200ms ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-secondary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,240,0.55)")}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + CTA */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-tech)",
                fontSize: "11px",
                color: "rgba(245,243,240,0.40)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Get In Touch
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              <a
                href={`mailto:${SITE.email}`}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "rgba(245,243,240,0.55)",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,240,0.55)")}
              >
                {SITE.email}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "rgba(245,243,240,0.55)",
                  textDecoration: "none",
                  transition: "color 200ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#25d366")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,240,0.55)")}
              >
                💬 WhatsApp
              </a>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "rgba(245,243,240,0.35)",
                }}
              >
                📍 {SITE.location}
              </p>
            </div>

            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-primary"
              style={{ height: "44px", padding: "0 20px", fontSize: "14px" }}
            >
              Start Your Project
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "rgba(245,243,240,0.30)",
            }}
          >
            © {year} Vellum & Vector. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-tech)",
              fontSize: "11px",
              color: "rgba(245,243,240,0.20)",
              letterSpacing: "0.06em",
            }}
          >
            Made in Lagos 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
}
