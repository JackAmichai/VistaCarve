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
      <section className="bg-primary text-white pt-16 pb-20 px-4 mt-8 mx-4 md:mx-8 rounded-2xl relative overflow-hidden shadow-2xl transition-all">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay">
          <div className="w-full h-full bg-gradient-to-r from-blue-600 via-primary to-accent animate-gradient-x"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 font-serif leading-tight drop-shadow-md flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-4">
            <span>If you need</span>
            <span className="flip-container h-[1.2em] overflow-hidden align-bottom relative inline-block text-left">
              <span className="flip-box block animate-[flip-show_6s_linear_infinite]">
                <div className="h-[1.2em] mb-[1.2em] flex items-center"><div className="bg-[#42c58a] text-white px-3 md:px-4 py-1 rounded-xl">Wood Carvings</div></div>
                <div className="h-[1.2em] mb-[1.2em] flex items-center"><div className="bg-[#4ec7f3] text-white px-3 md:px-4 py-1 rounded-xl">Metal Engravings</div></div>
                <div className="h-[1.2em] mb-[1.2em] flex items-center"><div className="bg-[#DC143C] text-white px-3 md:px-4 py-1 rounded-xl">Stone & Marble</div></div>
              </span>
            </span>
            <span>, we carve it.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-10 max-w-2xl font-light drop-shadow">
            From custom-engraved wooden signs to beautiful stone photo gifts, we've got the
            perfect piece for you. Explore our top materials starting at just $29.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full font-bold px-8 h-14 text-base hover:scale-105 transition-transform shadow-lg">
              Try for $29
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white hover:text-primary rounded-full font-bold px-8 h-14 text-base bg-white/10 backdrop-blur-sm hover:scale-105 transition-all">
              Bestselling Carvings
            </Button>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white hover:text-primary rounded-full font-bold px-8 h-14 text-base bg-white/10 backdrop-blur-sm hover:scale-105 transition-all">
              Design Services
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b border-gray-100 px-4 md:px-8 bg-gradient-to-b from-secondary/30 to-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 justify-center md:justify-start group cursor-default">
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Products you'll love</h4>
              <p className="text-sm text-gray-500">The right materials at great prices</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start group cursor-default">
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Free Design Maker</h4>
              <p className="text-sm text-gray-500">Get your custom carving in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start group cursor-default">
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
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

        {/* Concept Ad Block (Advanced Visuals) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 concept-wrapper">

          <Link href="/shop/wood" className="concept concept-four group aspect-square block w-full !h-auto">
            <Image src="/images/wood_carvings.png" alt="Wood Carvings" fill className="object-cover transition-transform duration-700 group-hover:scale-105 z-0" />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <h1 className="text-3xl md:text-2xl lg:text-3xl">Wood.</h1>
            </div>
          </Link>

          <Link href="/shop/metal" className="concept concept-two group aspect-square block w-full !h-auto">
            <Image src="/images/metal_engraving.png" alt="Metal Engravings" fill className="object-cover transition-transform duration-700 group-hover:scale-105 z-0" />
            <div className="hover z-10 w-full h-full flex items-center justify-center">
              <h1 className="text-3xl md:text-2xl lg:text-3xl">Metal</h1>
            </div>
          </Link>

          <Link href="/shop/stone" className="concept concept-six group aspect-square block w-full !h-auto">
            <Image src="/images/stone_marble_carving.png" alt="Stone & Marble" fill className="object-cover transition-transform duration-700 group-hover:scale-105 z-0" />
            <div className="word z-10 relative">
              <span className="char">S</span>
              <span className="char">T</span>
              <span className="char">O</span>
              <span className="char">N</span>
              <span className="char">E</span>
            </div>
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
