"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCTAClick = (target: string) => {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white"
      style={{
        minHeight: "calc(100vh - 100px)",
        padding: "60px 0 40px",
      }}
    >
      {/* Content Container: Two Column Layout */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-8 items-center relative z-10" style={{ padding: "0 clamp(24px, 8vw, 80px)" }}>
        
        {/* Left Column (55%) */}
        <div 
          className="w-full lg:w-[55%] text-left"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-[40px]">
            <div className="w-[6px] h-[6px] rounded-full" style={{ background: "#1B4FD8" }} />
            <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "12px", fontWeight: 500, color: "#6B7280" }}>
              Lagos GRA · Premium Web Studio
            </span>
          </div>

          {/* Headline */}
          <h1
            className="mb-6 md:text-[72px] text-[56px] tracking-tight"
            style={{
              fontFamily: "sans-serif",
              lineHeight: 1.08,
              color: "#0A0A0A",
            }}
          >
            We build websites Lagos businesses are proud to send clients to.
          </h1>

          {/* Subtext */}
          <p
            className="mb-8"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              color: "#4B5563",
            }}
          >
            Custom-engineered. React + Django. Delivered in 2–8 weeks.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <button
              onClick={() => handleCTAClick("#projects")}
              className="transition-opacity hover:opacity-90 flex items-center justify-center"
              style={{
                background: "#1B4FD8",
                color: "white",
                fontFamily: "Roboto, sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                padding: "14px 28px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              See Our Work →
            </button>
            <button
              onClick={() => handleCTAClick("#contact")}
              className="hover:underline transition-all"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "13px",
                color: "#9CA3AF",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
              }}
            >
              or start a project conversation
            </button>
          </div>
        </div>

        {/* Right Column (45%) */}
        <div 
          className="w-full lg:w-[45%] flex justify-center lg:justify-end mt-10 lg:mt-0"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(40px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}
        >
          {/* Inner wrapper to keep circle and frame aligned */}
          <div className="relative w-full max-w-[540px]">
            {/* Background Shape */}
            <div
              className="absolute rounded-full"
              style={{
                width: "110%",
                aspectRatio: "1/1",
                background: "#EEF2FF",
                zIndex: -1,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Browser Frame */}
            <div
              className="relative w-full bg-white rounded-xl overflow-hidden flex flex-col"
              style={{
                boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
                aspectRatio: "16/11",
              }}
            >
            {/* Chrome Top Bar */}
            <div className="h-10 bg-[#F9FAFB] border-b border-[#E5E9F0] flex items-center px-4 gap-4">
              {/* 3 Dots */}
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E9F0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E9F0]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E9F0]" />
              </div>
              {/* URL Bar */}
              <div className="flex-1 bg-white border border-[#E5E9F0] rounded-md h-6 mx-4" />
            </div>

            {/* Project Preview Content */}
            <div className="relative flex-1 w-full h-full bg-[#0F172A]">
              <Image 
                src="/hero_image.png" 
                alt="Project Preview" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Slim Trust Bar */}
      <div 
        className="w-full max-w-7xl mx-auto mt-20 pt-6"
        style={{
          borderTop: "1px solid #E5E9F0",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s ease 0.6s",
        }}
      >
        <p
          className="text-center"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "12px",
            color: "#9CA3AF",
          }}
        >
          Trusted by businesses in Lagos · Victoria Island · Lekki · Abuja
        </p>
      </div>
    </section>
  );
}
