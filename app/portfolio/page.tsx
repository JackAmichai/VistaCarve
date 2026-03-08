import { PortfolioGrid } from "@/components/PortfolioGrid";

export default function PortfolioPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    All Projects
                </h1>
                <p className="text-lg text-neutral-500 dark:text-neutral-400 mt-4 max-w-2xl">
                    A comprehensive view of my past work, side projects, and open-source contributions.
                </p>
            </div>
            <PortfolioGrid />
        </div>
    );
}
