import { getWixClient } from "@/lib/wixClient";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Clock, Video, Globe2 } from "lucide-react";

async function getConsultationServiceId() {
    try {
        const wixClient = getWixClient();
        const services = await wixClient.services.queryServices().find();

        // Attempt to return the first 1-on-1 strategy meeting id
        if (services.items && services.items.length > 0) {
            return services.items[0]._id;
        }
        return "example-service-id"; // Fallback ID
    } catch (error) {
        console.error("Failed to query services", error);
        return "example-service-id";
    }
}

export default async function BookTimePage() {
    const serviceId = await getConsultationServiceId();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
            <div className="grid md:grid-cols-3 gap-12 lg:gap-20">

                {/* Service Details */}
                <div className="md:col-span-1 space-y-8">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
                            Strategy Session
                        </h1>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400">
                            Book a dedicated hour to review your project architecture, resolve critical bugs, or map out your next product phase.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center text-neutral-700 dark:text-neutral-300 font-medium">
                            <Clock className="w-5 h-5 mr-3 text-neutral-400" />
                            1 Hour Duration
                        </div>
                        <div className="flex items-center text-neutral-700 dark:text-neutral-300 font-medium">
                            <Video className="w-5 h-5 mr-3 text-neutral-400" />
                            Google Meet / Zoom
                        </div>
                        <div className="flex items-center text-neutral-700 dark:text-neutral-300 font-medium">
                            <Globe2 className="w-5 h-5 mr-3 text-neutral-400" />
                            Global Availability
                        </div>
                    </div>

                    <hr className="border-neutral-200 dark:border-neutral-800" />

                    <div>
                        <h4 className="font-bold text-neutral-900 dark:text-white mb-2">What we can cover:</h4>
                        <ul className="list-disc pl-5 text-neutral-600 dark:text-neutral-400 space-y-2">
                            <li>System Design & Architecture</li>
                            <li>Next.js / React Refactoring</li>
                            <li>Auth & Security Reviews</li>
                            <li>General Mentorship</li>
                        </ul>
                    </div>
                </div>

                {/* Calendar UI */}
                <div className="md:col-span-2">
                    <BookingCalendar serviceId={serviceId || ""} />
                </div>

            </div>
        </div>
    );
}
