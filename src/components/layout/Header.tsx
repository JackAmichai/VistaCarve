"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Folder, Heart, Menu, MessageCircleQuestion } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import CartDrawer from "../cart/CartDrawer";

const categories = [
    "Websites",
    "Wood Carvings",
    "Metal Engravings",
    "Stone Carvings",
    "Corporate Gifts",
    "Custom Signage",
];

export default function Header() {
    const { cart, fetchCart, setIsOpen } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchCart();
    }, [fetchCart]);

    const itemCount = cart?.lineItems?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm transition-all">
            {/* Top utility bar */}
            <div className="bg-gray-100 py-1.5 px-4 md:px-8 text-xs text-gray-600 flex justify-between items-center hidden md:flex">
                <span>Welcome to VistaCarve - Premium Custom Details</span>
                <div className="flex gap-4">
                    <Link href="/help" className="hover:underline flex items-center gap-1">
                        Help is here 1.800.123.4567
                    </Link>
                    <Link href="/reseller" className="hover:underline border-l border-gray-300 pl-4">
                        Corporate Pricing
                    </Link>
                    <Link href="/reseller" className="hover:underline border-l border-gray-300 pl-4">
                        Reseller Program
                    </Link>
                </div>
            </div>

            {/* Main header row */}
            <div className="py-4 px-4 md:px-8 flex items-center justify-between gap-6 relative">
                <div className="flex items-center gap-4">
                    <Menu className="w-6 h-6 md:hidden text-gray-700 cursor-pointer" />
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* VistaCarve Logo */}
                        <div className="flex items-end">
                            <svg viewBox="0 0 100 100" className="w-8 h-8 text-blue-600 fill-current group-hover:scale-105 transition-transform"><path d="M50 0 L100 50 L50 100 L0 50 Z" /></svg>
                            <span className="text-2xl font-bold tracking-tight text-gray-900 ml-2 font-serif -mb-1">vistacarve.</span>
                        </div>
                    </Link>
                </div>

                {/* Search Bar - Hidden on small mobile */}
                <div className="hidden md:flex flex-1 max-w-2xl relative group">
                    <input
                        type="text"
                        placeholder="Search custom products..."
                        className="w-full border border-gray-400 rounded-full py-2.5 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-500 font-medium text-sm"
                    />
                    <button className="absolute right-2 top-1.5 p-1 text-gray-600 hover:text-blue-600 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3 md:gap-5">
                    <div className="hidden lg:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                        <MessageCircleQuestion className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Help</span>
                    </div>
                    <div className="hidden lg:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                        <Folder className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Projects</span>
                    </div>
                    <div className="hidden md:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                        <User className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Sign In</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors relative group"
                        aria-label="Open Cart"
                    >
                        <div className="relative">
                            <ShoppingCart className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-600" />
                            {mounted && itemCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider hidden md:inline">Cart</span>
                    </button>
                </div>
            </div>

            {/* Category Navigation */}
            <nav className="border-t border-gray-100 hidden md:block px-8 py-0">
                <ul className="flex items-center justify-start gap-8 overflow-x-auto scroller h-12">
                    {categories.map((cat) => (
                        <li key={cat} className="shrink-0 h-full flex items-center">
                            <Link
                                href={cat === "Websites" ? "/websites" : `/shop/${cat.toLowerCase().replace(" ", "-")}`}
                                className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 border-b-2 border-transparent h-full flex items-center px-1 transition-all"
                            >
                                {cat}
                            </Link>
                        </li>
                    ))}
                    <li className="shrink-0 ml-auto flex items-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer text-sm font-semibold text-red-600">
                        Deals
                    </li>
                </ul>
            </nav>

            {/* Slide-out Cart Drawer */}
            <CartDrawer />
        </header>
    );
}
