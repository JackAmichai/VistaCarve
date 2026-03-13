import { getCollections } from "@/lib/wixData";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function ShopPage() {
    const collections = await getCollections();

    return (
        <div className="container mx-auto px-4 md:px-8 py-12 flex-1">
            <div className="mb-12 border-b border-gray-200 pb-8 content-center text-center">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shop Categories</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore our complete range of premium custom carvings, engravings, and tailored pieces.
                </p>
            </div>

            {collections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {collections.map((collection) => (
                        <Link
                            key={collection._id}
                            href={`/shop/${collection.slug}`}
                            className="group block relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 min-h-[250px]"
                        >
                            {collection.media?.mainMedia?.image?.url && (
                                <Image
                                    src={collection.media.mainMedia.image.url}
                                    alt={collection.name || "Category"}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform mix-blend-multiply"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6">
                                <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                    {collection.name}
                                </h2>
                                <p className="text-white/80 font-medium text-sm">Shop Collection &rarr;</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-xl border border-gray-100 text-gray-500">
                    <p>No collections found. Syncing catalog...</p>
                </div>
            )}
        </div>
    );
}
