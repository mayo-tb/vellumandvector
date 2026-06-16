"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/constants";
import { type ApiProject } from "@/lib/api";

function BrowserFrame({ project, height, isHovered }: { project: Project, height: string, isHovered: boolean }) {
  return (
    <div 
      className="w-full relative overflow-hidden bg-[#E5E9F0]"
      style={{ height }}
    >
      {/* Chrome Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-[#F9FAFB] border-b border-[#E5E9F0] flex items-center px-4 gap-4 z-20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E9F0]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E9F0]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E9F0]" />
        </div>
        <div className="flex-1 bg-white border border-[#E5E9F0] rounded-md h-6 mx-4" />
      </div>

      {/* Website Typographic Details */}
      <div 
        className="absolute top-10 left-0 right-0 bottom-0 bg-[#F9FAFB] transition-transform duration-500 ease-out flex flex-col items-center justify-center p-8 text-center z-10"
        style={{
          transform: isHovered ? "scale(1.02)" : "scale(1)",
        }}
      >
        <span 
          style={{ 
            fontFamily: "sans-serif", 
            fontSize: "40px", 
            color: "#0A0A0A",
            marginBottom: "16px",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </span>
        <span
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "18px",
            color: "#374151",
            maxWidth: "80%",
            lineHeight: 1.5,
          }}
        >
          {project.hook}
        </span>
      </div>

      {/* Hover Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none transition-opacity duration-200"
        style={{
          background: "rgba(10,10,10,0.60)",
          opacity: isHovered ? 1 : 0,
        }}
      >
        <span 
          style={{ 
            fontFamily: "Roboto, sans-serif", 
            fontSize: "18px", 
            fontWeight: 500,
            color: "white",
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          View Case Study →
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, isHero }: { project: Project; isHero: boolean }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col group cursor-pointer"
      style={{
        background: "white",
        border: "1px solid #E5E9F0",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <BrowserFrame 
        project={project} 
        height={isHero ? "520px" : "320px"} 
        isHovered={hovered} 
      />
      
      <div className="flex flex-col" style={{ padding: isHero ? "32px" : "24px" }}>
        <div className="flex items-center gap-3 mb-3">
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              color: "#1B4FD8",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontWeight: 500,
            }}
          >
            {project.industry}
          </span>
        </div>
        
        <h3
          style={{
            fontFamily: "sans-serif",
            fontSize: isHero ? "28px" : "24px",
            color: "#0A0A0A",
            marginBottom: "12px",
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h3>
        
        <p
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "15px",
            color: "#374151",
            lineHeight: 1.6,
            marginBottom: isHero ? "24px" : "20px",
          }}
        >
          {project.metric}
        </p>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center transition-colors hover:opacity-80"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            color: "#1B4FD8",
            marginTop: "auto",
            textDecoration: "none",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          View Case Study →
        </a>
      </div>
    </div>
  );
}

interface FeaturedProjectsProps {
  initialProjects?: ApiProject[] | null;
}

export default function FeaturedProjects({ initialProjects }: FeaturedProjectsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const featured: Project[] = initialProjects && initialProjects.length > 0
    ? initialProjects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        industry: p.industry,
        description: p.description,
        metric: (p as any).metric || p.description.split(".")[0] || p.industry,
        hook: (p as any).hook || p.title,
        techStack: p.tech_stack || [],
        liveUrl: p.live_url || "#",
        imageUrl: p.image_url || "",
        isFeatured: p.is_featured,
      }))
    : PROJECTS.filter((p) => p.isFeatured);

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        backgroundColor: "#F5F7FF",
        padding: "120px clamp(24px, 8vw, 80px)",
      }}
    >
      <div 
        className="max-w-6xl mx-auto w-full relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Header */}
        <div className="mb-16">
          <span
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#1B4FD8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "block",
              marginBottom: "24px",
            }}
          >
            Featured Work
          </span>
          <h2 
            style={{ 
              fontFamily: "sans-serif",
              fontSize: "48px",
              color: "#0A0A0A",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Projects built to perform.
          </h2>
          <p
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              color: "#6B7280",
            }}
          >
            Real clients. Real industries. Real results.
          </p>
        </div>

        {/* 2-column asymmetric grid */}
        {featured.length > 0 && (
          <div className="flex flex-col gap-8">
            {/* HERO CARD (Full Width) */}
            <ProjectCard project={featured[0]} isHero={true} />

            {/* SMALLER CARDS (Grid) */}
            {featured.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featured.slice(1, 3).map((project) => (
                  <ProjectCard key={project.id} project={project} isHero={false} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
