import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl flex flex-col items-center animate-fade-in-up">
            <div className="text-center mb-16">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-gray-900">Your Order is Successful!</h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Thank you for choosing VistaCarve. We're firing up our CNC machines and lasers to start working on your custom pieces. Keep an eye out for the delivery truck!
                </p>
                <Link href="/" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg inline-block">
                    Continue Shopping
                </Link>
            </div>

            <div className="w-full truck-scene shadow-[0_20px_50px_rgba(0,150,136,0.3)]">
                <div className="loop-wrapper">
                    <div className="mountain"></div>
                    <div className="hill"></div>
                    <div className="tree"></div>
                    <div className="tree"></div>
                    <div className="tree"></div>
                    <div className="rock"></div>
                    <div className="truck"></div>
                    <div className="wheels"></div>
                </div>
            </div>
        </div>
    );
}
