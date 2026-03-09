"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import wixClient from "@/lib/wixClient";

export default function CartDrawer() {
    const { cart, isOpen, setIsOpen, isLoading, fetchCart } = useCartStore();

    const handleRemove = async (itemId: string) => {
        try {
            if (!cart?._id) return;
            await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
            await fetchCart();
        } catch (err) {
            console.error("Failed to remove item", err);
        }
    };

    const handleCheckout = async () => {
        try {
            const checkoutUrl = await wixClient.currentCart.createCheckoutFromCurrentCart({
                channelType: "WEB",
            });
            if (checkoutUrl && checkoutUrl.checkoutId) {
                // Here we'd typically bounce to the Wix headless checkout URL or a custom checkout
                // The Wix SDK doesn't always return a direct URL for Ecom out of the box in basic setup
                // But for redirect, if provided:
                // window.location.href = checkoutUrl...
                alert("Redirecting to checkout session: " + checkoutUrl.checkoutId);
            }
        } catch (err) {
            console.error("Failed to start checkout", err);
            alert("Failed to start checkout. Check integration.");
        }
    };

    const lineItems = cart?.lineItems || [];
    const subtotal = cart?.lineItems?.reduce((acc: number, item: any) => acc + (parseFloat(item.price?.amount || "0") * item.quantity), 0) || 0;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col pt-10 px-0 bg-white">
                <SheetHeader className="px-6 pb-4 border-b">
                    <SheetTitle className="text-2xl font-serif">Your Cart</SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6">
                    {lineItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full mt-24 text-gray-500">
                            <ShoppingBasket className="w-16 h-16 mb-4 text-gray-300" />
                            <p className="text-lg font-medium text-gray-800">Your cart is empty.</p>
                            <p className="mt-1 text-sm text-center">Looks like you haven't added any custom carvings yet.</p>
                            <Button onClick={() => setIsOpen(false)} variant="outline" className="mt-6 rounded-full font-bold px-8">
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="py-6 space-y-6 text-sm">
                            {lineItems.map((item: any) => (
                                <div key={item._id} className="flex gap-4 group">
                                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden relative border flex-shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.productName?.original || "Product"}
                                                fill
                                                className="object-cover mix-blend-multiply"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200"></div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {item.productName?.original}
                                        </h4>
                                        {item.descriptionLines?.map((dl: any, idx: number) => (
                                            <p key={idx} className="text-xs text-gray-500">
                                                {dl.name?.original}: {dl.plainText?.original}
                                            </p>
                                        ))}
                                        <div className="flex items-center justify-between mt-2">
                                            <p className="text-xs font-semibold text-gray-700">Qty: {item.quantity}</p>
                                            <p className="font-bold">${parseFloat(item.price?.amount || "0").toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item._id)}
                                        className="self-center p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 rounded-full"
                                        title="Remove item"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {lineItems.length > 0 && (
                    <div className="border-t p-6 bg-gray-50 mt-auto">
                        <div className="flex justify-between items-center mb-6 text-lg">
                            <span className="font-medium text-gray-700">Subtotal</span>
                            <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <Button
                            className="w-full h-14 rounded-full text-lg font-bold bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-all"
                            onClick={handleCheckout}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Secure Checkout"}
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
