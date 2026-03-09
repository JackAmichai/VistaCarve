"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Folder, Menu, MessageCircleQuestion } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import CartDrawer from "../cart/CartDrawer";

const categories = [
    "Websites",
    "Wood Carvings",
    "Metal Engravings",
    "Stone Carvings",
    "Corporate Gifts",
    "Wedding Decor",
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
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Custom VistaCarve Icon/Logo */}
                        <div className="relative w-10 h-10 group-hover:scale-110 transition-transform flex items-center">
                            <Image
                                src="/images/logo.png"
                                alt="VistaCarve Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        {/* Text Lockup: VistaCarve x Wix */}
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold tracking-tight text-gray-900 font-serif">VistaCarve</span>
                            <span className="text-sm font-medium text-gray-400">x</span>
                            {/* Simple Wix Logo SVG */}
                            <svg className="h-4 w-auto text-black fill-current" viewBox="0 0 76 29" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.833 28.5L34.167 0h9.333l4.667 15.667L52.833 0h8.667l4.667 15.667L70.833 0h5l-9.667 28.5h-9L52.5 13.167 47.833 28.5h-4z" />
                                <circle cx="21" cy="4" r="4" />
                                <path d="M16 9h10v19.5H16z" />
                                <path d="M10 9L7.5 28.5H5L2.5 9H0v-1h10v1z" fill="none" />
                                {/* Simplistic W */}
                                <path d="M0 9h5.5l2.5 13L10.5 9h5v19.5H10v-13l-2.5 13h-4L1 9.5V28.5H0V9z" />
                            </svg>
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
