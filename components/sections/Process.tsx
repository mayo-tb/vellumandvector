"use client";

import { useEffect, useRef, useState } from "react";

const NEW_PROCESS_STEPS = [
  {
    id: "01",
    title: "Discovery",
    timeline: "Timeline: Day 1–3",
    desc: "We start by diving deep into your business objectives, target audience, and competitive landscape. We don't write a single line of code until we fully understand what success looks like for your specific product.",
    bullets: [
      "Initial stakeholder interviews",
      "Competitive and market research",
      "Project roadmap & timeline definition"
    ]
  },
  {
    id: "02",
    title: "Design",
    timeline: "Timeline: Week 1–2",
    desc: "Our design team creates high-fidelity wireframes and interactive prototypes. We establish your unique brand aesthetic, ensuring the interface is not just beautiful, but optimized for user conversion.",
    bullets: [
      "Wireframing and user flow mapping",
      "High-fidelity UI/UX design in Figma",
      "Interactive prototyping & user feedback"
    ]
  },
  {
    id: "03",
    title: "Development",
    timeline: "Timeline: Week 2–6",
    desc: "This is where the magic happens. Our engineers build your product using robust, modern stacks like React and Django. Every component is custom-coded for performance, scalability, and security.",
    bullets: [
      "Frontend React/Next.js architecture",
      "Backend Django API & database modeling",
      "Performance optimization & security hardening"
    ]
  },
  {
    id: "04",
    title: "Launch",
    timeline: "Timeline: Week 6–8",
    desc: "We conduct rigorous QA testing across all devices and network speeds. Once approved, we handle the entire deployment process, configuring your domains, SSL certificates, and hosting infrastructure.",
    bullets: [
      "Cross-browser and device QA testing",
      "SEO audits and final asset optimization",
      "Production deployment and domain setup"
    ]
  },
  {
    id: "05",
    title: "Support",
    timeline: "Timeline: Ongoing",
    desc: "Launch day is just the beginning. We remain deeply involved post-launch to monitor performance, squash any lingering bugs, and develop new features as your business scales.",
    bullets: [
      "24/7 uptime monitoring and maintenance",
      "Dedicated retainer for feature development",
      "Analytics review and conversion tracking"
    ]
  }
];

export default function Process() {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      className="bg-white"
      style={{ padding: "120px clamp(24px, 8vw, 80px)" }}
    >
      <div 
        className="max-w-4xl mx-auto w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div className="mb-20 text-left">
          <h2 
            style={{ 
              fontFamily: "sans-serif", 
              fontSize: "48px", 
              color: "#0A0A0A",
              lineHeight: 1.1,
              marginBottom: "16px"
            }}
          >
            From brief to live site.
          </h2>
          <p 
            style={{ 
              fontFamily: "Roboto, sans-serif", 
              fontSize: "16px", 
              color: "#6B7280" 
            }}
          >
            A clear process so you always know where your project stands.
          </p>
        </div>

        {/* Mobile Accordion */}
        <div className="flex flex-col md:hidden w-full border-t border-[#E5E9F0]">
          {NEW_PROCESS_STEPS.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <div key={step.id} className="border-b border-[#E5E9F0]">
                <button 
                  onClick={() => setActiveStep(i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-sans text-[12px] font-bold ${isActive ? 'text-[#1B4FD8]' : 'text-[#6B7280]'}`}>{step.id}</span>
                    <span style={{ fontFamily: "sans-serif", fontSize: "28px", color: "#0A0A0A" }}>{step.title}</span>
                  </div>
                  <span className={`text-[24px] ${isActive ? 'text-[#1B4FD8]' : 'text-[#9CA3AF]'}`}>{isActive ? '−' : '+'}</span>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isActive ? "600px" : "0px", opacity: isActive ? 1 : 0 }}
                >
                  <div className="pb-8">
                    <p className="font-sans text-[13px] font-medium text-[#1B4FD8] mb-4 tracking-wide uppercase">{step.timeline}</p>
                    <p className="font-sans text-[15px] text-[#374151] mb-6 leading-relaxed">{step.desc}</p>
                    <ul className="flex flex-col gap-3">
                      {step.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[14px] text-[#4B5563]">
                          <span className="text-[#1B4FD8] mt-0.5">•</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Stepper */}
        <div className="hidden md:flex flex-col w-full">
          {/* Horizontal stepper line */}
          <div className="relative flex items-center justify-between w-full mb-16">
            {/* Background line */}
            <div className="absolute left-0 right-0 h-[1px] bg-[#E5E9F0] top-1/2 -translate-y-1/2 z-0" />
            {/* Active connecting line */}
            <div 
              className="absolute left-0 h-[1px] bg-[#1B4FD8] top-1/2 -translate-y-1/2 z-0 transition-all duration-500 ease-out"
              style={{ width: `${(activeStep / (NEW_PROCESS_STEPS.length - 1)) * 100}%` }}
            />
            
            {/* Nodes */}
            {NEW_PROCESS_STEPS.map((step, i) => {
              const isPast = i <= activeStep;
              const isActive = i === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className="relative z-10 flex flex-col items-center gap-4 bg-white px-4 cursor-pointer group"
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-[12px] font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#1B4FD8] text-white border-2 border-[#1B4FD8]' 
                        : isPast
                          ? 'bg-white text-[#1B4FD8] border-2 border-[#1B4FD8]'
                          : 'bg-white text-[#9CA3AF] border-2 border-[#E5E9F0] group-hover:border-[#9CA3AF]'
                    }`}
                  >
                    {step.id}
                  </div>
                  <span 
                    className={`font-sans text-[14px] font-medium transition-colors duration-300 ${
                      isActive ? 'text-[#0A0A0A]' : 'text-[#6B7280]'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Content Panel */}
          <div key={activeStep} className="flex w-full gap-16 min-h-[280px]">
            {/* LEFT Column */}
            <div className="w-[55%] flex flex-col">
               <h3 style={{ fontFamily: "sans-serif", fontSize: "32px", color: "#0A0A0A", marginBottom: "20px" }}>
                 {NEW_PROCESS_STEPS[activeStep].title}
               </h3>
               <p style={{ fontFamily: "Roboto, sans-serif", fontSize: "16px", color: "#374151", lineHeight: 1.75 }}>
                 {NEW_PROCESS_STEPS[activeStep].desc}
               </p>
            </div>
            
            {/* RIGHT Column */}
            <div className="w-[45%] flex flex-col border-l border-[#E5E9F0] pl-12">
               <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1B4FD8", marginBottom: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                 {NEW_PROCESS_STEPS[activeStep].timeline}
               </span>
               <ul className="flex flex-col gap-5">
                 {NEW_PROCESS_STEPS[activeStep].bullets.map((b, idx) => (
                   <li key={idx} className="flex items-start gap-3">
                     <span className="text-[#1B4FD8] text-[18px] leading-none mt-0.5">•</span>
                     <span style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", color: "#4B5563" }}>{b}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
