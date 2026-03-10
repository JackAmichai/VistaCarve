"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";

interface VariantSelectorProps {
    productId: string;
    productOptions: any[];
    price: string;
}

export default function VariantSelector({ productId, productOptions, price }: VariantSelectorProps) {
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const [quantity, setQuantity] = useState(1);
    const { addToCart, isLoading, setIsOpen } = useCartStore();
    const [justAdded, setJustAdded] = useState(false);

    // Auto-select first option for each category
    if (Object.keys(selectedOptions).length === 0 && productOptions?.length > 0) {
        const defaultOpts: Record<string, string> = {};
        productOptions.forEach(opt => {
            if (opt.choices?.length > 0) {
                defaultOpts[opt.name] = opt.choices[0].description;
            }
        });
        setSelectedOptions(defaultOpts);
    }

    const handleOptionSelect = (optionName: string, choiceDesc: string) => {
        setSelectedOptions(prev => ({ ...prev, [optionName]: choiceDesc }));
    };

    const handleAddToCart = async () => {
        // Note: To strictly pass options to Wix Ecom, we'd need to resolve the variant ID 
        // or pass options explicitly if configured in the Wix backend. 
        // For this demonstration, we add the base product ID and quantity.
        await addToCart(productId, quantity);
        setJustAdded(true);
        setTimeout(() => {
            setJustAdded(false);
            setIsOpen(true);
        }, 1500);
    };

    return (
        <div className="space-y-8 mt-6">
            <div className="text-3xl font-bold text-gray-900">{price}</div>

            {productOptions?.map((option) => (
                <div key={option.name} className="space-y-3">
                    <div className="flex justify-between items-end">
                        <h3 className="font-bold text-sm uppercase tracking-wider text-gray-700">
                            {option.name}
                        </h3>
                        <span className="text-sm font-medium text-blue-600">{selectedOptions[option.name]}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {option.choices?.map((choice: any) => {
                            const isSelected = selectedOptions[option.name] === choice.description;
                            return (
                                <button
                                    key={choice.description}
                                    onClick={() => handleOptionSelect(option.name, choice.description)}
                                    className={`border-2 rounded-md px-6 py-3 text-sm font-semibold transition-all ${isSelected
                                        ? "border-blue-600 text-blue-600 bg-blue-50"
                                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                                        }`}
                                >
                                    {choice.description}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="space-y-3 pt-4 border-t border-gray-100">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-700">Quantity</h3>
                <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-gray-200 rounded-md">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-3 text-gray-500 hover:text-blue-600 transition-colors"
                            disabled={quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-3 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* VistaPrint Style Customization Buttons */}
            <div className="space-y-3 pt-6">
                <button
                    className="w-full flex items-center justify-center gap-2 bg-[#67c2f0] hover:bg-[#56b0db] text-gray-900 font-bold py-4 rounded-md transition-colors border border-[#5ab7e6]"
                >
                    Browse our templates
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </button>
                <button
                    className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-300 hover:border-gray-800 font-bold py-4 rounded-md transition-colors shadow-sm"
                >
                    Upload your design
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </button>
            </div>

            <div className="pt-6">
                <button
                    onClick={handleAddToCart}
                    disabled={isLoading || justAdded}
                    className="magical-btn w-full md:w-auto min-w-[280px] h-16 disabled:opacity-50"
                >
                    <span className="btn-icons"></span>
                    <span className="btn-text flex items-center justify-center gap-2">
                        {isLoading ? (
                            "Adding..."
                        ) : justAdded ? (
                            <><Check className="w-5 h-5" /> Added to Cart</>
                        ) : (
                            <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                        )}
                    </span>
                </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mt-6 flex gap-4 text-sm text-gray-600 items-start">
                <div className="mt-0.5">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p><strong>VistaCarve Premium Guarantee:</strong> Every item is carved to order. We review your design before carving and ensure 100% satisfaction.</p>
            </div>
        </div>
    );
}
