import Link from "next/link";
import { Paintbrush, Image as ImageIcon, Type, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DesignMakerPage() {
    return (
        <div className="min-h-screen bg-background text-white flex flex-col">
            {/* Header / Sub-navigation for Design Maker */}
            <div className="border-b border-white/10 bg-black/40 backdrop-blur top-[73px] z-40 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                        <span>← Back</span>
                    </Link>
                    <div className="h-4 w-px bg-white/20"></div>
                    <h1 className="text-xl font-bold font-serif tracking-wide hidden sm:block">VistaCarve Studio</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hidden sm:flex gap-2">
                        <Download className="w-4 h-4" /> Save Draft
                    </Button>
                    <Button className="bg-primary hover:bg-blue-600 font-bold gap-2">
                        <span>Checkout</span> <ShoppingCart className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-130px)]">
                {/* Left Sidebar Toolbar */}
                <div className="w-full md:w-20 lg:w-64 bg-black/60 border-r border-white/10 flex md:flex-col overflow-y-auto">
                    {/* Tool Icons (Mobile Row, Desktop Column) */}
                    <div className="flex md:flex-col gap-2 p-2 w-full md:w-auto overflow-x-auto md:overflow-visible">
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 text-primary border border-primary/50 gap-2 shrink-0 md:w-full hover:bg-white/20 transition-all">
                            <ImageIcon className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">Uploads</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white gap-2 shrink-0 md:w-full transition-all">
                            <Type className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">Text</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white gap-2 shrink-0 md:w-full transition-all">
                            <Paintbrush className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">Clipart</span>
                        </button>
                    </div>

                    {/* Tool Content Panel (Desktop Only) */}
                    <div className="hidden lg:block p-4 flex-1">
                        <h3 className="text-sm font-bold text-white mb-4">Upload Design</h3>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 hover:border-primary/50 transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                            </div>
                            <p className="text-sm font-medium text-white">Click or drag image here</p>
                            <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG up to 50MB</p>
                        </div>

                        <h3 className="text-sm font-bold text-white mt-8 mb-4">Material Base</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/20 border border-primary/50 cursor-pointer">
                                <div className="w-8 h-8 rounded shrink-0 bg-[#8b5a2b] shadow-inner"></div>
                                <span className="text-sm font-medium text-white">Premium Oak</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all">
                                <div className="w-8 h-8 rounded shrink-0 bg-[#a9a9a9] shadow-inner"></div>
                                <span className="text-sm font-medium text-gray-300">Brushed Aluminum</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all">
                                <div className="w-8 h-8 rounded shrink-0 bg-[#1a1a1a] shadow-inner"></div>
                                <span className="text-sm font-medium text-gray-300">Black Marble</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Central Canvas Area */}
                <div className="flex-1 bg-black/20 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                    {/* The "Canvas" */}
                    <div className="relative z-10 w-full max-w-2xl aspect-square md:aspect-video bg-[#8b5a2b] rounded-md shadow-2xl flex items-center justify-center overflow-hidden border border-white/10">
                        {/* Fake wood texture overlay */}
                        <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url(/images/dark_wood_texture.png)', backgroundSize: 'cover' }}></div>

                        {/* Placeholder Design Element */}
                        <div className="p-8 border-2 border-dashed border-blue-400/50 bg-blue-500/10 rounded-lg backdrop-blur-sm cursor-move hover:bg-blue-500/20 transition-colors flex items-center justify-center group">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full border-4 border-white/80 mx-auto mb-4 scale-90 group-hover:scale-100 transition-transform"></div>
                                <span className="text-white/80 font-bold text-xl uppercase tracking-widest block font-serif">Your Logo</span>
                                <span className="text-white/60 text-sm italic mt-1 block">Vector paths recognized</span>
                            </div>

                            {/* Bounding box controls */}
                            <div className="absolute top-0 left-0 w-3 h-3 bg-white border border-blue-500 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block cursor-nwse-resize"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-white border border-blue-500 translate-x-1/2 -translate-y-1/2 hidden group-hover:block cursor-nesw-resize"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 bg-white border border-blue-500 -translate-x-1/2 translate-y-1/2 hidden group-hover:block cursor-nesw-resize"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-white border border-blue-500 translate-x-1/2 translate-y-1/2 hidden group-hover:block cursor-nwse-resize"></div>
                        </div>
                    </div>

                    {/* Canvas Controls */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-panel rounded-full px-4 py-2 z-20">
                        <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors font-bold text-lg">-</button>
                        <span className="text-sm font-medium w-12 text-center text-white">100%</span>
                        <button className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors font-bold text-lg">+</button>
                    </div>
                </div>

                {/* Right Sidebar Details (Desktop Only) */}
                <div className="hidden xl:flex w-80 bg-black/60 border-l border-white/10 flex-col p-6 overflow-y-auto">
                    <h2 className="text-xl font-bold text-white mb-6">Order Details</h2>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Product</p>
                            <p className="font-medium text-white">Premium Oak Carving Block</p>
                            <p className="text-xs text-gray-500 mt-1">12" x 12" x 1.5"</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-400 mb-1">Estimated Turnaround</p>
                            <p className="font-medium text-[#fbbf24] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#fbbf24]"></span>
                                Ships within 48 hours
                            </p>
                        </div>

                        <div className="border-t border-white/10 pt-4 mt-6">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400 text-sm">Base Price</span>
                                <span className="text-white">$89.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400 text-sm">Custom Engraving</span>
                                <span className="text-white">$30.00</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-white/10">
                                <span className="text-white">Total</span>
                                <span className="text-white">$119.00</span>
                            </div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-blue-600 font-bold py-6 text-lg mt-4 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            Finalize Design
                        </Button>
                        <p className="text-xs text-center text-gray-500 mt-3">You will review a final proof before billing occurs.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
