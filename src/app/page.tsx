import wixClient from "@/lib/wixClient";
import ProductCarousel from "@/components/product/ProductCarousel";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MotionSection, MotionDiv, MotionH2 } from "@/components/ui/Motion";

// Keep it dynamic so we fetch fresh products
export const revalidate = 60;

export default async function HomePage() {
  let allProducts: any[] = [];
  try {
    const response = await wixClient.products.queryProducts().limit(15).find();
    allProducts = response.items || [];
  } catch (err) {
    console.warn("Failed to fetch products from Wix", err);
  }

  // Split into pseudo-categories for demonstration carousels
  const woodworking = allProducts.slice(0, 5);
  const bestselling = allProducts.slice(5, 10);
  const newArrivals = allProducts.slice(10, 15);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section (Vistaprint Style Dark Block) */}
      <MotionSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-md text-gray-900 pt-16 pb-20 px-4 mt-8 mx-4 md:mx-8 rounded-2xl relative overflow-hidden shadow-xl border border-white/40 transition-all"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-overlay">
          <div className="w-full h-full bg-gradient-to-r from-blue-600 via-primary to-accent animate-gradient-x"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 font-serif leading-tight text-gray-900 flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-4">
            <span>If you need</span>
            <span className="flip-container h-[1.2em] overflow-hidden align-bottom relative inline-block text-left">
              <span className="flip-box block animate-[flip-show_6s_linear_infinite]">
                <div className="h-[1.2em] mb-[1.2em] flex items-center"><div className="bg-[#42c58a] text-white px-3 md:px-4 py-1 rounded-xl">Wood Carvings</div></div>
                <div className="h-[1.2em] mb-[1.2em] flex items-center"><div className="bg-[#4ec7f3] text-white px-3 md:px-4 py-1 rounded-xl">Metal Engravings</div></div>
                <div className="h-[1.2em] mb-[1.2em] flex items-center"><div className="bg-[#DC143C] text-white px-3 md:px-4 py-1 rounded-xl">Stone & Marble</div></div>
              </span>
            </span>
            <span> we carve it.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl font-medium drop-shadow-sm">
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
      </MotionSection>

      {/* Trust Badges */}
      <MotionSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12 glass-panel mt-12 mx-4 md:mx-8 rounded-2xl mb-12"
      >
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 justify-center md:justify-start group cursor-default">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Products you'll love</h4>
              <p className="text-sm text-gray-600 font-medium">The right materials at great prices</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start group cursor-default">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Free Design Maker</h4>
              <p className="text-sm text-gray-600 font-medium">Get your custom carving in minutes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start group cursor-default">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 shadow-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">Help when you need it</h4>
              <p className="text-sm text-gray-600 font-medium">Live chat with us or take a tour</p>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Our Process Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto w-full">
        <MotionH2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 drop-shadow-sm"
        >
          The VistaCarve Process
        </MotionH2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[50%] left-10 right-10 h-[2px] bg-gradient-to-r from-primary via-accent to-[#f59e0b] -z-10 transform -translate-y-1/2 rounded-full opacity-60"></div>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center cursor-default"
          >
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md z-10">1</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Upload Your Design</h3>
            <p className="text-gray-700 font-medium text-sm">Send us your image, logo, or text. Our design maker helps you position it perfectly on the material of your choice.</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center md:translate-y-8 cursor-default"
          >
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md z-10">2</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">We Carve It</h3>
            <p className="text-gray-700 font-medium text-sm">Our modern, state-of-the-art precision tools expertly carve your design into premium wood, authentic stone, or sleek metal.</p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center text-center cursor-default"
          >
            <div className="w-16 h-16 rounded-full bg-[#f59e0b] text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-md z-10">3</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Shipped to You</h3>
            <p className="text-gray-700 font-medium text-sm">Carefully packaged and shipped quickly right to your door. Enjoy your stunning, one-of-a-kind custom piece forever!</p>
          </MotionDiv>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-sm">Master Craftsmanship Meets Modern Technology</h2>
            <p className="text-gray-800 mb-8 text-lg font-medium leading-relaxed">
              At VistaCarve, we don't just produce items; we create heirlooms. Our unique blend of laser-precision technology and traditional artisan finishing ensures every piece is distinct, durable, and breathtakingly beautiful.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 text-blue-400 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">Premium Sustainable Materials</h4>
                  <p className="text-gray-700 text-sm font-medium">We source only the finest, ethically harvested wood and natural stone top-tier quality that lasts generations.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/50 text-green-400 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">Lightning Fast Turnaround</h4>
                  <p className="text-gray-700 text-sm font-medium">Most custom orders are carved, finished, and shipped within 48 hours of you approving the design proof.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/50 text-[#f59e0b] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-lg mb-1">100% Satisfaction Guarantee</h4>
                  <p className="text-gray-700 text-sm font-medium">If you aren't completely thrilled with your masterpiece, our dedicated support team will make it right, whatever it takes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
            <Image src="/images/wood_carvings.png" alt="Craftsmanship" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-panel p-4 rounded-xl border border-white/20">
                <p className="text-black font-serif text-lg italic text-center">"Every carve tells a story. Let us help you tell yours."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 glass-panel mt-16 mb-8 w-full border-y border-white/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 drop-shadow-sm">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex text-[#fbbf24] mb-6 text-xl">
                ★★★★★
              </div>
              <p className="text-gray-800 italic mb-8 leading-relaxed font-medium">"The wood sign we ordered for our cabin exceeded all expectations. The detail and depth of the carve are simply stunning. Highly recommended!"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-white border border-white/20">JD</div>
                <div>
                  <h4 className="font-bold text-gray-900">John D.</h4>
                  <p className="text-blue-600 text-xs font-bold">Custom Wood Sign</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <div className="flex text-[#fbbf24] mb-6 text-xl">
                ★★★★★
              </div>
              <p className="text-gray-800 italic mb-8 leading-relaxed font-medium">"Got a metal engraving for my husband's anniversary gift. It looks so premium and came exactly like the preview. Will definitely be ordering again."</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-white border border-white/20">SM</div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah M.</h4>
                  <p className="text-green-600 text-xs font-bold">Metal Engraving</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl lg:transform lg:-translate-y-6">
              <div className="flex text-[#fbbf24] mb-6 text-xl">
                ★★★★★
              </div>
              <p className="text-gray-800 italic mb-8 leading-relaxed font-medium">"The marble photo plaque is breathtaking. It's a heavy, beautiful piece that sits perfectly on our mantle. Customer service was also top-notch when I needed help."</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-[#f59e0b] flex items-center justify-center font-bold text-white border border-white/20">TR</div>
                <div>
                  <h4 className="font-bold text-gray-900">Tommy R.</h4>
                  <p className="text-orange-600 text-xs font-bold">Stone & Marble</p>
                </div>
              </div>
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
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 concept-wrapper"
        >

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

        </MotionDiv>

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

      {/* FAQ Section */}
      <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto w-full mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900 drop-shadow-sm">Frequently Asked Questions</h2>
        <p className="text-center text-gray-700 font-medium mb-12">Have a question? We're here to help.</p>

        <div className="space-y-4">
          <div className="glass-card p-6 rounded-2xl group hover:border-blue-500/50 transition-all cursor-pointer">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex justify-between items-center">
              What file types do you accept for custom designs?
              <span className="text-primary text-2xl group-hover:rotate-180 transition-transform duration-300">ꜜ</span>
            </h3>
            <p className="text-gray-700 font-medium mt-3 border-t border-black/5 pt-3">
              We highly recommend high-resolution PNG, JPG, or SVG files. For the sharpest laser engraving, pure black-and-white vector files (SVG, EPS, AI) produce the best results, but our design maker easily works with standard image files too!
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl group hover:border-blue-500/50 transition-all cursor-pointer">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex justify-between items-center">
              Can I see a proof before my item is carved?
              <span className="text-primary text-2xl group-hover:rotate-180 transition-transform duration-300">ꜜ</span>
            </h3>
            <p className="text-gray-700 font-medium mt-3 border-t border-black/5 pt-3">
              Absolutely! Our online design maker gives you an interactive, real-time 3D preview of what your finished piece will look like. For deeply custom orders or corporate batches, our design team will manually email you a final digital proof for approval.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl group hover:border-blue-500/50 transition-all cursor-pointer">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex justify-between items-center">
              Do you offer bulk discounts for corporate gifts or weddings?
              <span className="text-primary text-2xl group-hover:rotate-180 transition-transform duration-300">ꜜ</span>
            </h3>
            <p className="text-gray-700 font-medium mt-3 border-t border-black/5 pt-3">
              Yes, we do! We have robust reseller and corporate pricing programs tailored for large-volume orders. Please visit our "Corporate Pricing" page from the top navigation menu or chat with us for a custom quote.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl group hover:border-blue-500/50 transition-all cursor-pointer">
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex justify-between items-center">
              Is the wood you use responsibly sourced?
              <span className="text-primary text-2xl group-hover:rotate-180 transition-transform duration-300">ꜜ</span>
            </h3>
            <p className="text-gray-700 font-medium mt-3 border-t border-black/5 pt-3">
              We take sustainability seriously. All of our wood blocks and plaques are sourced from FSC-certified forests, ensuring that every piece we carve supports responsible forestry practices and environmental conservation.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
