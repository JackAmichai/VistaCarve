"use client";

import { useState, useEffect } from "react";
import { getWixClient } from "@/lib/wixClient";
import { Testimonial } from "@/types";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

export function TestimonialSlider() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const wixClient = getWixClient();
                const response = await wixClient.items.query("Testimonials").find();

                const fetched = response.items.map((item: any) => ({
                    _id: item._id,
                    title: item.data!.title,
                    company: item.data!.company,
                    review: item.data!.review,
                    rating: item.data!.rating,
                    clientAvatar: item.data!.clientAvatar
                })) as Testimonial[];

                setTestimonials(fetched);
            } catch (error) {
                console.error("Failed to fetch testimonials", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="h-64 bg-neutral-100 dark:bg-neutral-900 rounded-3xl animate-pulse"></div>
        );
    }

    if (testimonials.length === 0) {
        return null;
    }

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const current = testimonials[currentIndex];

    return (
        <div className="relative bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col items-center text-center">
                <div className="flex gap-1 mb-6 text-yellow-500">
                    {[...Array(current.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-white mb-8 italic">
                    "{current.review}"
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-200 relative">
                        {current.clientAvatar ? (
                            <img src={current.clientAvatar || "/placeholder.jpg"} alt={current.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-neutral-300 dark:bg-neutral-700" />
                        )}
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-neutral-900 dark:text-white">{current.title}</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{current.company}</p>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-6">
                <button
                    onClick={handlePrevious}
                    className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-6">
                <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-white dark:bg-neutral-800 shadow-md border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors focus:outline-none"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
