import wixClient from "@/lib/wixClient";
import Image from "next/image";
import { CalendarDays, Clock, Video, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function ConsultationPage() {
    let services: any[] = [];
    let error = null;

    try {
        const response = await wixClient.services.queryServices().find();
        services = response.items || [];
    } catch (err: any) {
        console.error("Failed to fetch Wix Bookings services:", err);
        error = err.message;

        // Mock fallback if Wix Bookings isn't fully installed or published on the dashboard yet
        services = [
            {
                _id: "mock1",
                name: "Custom Design Consultation",
                description: "Book a 30-minute video call with our master carvers to discuss your unique project idea, material selection, and get a preliminary quote.",
                schedule: {
                    durationInMinutes: 30
                },
                media: {
                    mainMedia: {
                        image: "/images/wood_bg.jpg"
                    }
                },
                paymentOptions: {
                    wixPayOnline: {
                        price: 0
                    }
                }
            },
            {
                _id: "mock2",
                name: "Corporate Gifting Strategy",
                description: "Need 50+ custom engraved items? Let's discuss timelines, bulk pricing discounts, and logistics for your upcoming corporate event.",
                schedule: {
                    durationInMinutes: 45
                },
                media: {
                    mainMedia: {
                        image: "/images/metal1.jpg"
                    }
                },
                paymentOptions: {
                    wixPayOnline: {
                        price: 0
                    }
                }
            }
        ];
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <CalendarDays className="w-16 h-16 mx-auto mb-6 text-blue-500" />
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Let's craft your vision.</h1>
                    <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        Book a 1-on-1 consultation with our design experts. We'll explore materials, discuss customization options, and bring your unique idea to life.
                    </p>
                </div>
            </div>

            {/* Services List */}
            <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
                {error && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl mb-8 shadow-sm">
                        <p className="text-sm font-medium">Note: Using demonstration data. Connect Wix Bookings in dashboard to see live services. {error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service) => (
                        <div key={service._id} className="bg-white rounded-2xl shadow-xl overflow-hidden group flex flex-col">
                            <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                                {service.media?.mainMedia?.image ? (
                                    // Handle both Wix native image URLs and mock paths
                                    <img
                                        src={service.media.mainMedia.image.startsWith('wix:image') ? 'https://static.wixstatic.com/media/' + service.media.mainMedia.image.split('/')[3] : service.media.mainMedia.image}
                                        alt={service.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 px-3 py-1 rounded-full text-xs font-bold font-mono shadow-sm">
                                    {service.paymentOptions?.wixPayOnline?.price === 0
                                        ? "FREE"
                                        : `$${service.paymentOptions?.wixPayOnline?.price || 'TBD'}`
                                    }
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3">{service.name}</h3>
                                <p className="text-gray-600 mb-6 flex-1">{service.description}</p>

                                <div className="flex items-center gap-6 text-sm text-gray-500 font-medium mb-8">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        {service.schedule?.durationInMinutes} mins
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Video className="w-5 h-5 text-gray-400" />
                                        Video Call
                                    </div>
                                </div>

                                <button className="w-full group/btn bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer">
                                    Book Now
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Value Props */}
            <div className="max-w-5xl mx-auto px-4 mt-20 text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-10">Why book a consultation?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="font-bold">1</span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Expert Guidance</h4>
                        <p className="text-gray-500 text-sm">We'll help you pick the perfect wood or metal type for your design's specific needs.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="font-bold">2</span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Accurate Quoting</h4>
                        <p className="text-gray-500 text-sm">Get a precise estimate on custom requests before you commit to purchasing.</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="font-bold">3</span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Exclusive Discounts</h4>
                        <p className="text-gray-500 text-sm">Consultation clients often receive special promo codes for bulk or complex orders.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
