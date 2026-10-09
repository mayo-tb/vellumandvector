"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
      {/* Top Announcement Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E5E9F0] h-9 flex items-center justify-center px-4">
        <p className="text-[12px] font-medium text-[#4B5563] tracking-wide flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1B4FD8]" />
          <span>Lagos GRA</span>
          <span className="text-[#9CA3AF]">·</span>
          <span>Web Design & Engineering Studio</span>
          <span className="text-[#9CA3AF]">·</span>
          <span className="text-[#1B4FD8] font-semibold">Available for New Projects</span>
        </p>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[#E5E9F0] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
            : "bg-white border-b border-[#F1F5F9]"
        }`}
      >
        <nav className="flex items-center justify-between h-[72px] max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Logo Lockup */}
          <Link
            href="/"
            className="flex items-center gap-3 group text-decoration-none"
            aria-label={SITE.name}
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-[#E5E9F0] bg-white shadow-xs">
              <Image
                src="/icon.png"
                alt="Vellum & Vector Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[#0A0A0A] font-bold text-[18px] tracking-tight">
              Vellum <span className="text-[#1B4FD8]">&</span> Vector
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative group text-[14px] font-medium text-[#4B5563] hover:text-[#0A0A0A] transition-colors py-1 cursor-pointer bg-transparent border-none"
                >
                  <span>{link.label}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#1B4FD8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="hidden md:inline-flex items-center justify-center bg-[#1B4FD8] hover:bg-[#143FB3] text-white text-[14px] font-semibold px-5 py-2.5 rounded-lg transition-all shadow-[0_2px_8px_rgba(27,79,216,0.20)] hover:shadow-[0_4px_12px_rgba(27,79,216,0.30)] text-decoration-none cursor-pointer"
          >
            Start a Project
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors cursor-pointer bg-transparent border-none min-w-[44px] min-h-[44px] justify-center items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[#0A0A0A] rounded-full transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#0A0A0A] rounded-full transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-1"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[#0A0A0A] rounded-full transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-full bg-white border-l border-[#E5E9F0] flex flex-col transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E9F0]">
            <span className="font-bold text-[#0A0A0A] text-base">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-9 h-9 rounded-lg bg-[#F1F5F9] text-[#0A0A0A] flex items-center justify-center border-none cursor-pointer text-base"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col px-6 py-6 gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 text-lg font-medium text-[#0A0A0A] hover:text-[#1B4FD8] border-b border-[#F1F5F9] bg-transparent cursor-pointer transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Footer CTA */}
          <div className="p-6 border-t border-[#E5E9F0] flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="flex items-center justify-center bg-[#1B4FD8] hover:bg-[#143FB3] text-white font-semibold py-3 rounded-lg text-[14px] transition-colors text-decoration-none"
            >
              Start a Project
            </a>
            <p className="text-center text-xs text-[#6B7280]">
              Lagos GRA · Premium Web Studio
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
