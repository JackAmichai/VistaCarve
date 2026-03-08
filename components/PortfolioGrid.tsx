"use client";

import { useEffect, useState } from "react";
import { getWixClient } from "@/lib/wixClient";
import { PortfolioProject } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, ArrowRight } from "lucide-react";

export function PortfolioGrid() {
    const [projects, setProjects] = useState<PortfolioProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const wixClient = getWixClient();
                const response = await wixClient.items.query("PortfolioProjects").find();

                const fetchedProjects = response.items.map((item: any) => ({
                    _id: item._id,
                    title: item.data!.title,
                    slug: item.data!.slug,
                    shortSummary: item.data!.shortSummary,
                    fullDescription: item.data!.fullDescription,
                    coverImage: item.data!.coverImage,
                    techStack: item.data!.techStack || [],
                    liveLink: item.data!.liveLink,
                    isFeatured: item.data!.isFeatured
                })) as PortfolioProject[];

                setProjects(fetchedProjects);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-neutral-100 dark:bg-neutral-800 rounded-2xl"></div>
            ))}
        </div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
                <div key={project._id} className="group relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 overflow-hidden relative">
                        {project.coverImage ? (
                            <img
                                src={project.coverImage || "/placeholder.jpg"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full w-full bg-neutral-200 dark:bg-neutral-800 text-neutral-400">
                                <Briefcase className="w-10 h-10" />
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                            {project.title}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
                            {project.shortSummary}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.techStack.map((tech) => (
                                <span key={tech} className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.liveLink && (
                            <Link href={project.liveLink} target="_blank" className="inline-flex items-center text-sm font-medium text-neutral-900 dark:text-white hover:underline">
                                View Project <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
