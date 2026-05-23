"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "@/lib/constants";
import { type ApiProject } from "@/lib/api";

const PILL_COLORS: Record<string, string> = {
  "Next.js 14": "#ffffff",
  "Next.js": "#ffffff",
  "TypeScript": "#3178C6",
  "React": "#61DAFB",
  "Tailwind CSS": "#06B6D4",
  "Django REST Framework": "#44B78B",
  "PostgreSQL": "#336791",
  "Cloudinary": "#3448C5",
  "Framer Motion": "#BB4FFF",
  "JWT Auth": "#f59e0b",
  "Render": "#46E3B7",
  "Python": "#FFD43B",
  "Genetic Algorithms": "#FF6B35",
  "default": "#64748b",
};

function TechPill({ name }: { name: string }) {
  const color = PILL_COLORS[name] ?? PILL_COLORS.default;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        borderRadius: "100px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        fontFamily: "var(--font-tech)",
        fontSize: "10px",
        color: "rgba(245,243,240,0.85)",
        whiteSpace: "nowrap",
        transition: "all 200ms ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.background = "rgba(255,255,255,0.12)";
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
          boxShadow: `0 0 6px ${color}`,
        }}
      />
      {name}
    </span>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const MAX_PILLS = 5;
  const visibleTech = project.techStack.slice(0, MAX_PILLS);
  const extraCount = project.techStack.length - MAX_PILLS;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setVisible(true), index * 120);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  // Curated aesthetic mesh backdrops for the project placeholders
  const meshGradients = [
    // Project 0 (Adunsville): Warm gold/coral
    "radial-gradient(at 0% 0%, #D4AF37 0px, transparent 50%), radial-gradient(at 100% 100%, #1e1e1e 0px, transparent 60%), radial-gradient(at 100% 0%, #FF6B35 0px, transparent 50%), #131B2E",
    // Project 1 (AncestryVault): Slate/electric blue/indigo
    "radial-gradient(at 0% 0%, #4F46E5 0px, transparent 50%), radial-gradient(at 100% 100%, #111827 0px, transparent 60%), radial-gradient(at 100% 0%, #06B6D4 0px, transparent 50%), #0F172A",
    // Project 2 (Nexus): Teal/emerald/gold
    "radial-gradient(at 0% 0%, #0D9488 0px, transparent 50%), radial-gradient(at 100% 100%, #1a1f2c 0px, transparent 60%), radial-gradient(at 100% 0%, #44B78B 0px, transparent 50%), #131B2E",
  ];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="glass glass-hover-spotlight"
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(32px)",
        transition: visible
          ? "transform 400ms cubic-bezier(0.16,1,0.3,1), border-color 300ms ease, box-shadow 400ms ease, opacity 200ms ease"
          : `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s`,
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.40), 0 0 20px rgba(255,107,53,0.1)"
          : "0 8px 32px rgba(0,0,0,0.15)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image area */}
      <div style={{ position: "relative", height: "240px", overflow: "hidden", flexShrink: 0 }}>
        {/* Placeholder gradient image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: meshGradients[index % meshGradients.length],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "56px",
            transition: "transform 800ms cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        >
          <span 
            style={{ 
              filter: hovered ? "drop-shadow(0 0 20px rgba(255,255,255,0.5))" : "none",
              transition: "filter 300ms ease"
            }}
          >
            {index === 0 ? "🏠" : index === 1 ? "🌳" : "📅"}
          </span>
        </div>

        {/* Dark overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(15,23,42,0.05), rgba(15,23,42,0.85))",
            opacity: hovered ? 1 : 0.6,
            transition: "opacity 300ms ease",
          }}
        />

        {/* Industry tag */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              padding: "5px 14px",
              borderRadius: "100px",
              background: "rgba(255,107,53,0.18)",
              border: "1px solid rgba(255,107,53,0.35)",
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 700,
              color: "var(--color-secondary)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.08em",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {project.industry}
          </span>
        </div>

        {/* Hook text */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            right: "20px",
            opacity: hovered ? 1 : 0.8,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition: "all 300ms ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-headline)",
              fontSize: "14px",
              fontWeight: 600,
              fontStyle: "italic",
              color: "#ffffff",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            "{project.hook}"
          </p>
        </div>
      </div>

      {/* Card content */}
      <div style={{ padding: "28px 24px", flex: 1, display: "flex", flexDirection: "column", gap: "12px", zIndex: 1 }}>
        <h3
          style={{
            fontFamily: "var(--font-headline)",
            fontSize: "22px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.25,
            transition: "color 200ms ease",
          }}
          onMouseEnter={(e) => {
            if (hovered) e.currentTarget.style.color = "var(--color-secondary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "var(--color-secondary)",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {project.metric}
        </p>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: 1.6,
            color: "rgba(245,243,240,0.60)",
            marginBottom: "8px",
          }}
        >
          {project.description}
        </p>

        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
          {visibleTech.map((tech) => (
            <TechPill key={tech} name={tech} />
          ))}
          {extraCount > 0 && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: "100px",
                background: "rgba(255,107,53,0.12)",
                border: "1px solid rgba(255,107,53,0.25)",
                fontFamily: "var(--font-tech)",
                fontSize: "10px",
                color: "var(--color-secondary)",
                fontWeight: 600,
              }}
            >
              +{extraCount} more
            </span>
          )}
        </div>

        {/* Live link */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
            paddingTop: "16px",
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 700,
            color: hovered ? "#ffffff" : "var(--color-accent)",
            textDecoration: "none",
            transition: "all 200ms ease",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>View Live Project</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: hovered ? "translate(3px,-3px)" : "none",
              transition: "transform 250ms ease",
              color: "var(--color-secondary)",
            }}
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" strokeLinecap="round"/>
            <path d="M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
        imageUrl: p.image_url || "/images/placeholder.jpg",
        isFeatured: p.is_featured,
      }))
    : PROJECTS.filter((p) => p.isFeatured);

  return (
    <section
      id="projects"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{
        background: "#0F172A",
      }}
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none z-0" />

      {/* Background blobs */}
      <div
        className="animate-blob-drift"
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          top: "-200px",
          right: "-200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          "--blob-duration": "20s",
          "--blob-delay": "2s",
        } as React.CSSProperties}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span
              style={{
                fontFamily: "var(--font-tech)",
                fontSize: "12px",
                color: "var(--color-secondary)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              — Portfolio
            </span>
          </div>

          <h2 className="section-heading" style={{ color: "#ffffff" }}>
            Featured <span className="text-shimmer">Work</span>
          </h2>
          <p className="section-subheading" style={{ color: "rgba(245,243,240,0.60)" }}>
            Real projects. Real industries. Real results.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <div
          className="mt-16 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <a href="#contact" className="btn-secondary" style={{ borderColor: "rgba(255,107,53,0.50)", backdropFilter: "blur(4px)" }}>
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
