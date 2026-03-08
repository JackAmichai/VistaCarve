import { getWixClient } from "@/lib/wixClient";
import { FreelancerBio } from "@/types";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";

async function getBio(): Promise<FreelancerBio | null> {
  try {
    const wixClient = getWixClient();
    const response = await wixClient.items.query("FreelancerBio").find();

    if (response.items.length === 0) return null;

    const item = response.items[0];
    return {
      _id: item._id,
      title: item.data!.title,
      jobRole: item.data!.jobRole,
      tagline: item.data!.tagline,
      aboutMe: item.data!.aboutMe,
      profilePicture: item.data!.profilePicture,
      githubUrl: item.data!.githubUrl,
      hourlyRate: item.data!.hourlyRate,
    } as FreelancerBio;
  } catch (error) {
    console.error("Failed to fetch FreelancerBio:", error);
    return null;
  }
}

export default async function Home() {
  const bio = await getBio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 space-y-32">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-800 dark:text-neutral-200">
            Available for new opportunities
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {bio?.title || "Freelancer"}
          </h1>
          <h2 className="text-2xl md:text-3xl text-neutral-500 dark:text-neutral-400 font-medium tracking-tight">
            {bio?.jobRole || "Software Engineer"}
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
            {bio?.tagline || "Building scalable architectures."}
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/book-time" className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-900 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {bio?.githubUrl && (
              <a href={bio.githubUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-300">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        {bio?.profilePicture && (
          <div className="flex-shrink-0 relative">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-[2.5rem] overflow-hidden bg-neutral-100 dark:bg-neutral-800 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-500">
              <img src={bio.profilePicture} alt={bio.title} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl p-8 md:p-12 border border-neutral-200 dark:border-neutral-800">
        <h3 className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white">About Me</h3>
        <div className="prose dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300" dangerouslySetInnerHTML={{ __html: bio?.aboutMe || "Driven professional." }} />
      </section>

      {/* Portfolio Section */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">Selected Work</h3>
            <p className="text-neutral-500 dark:text-neutral-400 mt-2">A collection of my recent projects.</p>
          </div>
          <Link href="/portfolio" className="hidden md:inline-flex items-center text-sm font-medium text-neutral-900 dark:text-white hover:underline">
            View all <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <PortfolioGrid />
        <div className="mt-8 md:hidden">
          <Link href="/portfolio" className="inline-flex w-full items-center justify-center h-12 rounded-full border border-neutral-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800">
            View all work
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">Client Feedback</h3>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">What people say about working with me.</p>
        </div>
        <TestimonialSlider />
      </section>
    </div>
  );
}
