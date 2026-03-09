import wixClient from "@/lib/wixClient";
import ProductCarousel from "@/components/product/ProductCarousel";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Keep it dynamic so we fetch fresh products
export const revalidate = 60;

export default async function HomePage() {
  let allProducts = [];
  try {
    const response = await wixClient.products.queryProducts().limit(15).find();
    allProducts = response.items || [];
  } catch (err) {
    console.error("Failed to fetch products from Wix", err);
  }

  // Split into pseudo-categories for demonstration carousels
  const woodworking = allProducts.slice(0, 5);
  const bestselling = allProducts.slice(5, 10);
  const newArrivals = allProducts.slice(10, 15);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section (Vistaprint Style Dark Block) */}
      <section className="bg-[#1C2024] text-white pt-16 pb-20 px-4 mt-8 mx-4 md:mx-8 rounded-2xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none mix-blend-overlay">
          <div className="w-full h-full bg-gradient-to-l from-blue-500 to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-serif leading-tight">
            If you need it carved, <br className="hidden md:block" /> we carve it.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light">
            From custom-engraved wooden signs to beautiful stone photo gifts, we've got the
            perfect piece for you. Explore our top materials starting at just $29.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full font-bold px-8 h-14 text-base">
              Try for $29
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full font-bold px-8 h-14 text-base bg-transparent">
              Bestselling Carvings
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full font-bold px-8 h-14 text-base bg-transparent">
              Design Services
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-gray-100 px-4 md:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Products you'll love</h4>
              <p className="text-sm text-gray-500">The right materials at great prices</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Free Design Maker</h4>
              <p className="text-sm text-gray-500">Get your custom carving in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Help when you need it</h4>
              <p className="text-sm text-gray-500">Live chat with us as late as 3am ET</p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousels Section */}
      <section className="py-16 px-4 md:px-8 space-y-16 container mx-auto">
        <ProductCarousel
          title="Explore all categories"
          items={woodworking}
          linkText="See all"
          linkUrl="/shop"
        />

        {/* Ad Block (Vistaprint Style Collection Links) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/shop/wood" className="group rounded-xl overflow-hidden relative aspect-square bg-gray-100 block">
            <Image src="/images/wood_carvings.png" alt="Wood Carvings" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="p-6 absolute inset-0 z-10 flex flex-col justify-end">
              <span className="font-bold text-xl text-gray-900 bg-white/90 backdrop-blur self-start px-4 py-2 rounded shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">Wood Carvings</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0 pointer-events-none"></div>
          </Link>

          <Link href="/shop/metal" className="group rounded-xl overflow-hidden relative aspect-square bg-slate-200 block">
            <Image src="/images/metal_engraving.png" alt="Metal Engravings" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="p-6 absolute inset-0 z-10 flex flex-col justify-end">
              <span className="font-bold text-xl text-gray-900 bg-white/90 backdrop-blur self-start px-4 py-2 rounded shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">Metal Engravings</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0 pointer-events-none"></div>
          </Link>

          <Link href="/shop/stone" className="group rounded-xl overflow-hidden relative aspect-square bg-stone-200 block">
            <Image src="/images/stone_marble_carving.png" alt="Stone & Marble" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="p-6 absolute inset-0 z-10 flex flex-col justify-end">
              <span className="font-bold text-xl text-gray-900 bg-white/90 backdrop-blur self-start px-4 py-2 rounded shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">Stone & Marble</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0 pointer-events-none"></div>
          </Link>
        </div>

        {bestselling.length > 0 && (
          <ProductCarousel
            title="Bestselling custom pieces"
            items={bestselling}
          />
        )}

        {newArrivals.length > 0 && (
          <ProductCarousel
            title="New arrivals"
            items={newArrivals}
          />
        )}
      </section>

    </div>
  );
}
