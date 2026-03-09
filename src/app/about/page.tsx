export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl flex-1">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">About VistaCarve</h1>
            <div className="prose prose-lg prose-blue max-w-none space-y-6 text-gray-700">
                <p className="text-xl font-medium text-gray-900 leading-relaxed">
                    At VistaCarve, we believe that every memory, every milestone, and every message deserves to be immortalized in something real. Something you can hold, touch, and pass down.
                </p>
                <p>
                    Founded on the principle that digital just isn't enough, we combine traditional craftsmanship with cutting-edge CNC and laser engraving technology. Whether it's a personalized wooden sign for your new home, a bronze plaque for your business, or a delicate marble carve for a wedding gift, our state-of-the-art facilities ensure millimeter precision and unmatched quality.
                </p>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mt-12 mb-4">Our Commitment to Quality</h2>
                <p>
                    We source only the finest raw materials—from sustainable oak and rich walnut to industry-grade steel. Every piece that leaves our shop is hand-inspected by master carvers to ensure the finish meets our rigorous standards.
                </p>
                <p>
                    Just like our inspiration, we are committed to providing you with the exact product you envisioned, with a 100% satisfaction guarantee. If you need it carved, we carve it.
                </p>
            </div>
        </div>
    );
}
