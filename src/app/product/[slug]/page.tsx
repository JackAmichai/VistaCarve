import wixClient from "@/lib/wixClient";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package, LayoutTemplate, BookOpen, Ruler } from "lucide-react";
import VariantSelector from "@/components/product/VariantSelector";
import ProductCarousel from "@/components/product/ProductCarousel";
import ProductReviews from "@/components/product/ProductReviews";

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

        if (prodResp.items && prodResp.items.length > 0) {
            product = prodResp.items[0];

            // Fetch some recommended items
            const recResp = await wixClient.products.queryProducts().limit(8).find();
            recommended = recResp.items.filter((p: any) => p._id !== product?._id).slice(0, 5);
        }
    } catch (err) {
        console.warn("Failed to fetch product from Wix or token invalid. Falling back to mocks...", err);
    }

    // MOCK DATA FALLBACK
    if (!product) {
        // List of all mock products from shop categories
        const mockProducts = [
            { _id: "c1", name: "Executive Pen Box", priceData: { formatted: { price: "$49.99", discountedPrice: "$49.99" } }, price: { price: 49.99, formatted: { price: "$49.99" } }, media: { mainMedia: { image: { url: "/images/corporate/pen gift.png" } } }, ribbon: "Bestseller", slug: "executive-pen-box", description: "Premium executive pen box." },
            { _id: "c2", name: "Deer Statue Corporate Award", priceData: { formatted: { price: "$129.99", discountedPrice: "$129.99" } }, price: { price: 129.99, formatted: { price: "$129.99" } }, media: { mainMedia: { image: { url: "/images/corporate/deer gift.png" } } }, slug: "deer-statue-award", description: "A beautifully crafted deer statue for corporate recognition." },
            { _id: "c3", name: "Premium Metal Statue", priceData: { formatted: { price: "$199.99", discountedPrice: "$149.99" } }, price: { price: 149.99, formatted: { price: "$149.99" } }, media: { mainMedia: { image: { url: "/images/corporate/statue metal.png" } } }, ribbon: "Sale", slug: "premium-metal-statue", description: "Exclusive metal statue." },
            { _id: "c4", name: "Custom Sword Engraving", priceData: { formatted: { price: "$299.99", discountedPrice: "$299.99" } }, price: { price: 299.99, formatted: { price: "$299.99" } }, media: { mainMedia: { image: { url: "/images/corporate/sword gift.png" } } }, slug: "custom-sword-engraving", description: "Custom engraved sword." },
            { _id: "c5", name: "Silver Tree Centerpiece", priceData: { formatted: { price: "$149.99", discountedPrice: "$149.99" } }, price: { price: 149.99, formatted: { price: "$149.99" } }, media: { mainMedia: { image: { url: "/images/corporate/tree gift.png" } } }, slug: "silver-tree-centerpiece", description: "Silver tree." },
            { _id: "w1", name: "Jesus Wedding Carving", priceData: { formatted: { price: "$89.99", discountedPrice: "$89.99" } }, price: { price: 89.99, formatted: { price: "$89.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Jesus wedding.png" } } }, ribbon: "New", slug: "jesus-wedding-carving", description: "Carved Jesus for wedding." },
            { _id: "w2", name: "Stone and Marble Maria", priceData: { formatted: { price: "$159.99", discountedPrice: "$159.99" } }, price: { price: 159.99, formatted: { price: "$159.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Stone and marbel maria.png" } } }, slug: "stone-marble-maria", description: "Stone and Marble Maria." },
            { _id: "w3", name: "Chupa Metal Decor", priceData: { formatted: { price: "$199.99", discountedPrice: "$199.99" } }, price: { price: 199.99, formatted: { price: "$199.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Chupa metal.png" } } }, slug: "chupa-metal-decor", description: "Metal decor for weddings." },
            { _id: "w4", name: "Family Wedding Photo", priceData: { formatted: { price: "$79.99", discountedPrice: "$79.99" } }, price: { price: 79.99, formatted: { price: "$79.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Family wedding metal photo.png" } } }, slug: "family-wedding-photo", description: "Metal photo for weddings." },
            { _id: "w5", name: "Bridesmaids Metal Gift", priceData: { formatted: { price: "$49.99", discountedPrice: "$49.99" } }, price: { price: 49.99, formatted: { price: "$49.99" } }, media: { mainMedia: { image: { url: "/images/wedding/bridemaids metal.png" } } }, slug: "bridesmaids-metal-gift", description: "Gift for bridesmaids." },
            { _id: "wd1", name: "Caribbean Islands Wood", priceData: { formatted: { price: "$69.99", discountedPrice: "$69.99" } }, price: { price: 69.99, formatted: { price: "$69.99" } }, media: { mainMedia: { image: { url: "/images/wood/carribian islands wood.png" } } }, ribbon: "New", slug: "caribbean-islands-wood", description: "Wood carving of caribbean islands." },
            { _id: "wd2", name: "Elephant Wood Floor", priceData: { formatted: { price: "$149.99", discountedPrice: "$149.99" } }, price: { price: 149.99, formatted: { price: "$149.99" } }, media: { mainMedia: { image: { url: "/images/wood/elephant wood floor.png" } } }, slug: "elephant-wood-floor", description: "Elephant wood carving." },
            { _id: "wd3", name: "Sea Board Wood", priceData: { formatted: { price: "$89.99", discountedPrice: "$89.99" } }, price: { price: 89.99, formatted: { price: "$89.99" } }, media: { mainMedia: { image: { url: "/images/wood/sea board wood.png" } } }, slug: "sea-board-wood", description: "Sea board wood carving." },
            { _id: "mt1", name: "Metal Lizzard", priceData: { formatted: { price: "$59.99", discountedPrice: "$59.99" } }, price: { price: 59.99, formatted: { price: "$59.99" } }, media: { mainMedia: { image: { url: "/images/metal/Lizzard.png" } } }, ribbon: "New", slug: "metal-lizzard", description: "Custom metal lizzard sculpture." },
            { _id: "mt2", name: "Metal Cat Sculpture", priceData: { formatted: { price: "$49.99", discountedPrice: "$49.99" } }, price: { price: 49.99, formatted: { price: "$49.99" } }, media: { mainMedia: { image: { url: "/images/metal/Metal cat.png" } } }, slug: "metal-cat-sculpture", description: "Sleek metal cat sculpture." },
            { _id: "mt3", name: "Dog Metal Plaque", priceData: { formatted: { price: "$39.99", discountedPrice: "$39.99" } }, price: { price: 39.99, formatted: { price: "$39.99" } }, media: { mainMedia: { image: { url: "/images/metal/dog metal.png" } } }, slug: "dog-metal-plaque", description: "Custom dog metal plaque." },
            { _id: "mt4", name: "Feast Metal Plate", priceData: { formatted: { price: "$129.99", discountedPrice: "$129.99" } }, price: { price: 129.99, formatted: { price: "$129.99" } }, media: { mainMedia: { image: { url: "/images/metal/feast metal plate.png" } } }, slug: "feast-metal-plate", description: "Custom feast metal plate." },
            { _id: "mb1", name: "Greek Marble Statue", priceData: { formatted: { price: "$189.99", discountedPrice: "$189.99" } }, price: { price: 189.99, formatted: { price: "$189.99" } }, media: { mainMedia: { image: { url: "/images/marble/Greek marbel.png" } } }, ribbon: "Premium", slug: "greek-marble-statue", description: "Greek marble statue." },
            { _id: "mb2", name: "Roman Pillars Plaque", priceData: { formatted: { price: "$159.99", discountedPrice: "$159.99" } }, price: { price: 159.99, formatted: { price: "$159.99" } }, media: { mainMedia: { image: { url: "/images/marble/Roman pillars.png" } } }, slug: "roman-pillars-plaque", description: "Roman pillars plaque." },
            { _id: "mb3", name: "Orchestra Marble Carving", priceData: { formatted: { price: "$219.99", discountedPrice: "$219.99" } }, price: { price: 219.99, formatted: { price: "$219.99" } }, media: { mainMedia: { image: { url: "/images/marble/orchestra marbel.png" } } }, slug: "orchestra-marble-carving", description: "Orchestra marble carving." },
            { _id: "mb4", name: "Piano Stone Carved", priceData: { formatted: { price: "$249.99", discountedPrice: "$249.99" } }, price: { price: 249.99, formatted: { price: "$249.99" } }, media: { mainMedia: { image: { url: "/images/marble/piano stone carved.png" } } }, slug: "piano-stone-carved", description: "Piano stone carved." },
            { _id: "mb5", name: "Stone Violin (Hebrew: כינור אבן)", priceData: { formatted: { price: "$179.99", discountedPrice: "$179.99" } }, price: { price: 179.99, formatted: { price: "$179.99" } }, media: { mainMedia: { image: { url: "/images/marble/כינור אבן.png" } } }, slug: "stone-violin", description: "Stone violin." },
            { _id: "cs1", name: "Modern Office Sign", priceData: { formatted: { price: "$149.99", discountedPrice: "$149.99" } }, price: { price: 149.99, formatted: { price: "$149.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_13kg8l13kg8l13kg.png" } } }, ribbon: "New", slug: "modern-office-sign", description: "Modern office sign." },
            { _id: "cs2", name: "Industrial Metal Plaque", priceData: { formatted: { price: "$199.99", discountedPrice: "$199.99" } }, price: { price: 199.99, formatted: { price: "$199.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_7dzjno7dzjno7dzj.png" } } }, slug: "industrial-metal-plaque", description: "Industrial metal plaque." },
            { _id: "cs3", name: "Boutique Wood Sign", priceData: { formatted: { price: "$129.99", discountedPrice: "$129.99" } }, price: { price: 129.99, formatted: { price: "$129.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_7ms8v97ms8v97ms8.png" } } }, slug: "boutique-wood-sign", description: "Boutique wood sign." },
            { _id: "cs4", name: "Premium Acrylic Sign", priceData: { formatted: { price: "$179.99", discountedPrice: "$179.99" } }, price: { price: 179.99, formatted: { price: "$179.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_a3uliwa3uliwa3ul.png" } } }, ribbon: "Bestseller", slug: "premium-acrylic-sign", description: "Premium acrylic sign." },
            { _id: "cs5", name: "Rustic Outdoor Signboat", priceData: { formatted: { price: "$159.99", discountedPrice: "$159.99" } }, price: { price: 159.99, formatted: { price: "$159.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_ek5feek5feek5fee.png" } } }, slug: "rustic-outdoor-sign", description: "Rustic outdoor sign." },
            { _id: "cs6", name: "Glass Effect Business Sign", priceData: { formatted: { price: "$219.99", discountedPrice: "$219.99" } }, price: { price: 219.99, formatted: { price: "$219.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_u5l3alu5l3alu5l3.png" } } }, slug: "glass-effect-sign", description: "Glass effect business sign." },
        ];
        product = mockProducts.find(p => p.slug === slug);
        recommended = mockProducts.filter(p => p.slug !== slug).sort(() => 0.5 - Math.random()).slice(0, 5);
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
                            productName={product.name}
                            primaryImage={primaryImage}
                        />

                        {/* Accordion Details (Vistaprint Style) */}
                        <div className="mt-12 border-t border-gray-200">
                            <button className="w-full flex items-center justify-between py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left group">
                                <div className="flex items-center gap-4 text-gray-900 font-semibold text-lg">
                                    <Package className="w-5 h-5 text-gray-700" />
                                    <span className="group-hover:underline underline-offset-4">Get a pre-printed sample</span>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left group">
                                <div className="flex items-center gap-4 text-gray-900 font-semibold text-lg">
                                    <LayoutTemplate className="w-5 h-5 text-gray-700" />
                                    <span className="group-hover:underline underline-offset-4">Specs & Templates</span>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left group">
                                <div className="flex items-center gap-4 text-gray-900 font-semibold text-lg">
                                    <BookOpen className="w-5 h-5 text-gray-700" />
                                    <span className="group-hover:underline underline-offset-4">Product Options</span>
                                </div>
                            </button>
                            <button className="w-full flex items-center justify-between py-6 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left group">
                                <div className="flex items-center gap-4 text-gray-900 font-semibold text-lg">
                                    <Ruler className="w-5 h-5 text-gray-700" />
                                    <span className="group-hover:underline underline-offset-4">Sizes & Dimensions</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Reviews Section */}
                {product._id && (
                    <ProductReviews productId={product._id} />
                )}
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
