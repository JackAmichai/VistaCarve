import { create } from "zustand";
import wixClient from "@/lib/wixClient";

import Cookies from "js-cookie";

interface CartState {
    cart: any | null;
    isLoading: boolean;
    isOpen: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    addToCart: (productId: string, quantity: number, options?: { name?: string, price?: string, image?: string }) => Promise<void>;
    setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: null,
    isLoading: false,
    isOpen: false,
    error: null,

    fetchCart: async () => {
        // Guard: only fetch if Wix is actually configured
        const isConfigured = !!(process.env.NEXT_PUBLIC_WIX_APP_ID && process.env.NEXT_PUBLIC_SITE_ID);
        
        if (!isConfigured) {
            set({ cart: { lineItems: [] }, isLoading: false });
            return;
        }

        set({ isLoading: true, error: null });
        try {
            const current = await wixClient.currentCart.getCurrentCart();
            set({ cart: current, isLoading: false });
        } catch (err: any) {
            console.warn("Wix fetchCart failed, likely missing proper credentials or session:", err?.message || err);
            
            // Fallback to empty cart for PoC demonstration
            set({ cart: { lineItems: [] }, isLoading: false });

            const errMsg = err.message?.toLowerCase() || "";
            if (typeof window !== "undefined" && (errMsg.includes("400") || errMsg.includes("bad request") || err.details?.applicationError?.code === 400 || errMsg.includes("system error occurred"))) {
                const prevSession = Cookies.get("session");
                if (prevSession) {
                    console.warn("Detected auth/system error. Clearing invalid session cookie...");
                    Cookies.remove("session");
                    window.location.reload();
                    return;
                }
            }
        }
    },

    addToCart: async (productId: string, quantity: number, options?: { name?: string, price?: string, image?: string }) => {
        set({ isLoading: true, error: null });
        try {
            // Assuming catalogReference app ID is global for Wix Stores
            const response = await wixClient.currentCart.addToCurrentCart({
                lineItems: [
                    {
                        catalogReference: {
                            appId: "1380b703-ce81-ff05-f115-39571d94dfcd",
                            catalogItemId: productId,
                        },
                        quantity,
                    },
                ],
            });
            set({ cart: response.cart, isLoading: false, isOpen: true });
        } catch (err: any) {
            console.warn("Wix AddToCart failed, applying mock fallback:", err);
            
            // MOCK FALLBACK for UI Demonstration
            set((state: any) => {
                const existingCart = state.cart || { _id: "mock-cart", lineItems: [] };
                
                const mockLineItem = {
                    _id: Math.random().toString(36).substring(7),
                    productName: { original: options?.name || "Premium Custom Carving" },
                    quantity,
                    price: { amount: options?.price?.replace(/[^0-9.]/g, '') || "49.99", formattedAmount: options?.price || "$49.99" },
                    image: options?.image || "/images/new_logo.png" 
                };

                return {
                    cart: {
                        ...existingCart,
                        lineItems: [...existingCart.lineItems, mockLineItem]
                    },
                    isLoading: false,
                    isOpen: true,
                    error: null
                };
            });
        }
    },

    setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
