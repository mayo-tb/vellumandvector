/**
 * Vellum & Vector — Typed API Fetch Helpers
 * lib/api.ts
 *
 * Per spec: "lib/api.ts — Typed fetch functions → Django REST API"
 * All functions go through the Next.js proxy routes (not directly to Django)
 * to avoid client-side CORS issues and to keep secrets server-side.
 */

// ─────────────────────────────────────────────
// Types matching the DRF serializers
// ─────────────────────────────────────────────

export interface ApiProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  industry: string;
  tech_stack: string[];
  image_url: string;
  live_url: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ApiTestimonial {
  id: string;
  client_name: string;
  business_type: string;
  city: string;
  quote: string;
  sort_order: number;
}

export interface ContactPayload {
  name: string;
  email: string;
  businessType?: string;
  budget?: string;
  message: string;
}

export interface ContactResponse {
  status: "success" | "error";
  message: string;
  id?: string;
  errors?: Record<string, string[]>;
}

// ─────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────

const DJANGO_API = process.env.DJANGO_API_URL ?? "http://localhost:8000";

export async function fetchFeaturedProjects(): Promise<ApiProject[]> {
  const res = await fetch(`${DJANGO_API}/api/projects/?featured=true`, {
    next: { revalidate: 3600 }, // Cache for 1 hour (Next.js ISR)
  });
  if (!res.ok) throw new Error("Failed to fetch featured projects");
  return res.json();
}

export async function fetchAllProjects(industry?: string): Promise<ApiProject[]> {
  const params = industry ? `?industry=${encodeURIComponent(industry)}` : "";
  const res = await fetch(`${DJANGO_API}/api/projects/${params}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchProject(slug: string): Promise<ApiProject> {
  const res = await fetch(`${DJANGO_API}/api/projects/${slug}/`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Project not found: ${slug}`);
  return res.json();
}

// ─────────────────────────────────────────────
// Testimonials
// ─────────────────────────────────────────────

export async function fetchTestimonials(): Promise<ApiTestimonial[]> {
  const res = await fetch(`${DJANGO_API}/api/testimonials/`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

// ─────────────────────────────────────────────
// Contact — goes through the Next.js proxy route
// ─────────────────────────────────────────────

export async function submitContactForm(
  payload: ContactPayload
): Promise<ContactResponse> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
