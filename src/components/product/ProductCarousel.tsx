"use client";

import { useRef } from "react";
import { products } from "@wix/stores";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface ProductCarouselProps {
    title: string;
    items: products.Product[];
    linkText?: string;
    linkUrl?: string;
}

export default function ProductCarousel({ title, items, linkText, linkUrl }: ProductCarouselProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="w-full relative">
            <div className="flex items-end justify-between mb-8 mt-4 px-2">
                <h2 className="text-3xl font-bold font-serif text-white drop-shadow-md">{title}</h2>
                {linkText && linkUrl && (
                    <a href={linkUrl} className="text-sm font-semibold text-blue-300 hover:text-white hover:underline flex items-center gap-1 transition-colors">
                        {linkText} <ChevronRight className="w-4 h-4" />
                    </a>
                )}
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: false,
                }}
                className="w-full"
            >
                <div className="relative">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {items.map((product) => (
                            <CarouselItem key={product._id} className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                <div className="p-1 h-full">
                                    <ProductCard product={product} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="hidden md:block">
                        <CarouselPrevious className="-left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white h-12 w-12 transition-all shadow-xl" />
                        <CarouselNext className="-right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:text-white h-12 w-12 transition-all shadow-xl" />
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
