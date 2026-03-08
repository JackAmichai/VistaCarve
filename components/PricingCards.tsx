"use client";

import { useEffect, useState } from "react";
import { getWixClient } from "@/lib/wixClient";
import { Check, Loader2 } from "lucide-react";

export function PricingCards() {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [checkoutPlanId, setCheckoutPlanId] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const wixClient = getWixClient();
                const response = await (wixClient.plans as any).queryPricingPlans().find();

                // Ensure returning only active/public plans
                const availablePlans = response.items || [];
                // Sort to have the more expensive plan normally on the right or middle
                setPlans(availablePlans.sort((a: any, b: any) => {
                    const priceA = a.pricing?.price?.value || 0;
                    const priceB = b.pricing?.price?.value || 0;
                    return priceA - priceB;
                }));
            } catch (error) {
                console.error("Failed to fetch pricing plans", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handlePlanCheckout = async (plan: any) => {
        setCheckoutPlanId(plan._id);
        try {
            const wixClient = getWixClient();

            // Attempt to create the order according to the PRD
            const order = await (wixClient.plans as any).createOnlineOrder({
                planId: plan._id
            });

            const session = await wixClient.redirects.createRedirectSession({
                callbacks: {
                    postFlowUrl: window.location.origin + "/success",
                },
                // Using order details if necessary or just a generic returnUrl
                // @ts-ignore
                returnUrl: window.location.origin + "/checkout-success",
            });

            // Navigate to the checkout url
            if (session.redirectSession?.fullUrl) {
                window.location.href = session.redirectSession.fullUrl;
            }
        } catch (error) {
            console.error("Failed to create checkout session", error);
        } finally {
            setCheckoutPlanId(null);
        }
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="h-[500px] bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-[2.5rem]"></div>
                <div className="h-[500px] bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-[2.5rem]"></div>
            </div>
        );
    }

    if (plans.length === 0) {
        return (
            <div className="text-center py-20 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700 max-w-3xl mx-auto">
                <p className="text-neutral-500 font-medium">No active retainers found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
                const isPremium = index === plans.length - 1; // Highlight the last/most expensive plan
                const price = plan.pricing?.price?.value;
                const currency = plan.pricing?.price?.currency || "USD";
                const benefits = plan.perks || [];

                return (
                    <div
                        key={plan._id}
                        className={`relative flex flex-col p-8 md:p-12 rounded-[2.5rem] ${isPremium
                            ? "bg-neutral-900 text-white shadow-2xl shadow-neutral-900/20 transform md:-translate-y-4"
                            : "bg-white text-neutral-900 border border-neutral-200 shadow-sm dark:bg-neutral-900 dark:text-white dark:border-neutral-800"
                            }`}
                    >
                        {isPremium && (
                            <div className="absolute top-0 right-8 transform -translate-y-1/2">
                                <span className="bg-white text-neutral-900 text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-sm">
                                    Most Popular
                                </span>
                            </div>
                        )}

                        <h3 className={`text-2xl font-bold mb-2 ${isPremium ? "text-white" : "text-neutral-900 dark:text-white"}`}>
                            {plan.name}
                        </h3>

                        <p className={`text-sm mb-8 line-clamp-2 min-h-[40px] ${isPremium ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"}`}>
                            {plan.description || "Get dedicated engineering support for your product."}
                        </p>

                        <div className="mb-8">
                            <span className="text-5xl font-extrabold tracking-tight">
                                {price ? new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price) : "Custom"}
                            </span>
                            {plan.pricing?.recurringInfo && (
                                <span className={`text-sm ml-2 font-medium ${isPremium ? "text-neutral-400" : "text-neutral-500"}`}>
                                    / {plan.pricing.recurringInfo.interval?.unit?.toLowerCase().replace('s', '') || "period"}
                                </span>
                            )}
                        </div>

                        <ul className="space-y-4 mb-10 flex-1">
                            {benefits.map((benefit: any, idx: number) => (
                                <li key={idx} className="flex items-start">
                                    <Check className={`w-5 h-5 mr-3 shrink-0 ${isPremium ? "text-white" : "text-neutral-900 dark:text-white"}`} />
                                    <span className={isPremium ? "text-neutral-300" : "text-neutral-600 dark:text-neutral-400"}>
                                        {typeof benefit === 'string' ? benefit : benefit.name || "Included benefit"}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button
                            disabled={checkoutPlanId !== null}
                            onClick={() => handlePlanCheckout(plan)}
                            className={`w-full h-14 rounded-full font-medium transition-all flex items-center justify-center ${isPremium
                                ? "bg-white text-neutral-900 hover:bg-neutral-100 disabled:opacity-80"
                                : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 disabled:opacity-50"
                                }`}
                        >
                            {checkoutPlanId === plan._id ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Redirecting...
                                </>
                            ) : (
                                "Subscribe Now"
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
