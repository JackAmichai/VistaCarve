"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, User, Folder, Menu, MessageCircleQuestion, Paintbrush } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CartDrawer from "../cart/CartDrawer";
import SignInModal from "../auth/SignInModal";

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
    const [searchQuery, setSearchQuery] = useState("");
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const router = useRouter();

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
                    <Link href="/" className="flex items-center gap-4 group">
                        {/* Custom VistaCarve Icon/Logo */}
                        <div className="relative w-16 h-12 group-hover:scale-105 transition-transform flex items-center shrink-0">
                            <Image
                                src="/images/new_logo.png"
                                alt="VistaCarve Logo"
                                fill
                                className="object-contain object-left md:object-center"
                            />
                        </div>
                        {/* Text Lockup: VistaCarve x Wix */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold tracking-tight text-gray-900 font-serif pt-1 hidden sm:block">VistaCarve</span>
                            <span className="text-lg font-medium text-gray-400 px-1 pt-1.5">×</span>
                            <div className="relative w-16 h-8 flex items-center shrink-0 mt-1">
                                <Image
                                    src="/images/wix_logo.png"
                                    alt="Wix Logo"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Search Bar - Hidden on small mobile */}
                <div className="hidden md:flex flex-1 max-w-2xl relative group">
                    <input
                        type="text"
                        placeholder="Search custom products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && searchQuery.trim()) {
                                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                            }
                        }}
                        className="w-full border border-gray-400 text-black bg-white rounded-full py-2.5 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-500 font-medium text-sm"
                    />
                    <button
                        className="absolute right-2 top-1.5 p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        onClick={() => {
                            if (searchQuery.trim()) {
                                router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                            }
                        }}
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3 md:gap-5">
                    <Link href="/design-maker" className="hidden lg:flex flex-col items-center justify-center text-primary hover:text-blue-600 cursor-pointer transition-colors group">
                        <Paintbrush className="w-6 h-6 mb-1 text-primary group-hover:text-blue-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Design Maker</span>
                    </Link>
                    <Link href="/consultation" className="hidden lg:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                        <MessageCircleQuestion className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Consultation</span>
                    </Link>
                    <Link href="/portfolio" className="hidden lg:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                        <Folder className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Portfolio</span>
                    </Link>
                    {mounted && (
                        (() => {
                            let isLoggedIn = false;
                            try {
                                const cookieStr = document.cookie.split('; ').find(row => row.startsWith('session='));
                                if (cookieStr) {
                                    const sessionCookie = decodeURIComponent(cookieStr.split('=')[1]);
                                    const parsedObj = JSON.parse(sessionCookie);
                                    if (parsedObj?.accessToken) isLoggedIn = true;
                                }
                            } catch (e) { }

                            if (isLoggedIn) {
                                return (
                                    <Link href="/account" className="hidden md:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group">
                                        <User className="w-6 h-6 mb-1 text-blue-600 group-hover:text-blue-700" />
                                        <span className="text-[10px] uppercase font-bold tracking-wider">Account</span>
                                    </Link>
                                );
                            }

                            return (
                                <div
                                    onClick={() => setIsSignInModalOpen(true)}
                                    className="hidden md:flex flex-col items-center justify-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors group"
                                >
                                    <User className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-600" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Sign In</span>
                                </div>
                            );
                        })()
                    )}
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

            {/* Auth Modal */}
            <SignInModal
                isOpen={isSignInModalOpen}
                onClose={() => setIsSignInModalOpen(false)}
            />
        </header>
    );
}
