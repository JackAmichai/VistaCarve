import wixClient from "@/lib/wixClient";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import VariantSelector from "@/components/product/VariantSelector";
import ProductCarousel from "@/components/product/ProductCarousel";

// Revalidate product pages
export const revalidate = 60;

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    let product = null;
    let recommended = [];

    try {
        const prodResp = await wixClient.products
            .queryProducts()
            .eq("slug", slug)
            .limit(1)
            .find();

        if (prodResp.items.length > 0) {
            product = prodResp.items[0];

            // Fetch some recommended items (from same collection or random)
            const recResp = await wixClient.products.queryProducts().limit(8).find();
            recommended = recResp.items.filter((p: any) => p._id !== product?._id).slice(0, 5);
        }
    } catch (err) {
        console.error("Failed to fetch product", err);
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-32 text-center flex-1">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">Product Not Found</h1>
                <p className="text-gray-500 mb-8">The carving you are looking for does not exist or has been removed.</p>
                <Link href="/shop" className="text-blue-600 hover:underline font-bold text-lg">
                    &larr; Return to all categories
                </Link>
            </div>
        );
    }

    const primaryImage = product.media?.mainMedia?.image?.url || "";
    const allMedia = product.media?.items || [];
    const price = product.price?.formatted?.price || "From $" + (product.price?.price || "0.00");

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Breadcrumbs */}
            <div className="bg-gray-100 py-3 px-4 md:px-8 border-b border-gray-200">
                <div className="container mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/shop" className="hover:text-blue-600">Shop</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900 line-clamp-1">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-10 lg:py-16 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Gallery Column */}
                    <div className="space-y-4">
                        <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-8">
                            {primaryImage ? (
                                <Image
                                    src={primaryImage}
                                    alt={product.name || "Product image"}
                                    fill
                                    className="object-contain mix-blend-multiply p-4"
                                    priority
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <span>No Image</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {allMedia.length > 1 && (
                            <div className="grid grid-cols-5 gap-4">
                                {allMedia.slice(0, 5).map((media: any, idx: number) => (
                                    <button key={idx} className={`relative aspect-square rounded-lg overflow-hidden border-2 ${idx === 0 ? 'border-blue-600' : 'border-transparent hover:border-gray-300'}`}>
                                        <Image
                                            src={media.image?.url || media.url}
                                            alt={`Gallery thumbnail ${idx}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Column */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="mb-8">
                            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                                Customizable
                            </span>
                            {product.description && (
                                <div
                                    className="text-gray-600 leading-relaxed max-w-lg"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            )}
                        </div>

                        {/* Interactive Client Component for Options & Cart */}
                        <VariantSelector
                            productId={product._id!}
                            productOptions={product.productOptions || []}
                            price={price}
                        />

                        {/* Accordion Details (Vistaprint Style) */}
                        <div className="mt-12 space-y-6 pt-10 border-t border-gray-200">
                            <div className="space-y-2 text-sm text-gray-600">
                                <h4 className="font-bold text-gray-900 uppercase tracking-wider mb-3">Product Overview</h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>High-quality materials sourced responsibly.</li>
                                    <li>Precision carving and engraving using latest CNC and laser tech.</li>
                                    <li>Hand-finished and inspected for flawless details.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommended Products Carousel */}
            {recommended.length > 0 && (
                <div className="bg-gray-50 py-16 mt-12 border-t border-gray-200">
                    <div className="container mx-auto px-4 md:px-8">
                        <ProductCarousel
                            title="Customers also ordered"
                            items={recommended}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
