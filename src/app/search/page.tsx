"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import wixClient from "@/lib/wixClient";
import ProductCarousel from "@/components/product/ProductCarousel";
import { SearchIcon, Loader2 } from "lucide-react";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!query) return;
            setIsLoading(true);
            try {
                // Perform a basic text search against the Wix products
                // Depending on the SDK setup, this might need refinement
                const response = await wixClient.products.queryProducts()
                    .contains("name", query)
                    .find();

                setProducts(response.items || []);
            } catch (error) {
                console.error("Search failed:", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div className="min-h-screen py-16 px-4 md:px-8 mt-16 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
                    <SearchIcon className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold font-serif text-white">Search Results</h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        {query ? `Showing results for "${query}"` : "Enter a search term above"}
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-70">
                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                    <p className="text-white font-medium">Searching our catalog...</p>
                </div>
            ) : products.length > 0 ? (
                <div className="animate-fade-in-up">
                    <ProductCarousel title={`Found ${products.length} products`} items={products} />
                </div>
            ) : query ? (
                <div className="text-center py-20 glass-card rounded-2xl p-12 max-w-2xl mx-auto">
                    <div className="mx-auto w-24 h-24 mb-6 opacity-40">
                        <SearchIcon className="w-full h-full text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No exact matches found</h2>
                    <p className="text-gray-400">
                        We couldn't find any products matching "{query}". Try checking your spelling or using more general terms like "wood" or "metal".
                    </p>
                </div>
            ) : null}
        </div>
    );
}
