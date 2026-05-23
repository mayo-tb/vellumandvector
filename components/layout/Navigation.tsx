"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: isScrolled
            ? "rgba(15, 23, 42, 0.88)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "none",
        }}
      >
        <nav className="flex items-center justify-between px-5 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label={SITE.name}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-transform duration-200 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #FF6B35 0%, #ff8c5a 100%)",
                fontFamily: "var(--font-headline)",
                color: "#fff",
              }}
            >
              V
            </div>
            <span
              className="text-white font-semibold text-lg hidden sm:block"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Vellum<span style={{ color: "var(--color-secondary)" }}>&</span>Vector
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-sm font-medium transition-colors duration-200 group"
                  style={{
                    color: "rgba(245,243,240,0.75)",
                    fontFamily: "var(--font-body)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 0",
                  }}
                >
                  <span className="group-hover:text-white transition-colors duration-200">
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-250 origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ background: "var(--color-secondary)", width: "100%" }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="btn-primary hidden md:inline-flex"
            style={{ height: "40px", padding: "0 20px", fontSize: "14px" }}
          >
            Start Your Project
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            style={{ minWidth: "44px", minHeight: "44px", justifyContent: "center", alignItems: "center" }}
          >
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "var(--color-tertiary)",
                transform: isMenuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "var(--color-tertiary)",
                opacity: isMenuOpen ? 0 : 1,
                transform: isMenuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "var(--color-tertiary)",
                transform: isMenuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "all" : "none",
        }}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(15,23,42,0.60)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className="absolute top-0 right-0 h-full w-80 max-w-full flex flex-col"
          style={{
            background: "var(--color-primary)",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ fontFamily: "var(--font-headline)", color: "white", fontWeight: 700 }}>
              Menu
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg flex items-center justify-center"
              style={{ width: "44px", height: "44px", color: "rgba(245,243,240,0.6)", background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer", fontSize: "20px" }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex-1 flex flex-col px-6 py-8 gap-1">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-4 text-2xl font-bold border-b transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-headline)",
                  color: "rgba(245,243,240,0.80)",
                  borderColor: "rgba(255,255,255,0.06)",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  cursor: "pointer",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,243,240,0.80)")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="px-6 pb-8 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="btn-primary w-full text-center"
            >
              Start Your Project
            </a>
            <p
              className="text-center text-xs"
              style={{ fontFamily: "var(--font-tech)", color: "rgba(245,243,240,0.30)" }}
            >
              React · Django · TypeScript · PostgreSQL
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
