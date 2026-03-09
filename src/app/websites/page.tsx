import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WebsitesLandingPage() {
    return (
        <div className="flex-1 w-full flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full bg-[#1C2024] text-white py-20 md:py-32 px-4 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none mix-blend-overlay">
                    <div className="w-full h-full bg-gradient-to-l from-blue-400 to-transparent"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-4">
                        <span>VistaCarve</span>
                        <span className="text-gray-400">×</span>
                        <span className="font-bold">Wix</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                        Create a stunning website for your business.
                    </h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Design, manage, and grow your online presence. Get a professional website fully integrated with your VistaCarve custom products. Powered entirely by Wix.
                    </p>

                    <div className="pt-8">
                        <Link href="/websites/create">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold px-10 h-16 text-lg transition-all scale-100 hover:scale-105 shadow-xl">
                                Start Building Your Website
                            </Button>
                        </Link>
                        <p className="mt-4 text-sm text-gray-400">No credit card required • Connect custom domains</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4 max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 -rotate-3"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Drag & Drop Editor</h3>
                        <p className="text-gray-600">The intuitive Wix Editor gives you total creative freedom. Customize every pixel without knowing how to code.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 rotate-3"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Built-in E-Commerce</h3>
                        <p className="text-gray-600">Sell your custom carvings directly. Integrated with Wix Stores, providing secure checkout and global shipping.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 -rotate-3"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">SEO & Marketing</h3>
                        <p className="text-gray-600">Get found on Google and grow your audience with enterprise-grade SEO and marketing tools included.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
