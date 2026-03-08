import { PricingCards } from "@/components/PricingCards";
import { ShieldCheck, Zap, Headphones } from "lucide-react";

export default function RetainersPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-6">
                    Productized Consulting
                </h1>
                <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Bypass the slow proposal process. Select a dedicated retention plan that guarantees fixed hours, priority responses, and predictable delivery for your engineering team.
                </p>
            </div>

            <PricingCards />

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Immediate Kickoff</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Skip the discovery phase. As soon as you purchase, you'll receive a Slack invite and onboarding link instantly.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Guaranteed Availability</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">My schedule fills up fast. A retainer ensures your spot is locked in and your project never takes a backseat.</p>
                </div>
                <div className="text-center p-6">
                    <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 shadow-sm">
                        <Headphones className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Priority Async Support</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Need architecture advice on a Wednesday? You'll get comprehensive code reviews and async loom videos promptly.</p>
                </div>
            </div>
        </div>
    );
}
