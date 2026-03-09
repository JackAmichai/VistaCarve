import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@wix/stores";

interface ProductCardProps {
    product: products.Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Extract primary image
    const primaryImage = product.media?.mainMedia?.image?.url || "";

    // Format price
    const price = product.price?.formatted?.price || "From $" + (product.price?.price || "0.00");
    const isSale = product.price?.discountedPrice !== product.price?.price;
    const originalPrice = product.price?.formatted?.discountedPrice;

    return (
        <Card className="h-full flex flex-col border-none shadow-none bg-transparent group cursor-pointer overflow-hidden rounded-xl group-hover:bg-white transition-all">
            <Link href={`/product/${product.slug}`} className="flex-1 flex flex-col">
                {/* Image Stage */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4">
                    {primaryImage ? (
                        <Image
                            src={primaryImage}
                            alt={product.name || "Product image"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform mix-blend-multiply"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            <span className="text-sm">No Image</span>
                        </div>
                    )}
                    {/* Badges */}
                    {product.ribbon && (
                        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {product.ribbon}
                        </div>
                    )}
                </div>

                {/* Content */}
                <CardContent className="p-0 flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors">
                        {product.name}
                    </h3>
                </CardContent>

                <CardFooter className="p-0 mt-3 pt-3 flex flex-col items-start gap-1">
                    {isSale ? (
                        <div className="flex gap-2 items-center">
                            <span className="font-bold text-red-600 text-lg">{price}</span>
                            <span className="text-sm text-gray-400 line-through">{originalPrice}</span>
                        </div>
                    ) : (
                        <span className="font-bold text-gray-900 text-lg">{price}</span>
                    )}
                    <span className="text-xs text-gray-500">Includes basic material</span>
                </CardFooter>
            </Link>
        </Card>
    );
}
