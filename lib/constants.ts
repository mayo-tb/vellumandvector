// ============================================
// VELLUM & VECTOR — SITE CONSTANTS
// Single source of truth for all static data
// ============================================

export const SITE = {
  name: "Vellum & Vector",
  tagline: "We Design Websites That Sell",
  description:
    "Premium web design & development agency based in Lagos GRA. We build with React, TypeScript, Django, and PostgreSQL — not templates.",
  location: "Lagos GRA, Lagos, Nigeria",
  email: "oyekanboluwatife6@gmail.com",
  whatsapp: "https://wa.me/2348115304230",
  twitter: "https://twitter.com/vellumandvector",
  instagram: "https://instagram.com/vellumandvector",
};

// ============================================
// NAVIGATION
// ============================================

export const NAV_LINKS = [
  { label: "Work",     href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About",    href: "#about" },
  { label: "Process",  href: "#process" },
  { label: "Pricing",  href: "#pricing" },
  { label: "Contact",  href: "#contact" },
];

// ============================================
// TECH STACK — Hardcoded (no API call needed)
// ============================================

export type TechCategory = "Frontend" | "Backend" | "Infrastructure";

export interface TechItem {
  name: string;
  label: string;           // Short label shown on badge
  category: TechCategory;
  color: string;           // Brand color for icon tint / glow
  floatDuration: string;   // CSS animation duration
  floatDelay: string;      // CSS animation delay
  description: string;     // Micro-description below label
}

export const TECH_STACK: TechItem[] = [
  // --- Frontend ---
  {
    name: "React",
    label: "React",
    category: "Frontend",
    color: "#61DAFB",
    floatDuration: "4.0s",
    floatDelay: "0.0s",
    description: "Lightning-fast UI",
  },
  {
    name: "TypeScript",
    label: "TypeScript",
    category: "Frontend",
    color: "#3178C6",
    floatDuration: "4.5s",
    floatDelay: "0.3s",
    description: "Zero runtime surprises",
  },
  {
    name: "Next.js",
    label: "Next.js",
    category: "Frontend",
    color: "#FFFFFF",
    floatDuration: "5.0s",
    floatDelay: "0.6s",
    description: "SSR & blazing speed",
  },
  {
    name: "Tailwind CSS",
    label: "Tailwind",
    category: "Frontend",
    color: "#06B6D4",
    floatDuration: "3.8s",
    floatDelay: "0.9s",
    description: "Pixel-perfect design",
  },
  // --- Backend ---
  {
    name: "Django",
    label: "Django",
    category: "Backend",
    color: "#44B78B",
    floatDuration: "4.2s",
    floatDelay: "1.2s",
    description: "Secure, scalable backend",
  },
  {
    name: "Django REST Framework",
    label: "DRF",
    category: "Backend",
    color: "#A30000",
    floatDuration: "3.6s",
    floatDelay: "1.5s",
    description: "Production-grade APIs",
  },
  {
    name: "Python",
    label: "Python",
    category: "Backend",
    color: "#FFD43B",
    floatDuration: "4.8s",
    floatDelay: "1.8s",
    description: "Powerful & readable",
  },
  // --- Infrastructure ---
  {
    name: "PostgreSQL",
    label: "PostgreSQL",
    category: "Infrastructure",
    color: "#336791",
    floatDuration: "4.1s",
    floatDelay: "0.4s",
    description: "Relational data, built to scale",
  },
  {
    name: "Cloudinary",
    label: "Cloudinary",
    category: "Infrastructure",
    color: "#3448C5",
    floatDuration: "4.6s",
    floatDelay: "0.7s",
    description: "Optimized image delivery",
  },
  {
    name: "Vercel",
    label: "Vercel",
    category: "Infrastructure",
    color: "#FFFFFF",
    floatDuration: "3.9s",
    floatDelay: "1.0s",
    description: "Global edge deployment",
  },
  {
    name: "Framer Motion",
    label: "Framer",
    category: "Frontend",
    color: "#BB4FFF",
    floatDuration: "5.2s",
    floatDelay: "1.3s",
    description: "Fluid animations",
  },
];

// ============================================
// PROJECTS
// ============================================

export interface Project {
  id: string;
  title: string;
  slug: string;
  industry: string;
  description: string;
  metric: string;         // The "result" shown on card
  hook: string;           // Overlay copy hook
  techStack: string[];    // List of tech names shown as pills
  liveUrl: string;
  imageUrl: string;       // Will use Cloudinary / placeholder
  isFeatured: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "adunsville",
    title: "Adunsville Residence",
    slug: "adunsville-residence",
    industry: "Luxury Real Estate",
    description:
      "A full-stack property showcase with image-optimised galleries, Cloudinary CDN delivery, animated room showcases, and a Django-powered enquiry backend.",
    metric: "Luxury short-let booking platform — Ikeja GRA",
    hook: "Where luxury meets engineering.",
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Django REST Framework", "PostgreSQL", "Cloudinary", "Framer Motion"],
    liveUrl: "https://adunsville-residence.vercel.app",
    imageUrl: "/images/adunsville.jpg",
    isFeatured: true,
  },
  {
    id: "ancestryvault",
    title: "AncestryVault",
    slug: "ancestryvault",
    industry: "SaaS / Heritage Tech",
    description:
      "A SaaS platform for managing family trees, genealogical records, and inter-generational document archives — with JWT auth, role-based access, and a relational PostgreSQL schema.",
    metric: "Family lineage management & historical records platform",
    hook: "Complex data. Clean experience.",
    techStack: ["React", "TypeScript", "Django REST Framework", "PostgreSQL", "JWT Auth", "Render"],
    liveUrl: "https://ancestryvault-2.onrender.com",
    imageUrl: "/images/ancestryvault.jpg",
    isFeatured: true,
  },
  {
    id: "nexus",
    title: "Nexus — Timetable System",
    slug: "nexus-timetable",
    industry: "Educational Technology",
    description:
      "An intelligent scheduling engine for higher institutions — uses a custom Genetic Algorithm to generate conflict-free timetables across courses, rooms, and lecturers, with a Next.js admin dashboard.",
    metric: "Conflict-free scheduling via Genetic Algorithms",
    hook: "Where algorithms solve real problems.",
    techStack: ["Python", "Django REST Framework", "Genetic Algorithms", "PostgreSQL", "Next.js", "TypeScript"],
    liveUrl: "https://thenexus87.vercel.app",
    imageUrl: "/images/nexus.jpg",
    isFeatured: true,
  },
];

// ============================================
// SERVICES
// ============================================

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;           // Emoji or icon name
  tech?: string;          // Optional tech callout
}

export const SERVICES: Service[] = [
  {
    id: "design",
    title: "Custom Website Design",
    description: "Pixel-perfect interfaces designed for your brand and your audience. No templates. No shortcuts.",
    icon: "✦",
    tech: "Figma → React",
  },
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description: "Frontend and backend, end to end — one team, no handoffs, no gaps.",
    icon: "⚡",
    tech: "React + Django",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Solutions",
    description: "Scalable online stores with secure payment integration and inventory management.",
    icon: "◈",
    tech: "Django + PostgreSQL",
  },
  {
    id: "seo",
    title: "SEO & Performance",
    description: "Lightning load times, structured data, and Core Web Vitals optimised for Nigerian networks.",
    icon: "◎",
    tech: "Next.js + WebP",
  },
  {
    id: "api",
    title: "API & Backend Systems",
    description: "Custom REST APIs, JWT authentication, and third-party integrations built to scale.",
    icon: "⬡",
    tech: "Django REST Framework",
  },
  {
    id: "support",
    title: "Post-Launch Support",
    description: "Bug fixes, content updates, performance monitoring — we stay. We don't disappear.",
    icon: "◉",
    tech: "Ongoing",
  },
];

// ============================================
// PROCESS
// ============================================

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "We learn your business, your audience, and your goals. No assumptions. No generic briefs.",
  },
  {
    number: "02",
    title: "Design",
    description: "Wireframes then high-fidelity mockups — you approve before a single line of code is written.",
  },
  {
    number: "03",
    title: "Development",
    description: "React frontend, Django backend, staged deployment so you can review before we go live.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Domain setup, performance audit, SEO foundation, go-live. Delivered in 2–8 weeks.",
  },
  {
    number: "05",
    title: "Support",
    description: "Bug fixes, updates, and ongoing guidance included. We don't disappear after launch.",
  },
];

// ============================================
// TESTIMONIALS
// ============================================

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  businessType: string;
  city: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "They took our vision and turned it into a website that actually converts. The attention to detail was unlike anything we'd seen from a local agency.",
    author: "Tunde A.",
    businessType: "Restaurant Owner",
    city: "Victoria Island",
  },
  {
    id: "t2",
    quote: "I wanted something premium for our property listing, and they delivered. The site looks world-class. Guests compliment it regularly.",
    author: "Adaeze O.",
    businessType: "Hospitality Manager",
    city: "Ikeja GRA",
  },
  {
    id: "t3",
    quote: "The build was done in 3 weeks. Three. We've worked with agencies that took 6 months and delivered less.",
    author: "Emeka F.",
    businessType: "Healthcare Consultant",
    city: "Lekki",
  },
  {
    id: "t4",
    quote: "What impressed me most was that I could talk to them in plain English and they handled the technical side completely.",
    author: "Yinka S.",
    businessType: "Legal Services",
    city: "Abuja",
  },
];

// ============================================
// PRICING
// ============================================

export interface PricingTier {
  id: string;
  name: string;
  range: string;
  bestFor: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Essentials",
    range: "₦150k – ₦350k",
    bestFor: "Brochure sites, landing pages, service-based SMBs",
    features: [
      "Up to 5 pages",
      "Mobile-first responsive design",
      "SEO foundation",
      "Contact form",
      "30 days post-launch support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    range: "₦400k – ₦900k",
    bestFor: "Full-stack sites with backend, booking, or e-commerce",
    features: [
      "Unlimited pages",
      "Custom backend (Django + PostgreSQL)",
      "Authentication & user accounts",
      "API integrations",
      "60 days post-launch support",
    ],
    cta: "Most Popular",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    range: "₦1M+",
    bestFor: "SaaS platforms, complex integrations, multi-role systems",
    features: [
      "Full product engineering",
      "Custom SaaS architecture",
      "Advanced API & microservices",
      "Performance & security audit",
      "Ongoing retainer available",
    ],
    cta: "Let's Talk",
    highlighted: false,
  },
];
