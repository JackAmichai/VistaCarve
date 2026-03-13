import { getPortfolioItems } from "@/lib/wixData";
import { ImageIcon, Maximize2, Layers } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

export default async function PortfolioPage() {
    const portfolioItems = await getPortfolioItems();
    let error = null;

    // Extract unique categories for filter UI (mock functionality for demo)
    const categories = Array.from(new Set(portfolioItems.map(item => item.data?.category).filter(Boolean)));

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gray-50 py-24 px-4 text-center border-b border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <Layers className="w-12 h-12 mx-auto mb-6 text-gray-400" />
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight">Our Portfolio</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        A curated gallery of our finest custom carvings and engravings. Powered dynamically by Wix CMS.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-[1400px] mx-auto px-4 py-20">
                {error && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-12 max-w-3xl mx-auto text-center shadow-sm">
                        <p className="font-medium">Displaying mock gallery. To see live data, create a "Portfolio" collection in your Wix CMS Dashboard.</p>
                        <p className="text-sm opacity-80 mt-1">{error}</p>
                    </div>
                )}

                {/* Filters (Visual only for demo) */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                    <button className="px-6 py-2 rounded-full bg-gray-900 text-white font-semibold text-sm transition-transform hover:scale-105">
                        All Works
                    </button>
                    {categories.map((cat: any) => (
                        <button key={cat} className="px-6 py-2 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm hover:bg-gray-200 transition-colors">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {portfolioItems.map((item, index) => (
                        <div
                            key={item._id}
                            className={`group cursor-pointer ${index % 3 === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                        >
                            <div className={`relative w-full overflow-hidden bg-gray-100 rounded-3xl ${index % 3 === 0 ? 'aspect-[21/9]' : 'aspect-square md:aspect-[4/3]'}`}>
                                {item.data?.image ? (
                                    <img
                                        src={item.data.image.startsWith('wix:image') ? 'https://static.wixstatic.com/media/' + item.data.image.split('/')[3] : item.data.image}
                                        alt={item.data.title}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                                        <span>No Media</span>
                                    </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                                        <Maximize2 className="w-6 h-6" />
                                    </div>
                                </div>

                                {/* Category Badge */}
                                {item.data?.category && (
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-gray-900 shadow-lg">
                                        {item.data.category}
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 md:px-4">
                                <h3 className="text-2xl font-bold font-serif text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{item.data?.title || "Untitled Work"}</h3>
                                <p className="text-gray-500 leading-relaxed max-w-2xl">{item.data?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-900 text-white py-24 text-center px-4">
                <h2 className="text-4xl font-serif font-bold mb-6">Inspired by our work?</h2>
                <p className="text-gray-400 mb-10 max-w-xl mx-auto">Bring your own vision to life. Book a consultation with our design team today.</p>
                <a href="/consultation" className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-transform hover:scale-105">
                    Start Your Project
                </a>
            </div>
        </div>
    );
}
