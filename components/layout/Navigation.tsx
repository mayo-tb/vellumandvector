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
      {/* Announcement Bar */}
      <div 
        style={{
          background: "#F0F4FF",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "relative",
          zIndex: 51,
        }}
      >
        <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", color: "#1B4FD8", fontWeight: 500 }}>
          Lagos GRA · Premium Web Studio · Currently accepting projects
        </span>
      </div>

      <header
        className="sticky top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? "rgba(255, 255, 255, 0.90)" : "#ffffff",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          boxShadow: isScrolled ? "0 1px 0 #E5E9F0" : "none",
        }}
      >
        <nav className="flex items-center justify-between py-4 max-w-7xl mx-auto" style={{ paddingLeft: "clamp(24px, 8vw, 80px)", paddingRight: "clamp(24px, 8vw, 80px)" }}>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label={SITE.name}
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-[#0A0A0A]"
              style={{ fontFamily: "Roboto, sans-serif", fontWeight: 600, fontSize: "18px" }}
            >
              Vellum&Vector
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative group flex flex-col items-center justify-center"
                  style={{
                    color: "#0A0A0A",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 450,
                    fontSize: "14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 0",
                  }}
                >
                  <span className="transition-colors duration-150">
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-1 h-[2px] transition-transform duration-150 origin-center scale-x-0 group-hover:scale-x-100"
                    style={{ background: "#1B4FD8", width: "100%" }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="hidden md:inline-flex items-center justify-center transition-opacity hover:opacity-90"
            style={{ 
              background: "#1B4FD8", 
              color: "white", 
              padding: "10px 22px", 
              borderRadius: "6px", 
              fontFamily: "Roboto, sans-serif", 
              fontWeight: 500, 
              fontSize: "14px",
              textDecoration: "none"
            }}
          >
            Start a Project
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            style={{ minWidth: "44px", minHeight: "44px", justifyContent: "center", alignItems: "center", background: "none", border: "none" }}
          >
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "#0A0A0A",
                transform: isMenuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "#0A0A0A",
                opacity: isMenuOpen ? 0 : 1,
                transform: isMenuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: "#0A0A0A",
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
          style={{ background: "rgba(10,10,10,0.60)", backdropFilter: "blur(4px)" }}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className="absolute top-0 right-0 h-full w-80 max-w-full flex flex-col"
          style={{
            background: "white",
            borderLeft: "1px solid #E5E9F0",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #E5E9F0" }}>
            <span style={{ fontFamily: "Roboto, sans-serif", color: "#0A0A0A", fontWeight: 600 }}>
              Menu
            </span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg flex items-center justify-center"
              style={{ width: "44px", height: "44px", color: "#0A0A0A", background: "#F0F4FF", border: "none", cursor: "pointer", fontSize: "20px" }}
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
                className="text-left py-4 text-2xl border-b transition-colors duration-200"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  color: "#0A0A0A",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #E5E9F0",
                  cursor: "pointer",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1B4FD8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0A0A0A")}
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
              className="flex items-center justify-center transition-opacity hover:opacity-90 w-full"
              style={{ 
                background: "#1B4FD8", 
                color: "white", 
                padding: "14px 22px", 
                borderRadius: "6px", 
                fontFamily: "Roboto, sans-serif", 
                fontWeight: 500, 
                fontSize: "15px",
                textDecoration: "none"
              }}
            >
              Start a Project
            </a>
            <p
              className="text-center text-xs mt-2"
              style={{ fontFamily: "Roboto, sans-serif", color: "rgba(10,10,10,0.50)" }}
            >
              Lagos GRA · Premium Web Studio
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
