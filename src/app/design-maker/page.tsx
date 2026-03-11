"use client";

import Link from "next/link";
import { Paintbrush, Image as ImageIcon, Type, Download, ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function DesignMakerPage() {
    const [activeTool, setActiveTool] = useState<"uploads" | "text" | "clipart">("uploads");
    const [selectedMaterial, setSelectedMaterial] = useState<"oak" | "aluminum" | "marble">("oak");
    const [zoomLevel, setZoomLevel] = useState(100);
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const materials = {
        oak: { name: "Premium Oak", color: "#8b5a2b", texture: "/images/dark_wood_texture.png", price: 89 },
        aluminum: { name: "Brushed Aluminum", color: "#a9a9a9", texture: "", price: 129 },
        marble: { name: "Black Marble", color: "#1a1a1a", texture: "", price: 199 },
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    };

    const handleCheckout = () => {
        alert("Preparing your custom design for checkout... Redirecting to secure payment.");
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white flex flex-col">
            {/* Header / Sub-navigation for Design Maker */}
            <div className="border-b border-white/10 bg-black/40 backdrop-blur sticky top-0 md:top-[73px] z-40 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
                        <span>← Back</span>
                    </Link>
                    <div className="h-4 w-px bg-white/20"></div>
                    <h1 className="text-xl font-bold font-serif tracking-wide hidden sm:block">VistaCarve Studio</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        variant="outline" 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="border-white/20 text-white hover:bg-white/10 hidden sm:flex gap-2 min-w-[120px]"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        {isSaving ? "Saving..." : isSuccess ? "Saved!" : "Save Draft"}
                    </Button>
                    <Button onClick={handleCheckout} className="bg-primary hover:bg-blue-600 font-bold gap-2">
                        <span>Checkout</span> <ShoppingCart className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex-1 flex flex-col md:flex-row h-full md:h-[calc(100vh-130px)] overflow-hidden">
                {/* Left Sidebar Toolbar */}
                <div className="w-full md:w-20 lg:w-64 bg-black/60 border-r border-white/10 flex md:flex-col overflow-y-auto shrink-0">
                    {/* Tool Icons (Mobile Row, Desktop Column) */}
                    <div className="flex md:flex-col gap-2 p-2 w-full md:w-auto overflow-x-auto md:overflow-visible sticky top-0 bg-black/60 z-10">
                        <button 
                            onClick={() => setActiveTool("uploads")}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl gap-2 shrink-0 md:w-full transition-all ${activeTool === "uploads" ? "bg-primary/20 text-primary border border-primary/50" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
                        >
                            <ImageIcon className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">Uploads</span>
                        </button>
                        <button 
                            onClick={() => setActiveTool("text")}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl gap-2 shrink-0 md:w-full transition-all ${activeTool === "text" ? "bg-primary/20 text-primary border border-primary/50" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
                        >
                            <Type className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">Text</span>
                        </button>
                        <button 
                            onClick={() => setActiveTool("clipart")}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl gap-2 shrink-0 md:w-full transition-all ${activeTool === "clipart" ? "bg-primary/20 text-primary border border-primary/50" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
                        >
                            <Paintbrush className="w-6 h-6" />
                            <span className="text-[10px] font-bold uppercase tracking-wider hidden lg:block">Clipart</span>
                        </button>
                    </div>

                    {/* Tool Content Panel (Desktop Only) */}
                    <div className="hidden lg:block p-4 flex-1">
                        <h3 className="text-sm font-bold text-white mb-4 capitalize">{activeTool}</h3>
                        
                        {activeTool === "uploads" && (
                            <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 hover:border-primary/50 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                                </div>
                                <p className="text-sm font-medium text-white">Click or drag image here</p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG up to 50MB</p>
                            </div>
                        )}

                        {(activeTool === "text" || activeTool === "clipart") && (
                            <div className="text-center py-8">
                                <p className="text-sm text-gray-500 italic">Select from our library or add custom content here.</p>
                                <Button variant="outline" size="sm" className="mt-4 border-white/10 hover:bg-white/5">
                                    Add {activeTool === "text" ? "Headline" : "Element"}
                                </Button>
                            </div>
                        )}

                        <h3 className="text-sm font-bold text-white mt-8 mb-4">Material Base</h3>
                        <div className="space-y-2">
                            {(Object.keys(materials) as Array<keyof typeof materials>).map((id) => (
                                <div 
                                    key={id}
                                    onClick={() => setSelectedMaterial(id)}
                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${selectedMaterial === id ? "bg-primary/20 border-primary/50 shadow-lg" : "hover:bg-white/5 border-transparent hover:border-white/10"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded shrink-0 shadow-inner" style={{ backgroundColor: materials[id].color }}></div>
                                        <span className={`text-sm font-medium ${selectedMaterial === id ? "text-white" : "text-gray-400"}`}>{materials[id].name}</span>
                                    </div>
                                    {selectedMaterial === id && <Check className="w-4 h-4 text-primary" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Central Canvas Area */}
                <div className="flex-1 bg-black/40 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Grid Pattern Background */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                    {/* The "Canvas" */}
                    <div 
                        className="relative z-10 w-full max-w-2xl aspect-square md:aspect-video rounded-md shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden border border-white/10 transition-all duration-700 ease-in-out"
                        style={{ 
                            backgroundColor: materials[selectedMaterial].color,
                            transform: `scale(${zoomLevel / 100})`
                        }}
                    >
                        {/* Material texture overlay */}
                        {materials[selectedMaterial].texture && (
                            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: `url(${materials[selectedMaterial].texture})`, backgroundSize: 'cover' }}></div>
                        )}
                        
                        {/* Subtle highlight gradient for 3D effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

                        {/* Design Element */}
                        <div className="p-8 border-2 border-dashed border-blue-400/50 bg-blue-500/10 rounded-lg backdrop-blur-sm cursor-move hover:bg-blue-500/20 transition-colors flex items-center justify-center group relative shadow-xl">
                            <div className="text-center group-hover:scale-105 transition-transform duration-300">
                                <div className="w-16 h-16 rounded-full border-4 border-white/80 mx-auto mb-4 scale-90 group-hover:scale-100 transition-transform flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-white/40" />
                                </div>
                                <span className="text-white/90 font-bold text-xl uppercase tracking-widest block font-serif">VistaCarve</span>
                                <span className="text-white/60 text-xs italic mt-1 block">Vector Engraving Enabled</span>
                            </div>

                            {/* Bounding box controls */}
                            <div className="absolute top-0 left-0 w-3 h-3 bg-white border border-blue-500 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block cursor-nwse-resize"></div>
                            <div className="absolute top-0 right-0 w-3 h-3 bg-white border border-blue-500 translate-x-1/2 -translate-y-1/2 hidden group-hover:block cursor-nesw-resize"></div>
                            <div className="absolute bottom-0 left-0 w-3 h-3 bg-white border border-blue-500 -translate-x-1/2 translate-y-1/2 hidden group-hover:block cursor-nesw-resize"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-white border border-blue-500 translate-x-1/2 translate-y-1/2 hidden group-hover:block cursor-nwse-resize"></div>
                        </div>
                    </div>

                    {/* Canvas Controls */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-panel rounded-full px-4 py-2 z-20 border border-white/10 shadow-2xl">
                        <button 
                            onClick={() => setZoomLevel(prev => Math.max(50, prev - 10))}
                            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors font-bold text-xl"
                        >
                            -
                        </button>
                        <span className="text-sm font-bold w-16 text-center text-white">{zoomLevel}%</span>
                        <button 
                            onClick={() => setZoomLevel(prev => Math.min(200, prev + 10))}
                            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors font-bold text-xl"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Right Sidebar Details (Desktop Only) */}
                <div className="hidden xl:flex w-80 bg-black/60 border-l border-white/10 flex-col p-6 overflow-y-auto shrink-0">
                    <h2 className="text-xl font-bold text-white mb-6 font-serif">Order Details</h2>

                    <div className="space-y-6">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2">Selected Product</p>
                            <p className="font-bold text-white text-lg">{materials[selectedMaterial].name} Block</p>
                            <p className="text-xs text-gray-500 mt-1 italic">12" x 12" x 1.5" Carving Base</p>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">Production Time</p>
                            <div className="flex items-center gap-3 bg-accent/10 border border-accent/20 p-3 rounded-lg">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                <p className="font-bold text-accent text-xs">SHIPS WITHIN 48 HOURS</p>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-4 mt-6">
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-400 text-sm">Base Material</span>
                                <span className="text-white font-medium">${materials[selectedMaterial].price}.00</span>
                            </div>
                            <div className="flex justify-between mb-3">
                                <span className="text-gray-400 text-sm">Deep Engraving</span>
                                <span className="text-white font-medium">$30.00</span>
                            </div>
                            <div className="flex justify-between font-extrabold text-2xl mt-4 pt-4 border-t border-white/10 text-primary">
                                <span className="text-white">Total</span>
                                <span className="text-primary">${materials[selectedMaterial].price + 30}.00</span>
                            </div>
                        </div>

                        <Button 
                            onClick={handleCheckout}
                            className="w-full bg-primary hover:bg-blue-600 font-extrabold py-8 text-xl mt-4 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-[1.02] transition-all"
                        >
                            Finalize Design
                        </Button>
                        <p className="text-[10px] text-center text-gray-500 mt-4 leading-relaxed uppercase tracking-wider">
                            Personalized items are non-refundable.<br/>Proof review required at checkout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
