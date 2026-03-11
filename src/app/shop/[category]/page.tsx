import wixClient from "@/lib/wixClient";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { category: string } }) {
    const { category } = params;

    let collection: any = null;
    let products: any[] = [];

    try {
        // 1. Check for mock categories
        if (category === "corporate-gifts") {
            collection = {
                _id: "mock-corporate",
                name: "Corporate Gifts",
                description: "Impress your clients and team with custom-engraved premium pieces.",
            };
            products = [
                { _id: "c1", name: "Executive Pen Box", priceData: { formatted: { price: "$49.99", discountedPrice: "$49.99" } }, media: { mainMedia: { image: { url: "/images/corporate/pen gift.png" } } }, ribbon: "Bestseller", slug: "executive-pen-box" },
                { _id: "c2", name: "Deer Statue Corporate Award", priceData: { formatted: { price: "$129.99", discountedPrice: "$129.99" } }, media: { mainMedia: { image: { url: "/images/corporate/deer gift.png" } } }, slug: "deer-statue-award" },
                { _id: "c3", name: "Premium Metal Statue", priceData: { formatted: { price: "$199.99", discountedPrice: "$149.99" } }, media: { mainMedia: { image: { url: "/images/corporate/statue metal.png" } } }, ribbon: "Sale", slug: "premium-metal-statue" },
                { _id: "c4", name: "Custom Sword Engraving", priceData: { formatted: { price: "$299.99", discountedPrice: "$299.99" } }, media: { mainMedia: { image: { url: "/images/corporate/sword gift.png" } } }, slug: "custom-sword-engraving" },
                { _id: "c5", name: "Silver Tree Centerpiece", priceData: { formatted: { price: "$149.99", discountedPrice: "$149.99" } }, media: { mainMedia: { image: { url: "/images/corporate/tree gift.png" } } }, slug: "silver-tree-centerpiece" },
            ];
        } else if (category === "wedding-decor") {
            collection = {
                _id: "mock-wedding",
                name: "Wedding Decor",
                description: "Immortalize your special day with our masterfully carved stone and marble pieces.",
            };
            products = [
                { _id: "w1", name: "Jesus Wedding Carving", priceData: { formatted: { price: "$89.99", discountedPrice: "$89.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Jesus wedding.png" } } }, ribbon: "New", slug: "jesus-wedding-carving" },
                { _id: "w2", name: "Stone and Marble Maria", priceData: { formatted: { price: "$159.99", discountedPrice: "$159.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Stone and marbel maria.png" } } }, slug: "stone-marble-maria" },
                { _id: "w3", name: "Chupa Metal Decor", priceData: { formatted: { price: "$199.99", discountedPrice: "$199.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Chupa metal.png" } } }, slug: "chupa-metal-decor" },
                { _id: "w4", name: "Family Wedding Photo", priceData: { formatted: { price: "$79.99", discountedPrice: "$79.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Family wedding metal photo.png" } } }, slug: "family-wedding-photo" },
                { _id: "w5", name: "Bridesmaids Metal Gift", priceData: { formatted: { price: "$49.99", discountedPrice: "$49.99" } }, media: { mainMedia: { image: { url: "/images/wedding/bridemaids metal.png" } } }, slug: "bridesmaids-metal-gift" },
            ];
        } else if (category === "wood" || category === "wood-carvings") {
            collection = {
                _id: "mock-wood",
                name: "Wood Carvings",
                description: "Warm, natural, and timeless wood carvings for your home.",
            };
            products = [
                { _id: "wd1", name: "Caribbean Islands Wood", priceData: { formatted: { price: "$69.99", discountedPrice: "$69.99" } }, media: { mainMedia: { image: { url: "/images/wood/carribian islands wood.png" } } }, ribbon: "New", slug: "caribbean-islands-wood" },
                { _id: "wd2", name: "Elephant Wood Floor", priceData: { formatted: { price: "$149.99", discountedPrice: "$149.99" } }, media: { mainMedia: { image: { url: "/images/wood/elephant wood floor.png" } } }, slug: "elephant-wood-floor" },
                { _id: "wd3", name: "Sea Board Wood", priceData: { formatted: { price: "$89.99", discountedPrice: "$89.99" } }, media: { mainMedia: { image: { url: "/images/wood/sea board wood.png" } } }, slug: "sea-board-wood" },
            ];
        } else if (category === "metal" || category === "metal-engravings") {
            collection = {
                _id: "mock-metal",
                name: "Metal Engravings",
                description: "Sleek and modern metal engravings with industrial precision.",
            };
            products = [
                { _id: "mt1", name: "Metal Lizzard", priceData: { formatted: { price: "$59.99", discountedPrice: "$59.99" } }, media: { mainMedia: { image: { url: "/images/metal/Lizzard.png" } } }, ribbon: "New", slug: "metal-lizzard" },
                { _id: "mt2", name: "Metal Cat Sculpture", priceData: { formatted: { price: "$49.99", discountedPrice: "$49.99" } }, media: { mainMedia: { image: { url: "/images/metal/Metal cat.png" } } }, slug: "metal-cat-sculpture" },
                { _id: "mt3", name: "Dog Metal Plaque", priceData: { formatted: { price: "$39.99", discountedPrice: "$39.99" } }, media: { mainMedia: { image: { url: "/images/metal/dog metal.png" } } }, slug: "dog-metal-plaque" },
                { _id: "mt4", name: "Feast Metal Plate", priceData: { formatted: { price: "$129.99", discountedPrice: "$129.99" } }, media: { mainMedia: { image: { url: "/images/metal/feast metal plate.png" } } }, slug: "feast-metal-plate" },
            ];
        } else if (category === "marble" || category === "stone" || category === "stone-carvings") {
            collection = {
                _id: "mock-marble",
                name: "Marble & Stone",
                description: "Elegant and durable carvings in natural stone and premium marble.",
            };
            products = [
                { _id: "mb1", name: "Greek Marble Statue", priceData: { formatted: { price: "$189.99", discountedPrice: "$189.99" } }, media: { mainMedia: { image: { url: "/images/marble/Greek marbel.png" } } }, ribbon: "Premium", slug: "greek-marble-statue" },
                { _id: "mb2", name: "Roman Pillars Plaque", priceData: { formatted: { price: "$159.99", discountedPrice: "$159.99" } }, media: { mainMedia: { image: { url: "/images/marble/Roman pillars.png" } } }, slug: "roman-pillars-plaque" },
                { _id: "mb3", name: "Orchestra Marble Carving", priceData: { formatted: { price: "$219.99", discountedPrice: "$219.99" } }, media: { mainMedia: { image: { url: "/images/marble/orchestra marbel.png" } } }, slug: "orchestra-marble-carving" },
                { _id: "mb4", name: "Piano Stone Carved", priceData: { formatted: { price: "$249.99", discountedPrice: "$249.99" } }, media: { mainMedia: { image: { url: "/images/marble/piano stone carved.png" } } }, slug: "piano-stone-carved" },
                { _id: "mb5", name: "Stone Violin (Hebrew: כינור אבן)", priceData: { formatted: { price: "$179.99", discountedPrice: "$179.99" } }, media: { mainMedia: { image: { url: "/images/marble/כינור אבן.png" } } }, slug: "stone-violin" },
            ];
        } else if (category === "custom-signage") {
            collection = {
                _id: "mock-custom-signage",
                name: "Custom Signage",
                description: "Professional, high-impact custom signage for your business or home.",
            };
            products = [
                { _id: "cs1", name: "Modern Office Sign", priceData: { formatted: { price: "$149.99", discountedPrice: "$149.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_13kg8l13kg8l13kg.png" } } }, ribbon: "New", slug: "modern-office-sign" },
                { _id: "cs2", name: "Industrial Metal Plaque", priceData: { formatted: { price: "$199.99", discountedPrice: "$199.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_7dzjno7dzjno7dzj.png" } } }, slug: "industrial-metal-plaque" },
                { _id: "cs3", name: "Boutique Wood Sign", priceData: { formatted: { price: "$129.99", discountedPrice: "$129.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_7ms8v97ms8v97ms8.png" } } }, slug: "boutique-wood-sign" },
                { _id: "cs4", name: "Premium Acrylic Sign", priceData: { formatted: { price: "$179.99", discountedPrice: "$179.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_a3uliwa3uliwa3ul.png" } } }, ribbon: "Bestseller", slug: "premium-acrylic-sign" },
                { _id: "cs5", name: "Rustic Outdoor Signboat", priceData: { formatted: { price: "$159.99", discountedPrice: "$159.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_ek5feek5feek5fee.png" } } }, slug: "rustic-outdoor-sign" },
                { _id: "cs6", name: "Glass Effect Business Sign", priceData: { formatted: { price: "$219.99", discountedPrice: "$219.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_u5l3alu5l3alu5l3.png" } } }, slug: "glass-effect-sign" },
            ];
        } else {
            // 2. Fetch collection by slug from Wix
            const colResp = await wixClient.collections
                .queryCollections()
                .limit(50)
                .find();

            const foundCol = colResp.items.find(c => c.slug === category || c.name?.toLowerCase() === category);
            if (foundCol) {
                collection = foundCol;

                // 2. Fetch products for this collection
                const prodResp = await wixClient.products
                    .queryProducts()
                    .hasSome("collectionIds", [collection._id])
                    .find();

                products = prodResp.items || [];
            }
        }
    } catch (err) {
        console.warn("Failed to fetch category data", err);
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
                <div className="container mx-auto flex items-center gap-2 text-xs text-gray-800 font-bold">
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
                                <ul className="space-y-2 text-sm text-gray-800 font-bold">
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Oak</label></li>
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Walnut</label></li>
                                    <li><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-blue-600 focus:ring-blue-600" /> Cherry</label></li>
                                </ul>
                            </div>
                            <div className="border-t pt-6">
                                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wider text-gray-500">Size</h3>
                                <ul className="space-y-2 text-sm text-gray-800 font-bold">
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
                                className="text-gray-800 max-w-3xl leading-relaxed font-medium"
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
                            <Link href="/shop">
                                <Button className="mt-4 rounded-full" variant="outline">Browse all categories</Button>
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
