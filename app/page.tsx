import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";

import { fetchFeaturedProjects, fetchTestimonials } from "@/lib/api";

// Enable Next.js Incremental Static Regeneration (ISR)
// Rebuilds this static page at most once every 60 seconds when requests come in
export const revalidate = 60;

export default async function HomePage() {
  let initialProjects = null;
  let initialTestimonials = null;

  try {
    // Attempt server-side fetch from local/production Django REST API
    initialProjects = await fetchFeaturedProjects();
  } catch (error) {
    console.warn(
      "[HomePage SSR] Failed to fetch featured projects from API. Falling back to local static constants.",
      error
    );
  }

  try {
    initialTestimonials = await fetchTestimonials();
  } catch (error) {
    console.warn(
      "[HomePage SSR] Failed to fetch testimonials from API. Falling back to local static constants.",
      error
    );
  }

  return (
    <>
      <Hero />
      <About />
      <Services />
      <FeaturedProjects initialProjects={initialProjects} />
      <Testimonials initialTestimonials={initialTestimonials} />
      <Process />
      <Pricing />
      <Contact />
    </>
  );
}
