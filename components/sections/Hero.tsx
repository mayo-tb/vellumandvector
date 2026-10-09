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
      className="relative flex flex-col justify-center bg-white border-b border-[#E5E9F0] py-16 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column (54%): Core Value Proposition & Metrics */}
          <div 
            className="w-full lg:w-[54%] text-left"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
            }}
          >
            {/* Studio Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#DCE4FF] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#1B4FD8]" />
              <span className="text-[12px] font-semibold text-[#1B4FD8] tracking-wide">
                Lagos GRA · Premium Web Studio
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold tracking-[-0.035em] leading-[1.12] text-[#0A0A0A] mb-6">
              We build websites Lagos businesses are proud to send clients to.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-8 max-w-xl font-normal">
              Custom-engineered digital experiences built with React, Next.js, and Django. Fast turnaround, transparent milestone pricing, and dedicated engineering.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={() => handleCTAClick("#projects")}
                className="inline-flex items-center justify-center bg-[#1B4FD8] hover:bg-[#143FB3] text-white font-semibold text-[15px] px-7 py-3.5 rounded-lg transition-all shadow-[0_4px_14px_rgba(27,79,216,0.25)] hover:shadow-[0_6px_20px_rgba(27,79,216,0.35)] cursor-pointer border-none"
              >
                See Our Work →
              </button>
              <button
                onClick={() => handleCTAClick("#contact")}
                className="inline-flex items-center justify-center bg-white hover:bg-[#F8FAFC] text-[#0A0A0A] font-semibold text-[15px] px-6 py-3.5 rounded-lg border border-[#E5E9F0] hover:border-[#CBD5E1] transition-all cursor-pointer"
              >
                Start a Project Conversation
              </button>
            </div>

            {/* Value Metrics Grid: Perfectly Aligned */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E5E9F0] w-full max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">3+</p>
                <p className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">Live Projects</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">2–8</p>
                <p className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">Weeks Delivery</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1B4FD8] tracking-tight">₦</p>
                <p className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">Naira Pricing</p>
              </div>
            </div>
          </div>

          {/* Right Column (46%): Architectural Device Showcase */}
          <div 
            className="w-full lg:w-[46%] flex justify-center lg:justify-end"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <div className="relative w-full max-w-[540px]">
              
              {/* Browser Window Frame */}
              <div className="w-full bg-white rounded-xl border border-[#E5E9F0] shadow-[0_20px_50px_-15px_rgba(27,79,216,0.12),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                
                {/* Chrome Top Bar */}
                <div className="h-10 bg-[#F8FAFC] border-b border-[#E5E9F0] flex items-center px-4 gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
                  </div>
                  <div className="flex-1 bg-white border border-[#E5E9F0] rounded h-5 flex items-center px-2.5 gap-1.5 overflow-hidden">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span className="text-[10px] text-[#6B7280] font-mono truncate">
                      adunsville-residence.vercel.app
                    </span>
                  </div>
                </div>

                {/* Project Visual Showcase */}
                <div className="relative aspect-[16/11] bg-[#0F172A] w-full overflow-hidden">
                  <Image 
                    src="/hero_image.png" 
                    alt="Vellum & Vector Client Showcase" 
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    priority
                    className="object-cover"
                  />
                  {/* Subtle Corner Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs border border-[#E5E9F0] px-2.5 py-1 rounded text-[11px] font-medium text-[#0A0A0A] shadow-xs">
                    Live Production Preview
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
