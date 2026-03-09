import { create } from "zustand";
import wixClient from "@/lib/wixClient";

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
