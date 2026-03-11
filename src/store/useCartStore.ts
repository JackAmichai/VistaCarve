import { create } from "zustand";
import wixClient from "@/lib/wixClient";

import Cookies from "js-cookie";

interface CartState {
    cart: any | null;
    isLoading: boolean;
    isOpen: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    setIsOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: null,
    isLoading: false,
    isOpen: false,
    error: null,

    fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
            const current = await wixClient.currentCart.getCurrentCart();
            set({ cart: current, isLoading: false });
        } catch (err: any) {
            console.error("Failed to fetch cart", err);

            // If the error is an Auth error (400 Bad Request) due to invalid session cookie,
            // clear the session cookie and reload to spawn a fresh visitor session.
            // Note: Wix SDK sometimes wraps 400 errors in a generic "System error occurred" exception message.
            const errMsg = err.message?.toLowerCase() || "";
            if (typeof window !== "undefined" && (errMsg.includes("400") || errMsg.includes("bad request") || err.details?.applicationError?.code === 400 || errMsg.includes("system error occurred"))) {
                console.warn("Detected auth/system error. Clearing invalid session cookie...");
                Cookies.remove("session");
                window.location.reload();
                return;
            }

            // For a fresh session, fetching cart might return 404 until cart is created
            set({ error: err.message || "Failed to fetch cart", isLoading: false });
        }
    },

    addToCart: async (productId: string, quantity: number) => {
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
            console.error("Failed to add to cart", err);
            set({ error: err.message || "Failed to add to cart", isLoading: false });
        }
    },

    setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
