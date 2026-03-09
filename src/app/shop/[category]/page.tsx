import wixClient from "@/lib/wixClient";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;

    let collection = null;
    let products = [];

    try {
        // 1. Fetch collection by slug
        const colResp = await wixClient.collections
            .queryCollections()
            .eq("slug", category)
            .limit(1)
            .find();

        if (colResp.items.length > 0) {
            collection = colResp.items[0];

            // 2. Fetch products for this collection
            const prodResp = await wixClient.products
                .queryProducts()
                .hasSome("collectionIds", [collection._id])
                .find();

            products = prodResp.items || [];
        }
    } catch (err) {
        console.error("Failed to fetch category data", err);
    }

    if (!collection) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
                <Link href="/shop" className="text-blue-600 hover:underline">
                    &larr; Return to all categories
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-gray-100 py-3 px-4 md:px-8 border-b border-gray-200">
                <div className="container mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/shop" className="hover:text-blue-600">Shop</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900 capitalize">{collection.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 flex-1 py-12 flex flex-col md:flex-row gap-8">

                {/* Filters Sidebar */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-24">
                        <h2 className="text-xl font-bold font-serif mb-6 flex items-center gap-2">
                            <Filter className="w-5 h-5" /> Filters
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">Material Type</h3>
                                <ul className="space-y-2 text-sm text-gray-700 font-medium">
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Oak</label></li>
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Walnut</label></li>
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Cherry</label></li>
                                </ul>
                            </div>
                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">Size</h3>
                                <ul className="space-y-2 text-sm text-gray-700 font-medium">
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Small (5"-10")</label></li>
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Medium (11"-20")</label></li>
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Large (20"+)</label></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">{collection.name}</h1>
                        {collection.description && (
                            <div
                                className="text-gray-600 max-w-3xl leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: collection.description }}
                            />
                        )}
                        <p className="text-sm font-medium text-gray-500 mt-4">{products.length} Items</p>
                    </div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-xl">
                            <p className="text-lg text-gray-600 font-medium">No products available in this category.</p>
                            <Button asChild className="mt-4 rounded-full" variant="outline">
                                <Link href="/shop">Browse all categories</Link>
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
