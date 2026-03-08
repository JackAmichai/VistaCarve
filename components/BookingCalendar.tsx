"use client";

import { useState, useEffect } from "react";
import { getWixClient } from "@/lib/wixClient";
import { format, addDays, startOfToday, addMonths, endOfMonth, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

export function BookingCalendar({ serviceId }: { serviceId: string }) {
    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
    const [availability, setAvailability] = useState<any[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
    const [bookingStatus, setBookingStatus] = useState<"idle" | "booking" | "success" | "error">("idle");
    const [currentMonth, setCurrentMonth] = useState(startOfToday());

    // Generate days for the next 21 days from today
    const nextDays = [...Array(14)].map((_, i) => addDays(startOfToday(), i));

    useEffect(() => {
        const fetchSlots = async () => {
            setLoadingSlots(true);
            try {
                const wixClient = getWixClient();

                // This attempts the most standard Time Slots query structure
                const nextDay = addDays(selectedDate, 1);
                const response = await wixClient.availabilityCalendar.queryAvailability({
                    filter: {
                        serviceId: [serviceId],
                        startDate: selectedDate.toISOString(),
                        endDate: nextDay.toISOString()
                    }
                });

                // Try to properly resolve nested slots depending on API response shape
                const anyRes = response as any;
                const slots = anyRes.availabilityEntries || anyRes.entries || anyRes.items || [];
                setAvailability(slots);
            } catch (error) {
                console.error("Failed to fetch availability:", error);
                // Fallback or empty state
                setAvailability([]);
            } finally {
                setLoadingSlots(false);
            }
        };

        if (serviceId) {
            fetchSlots();
        }
    }, [selectedDate, serviceId]);

    const handleBook = async () => {
        if (!selectedSlot) return;

        setBookingStatus("booking");
        try {
            const wixClient = getWixClient();

            const response = await (wixClient.bookings as any).createBooking({
                booking: {
                    bookedEntity: {
                        item: {
                            serviceId: serviceId,
                        }
                    },
                    // Depending on API version, we send the slot details
                    dateTime: selectedSlot.startDateTime || selectedSlot.slot?.startDate
                }
            });

            setBookingStatus("success");
        } catch (error) {
            console.error("Failed to create booking", error);
            setBookingStatus("error");
        }
    };

    if (bookingStatus === "success") {
        return (
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-12 shadow-sm border border-neutral-200 dark:border-neutral-800 text-center flex flex-col items-center">
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">You're Booked!</h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-sm">
                    I look forward to discussing your project architecture soon.
                    A confirmation email is on its way.
                </p>
                <button
                    onClick={() => setBookingStatus("idle")}
                    className="px-8 py-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 font-medium rounded-full transition-colors"
                >
                    Book Another Session
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200 dark:border-neutral-800">

            {/* Calendar Section */}
            <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Select a Date
                </h3>

                <div className="grid grid-cols-4 gap-3">
                    {nextDays.map((day) => {
                        const isSelected = isSameDay(day, selectedDate);
                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => setSelectedDate(day)}
                                className={`py-4 flex flex-col items-center rounded-2xl transition-all border ${isSelected
                                    ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-md transform scale-[1.02]"
                                    : "bg-neutral-50 text-neutral-600 border-neutral-100 hover:border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 hover:dark:bg-neutral-700"
                                    }`}
                            >
                                <span className="text-xs uppercase font-semibold mb-1 opacity-70">
                                    {format(day, "EEE")}
                                </span>
                                <span className="text-2xl font-bold">
                                    {format(day, "d")}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Time Slots Section */}
            <div>
                <h3 className="text-xl font-bold mb-6 text-neutral-900 dark:text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Available Times
                </h3>

                {loadingSlots ? (
                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-14 bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                ) : availability.length > 0 ? (
                    <div className="space-y-3">
                        {availability.map((slot, idx) => {
                            const start = slot.startDateTime || slot.slot?.startDate;
                            if (!start) return null;

                            const timeString = new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const isSelected = selectedSlot === slot;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`w-full py-4 px-6 flex justify-between items-center rounded-xl border transition-all ${isSelected
                                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-bold"
                                        : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 text-neutral-700 dark:text-neutral-300"
                                        }`}
                                >
                                    <span>{timeString}</span>
                                    {isSelected && <span className="text-sm">Selected</span>}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-12 text-center text-neutral-500 dark:text-neutral-400 border border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl">
                        <p>No availability for {format(selectedDate, "MMM do")}.</p>
                        <p className="text-sm mt-1">Please try another date.</p>
                    </div>
                )}

                <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                    <button
                        disabled={!selectedSlot || bookingStatus === "booking"}
                        onClick={handleBook}
                        className="w-full h-14 rounded-full bg-neutral-900 text-white font-medium shadow hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
                    >
                        {bookingStatus === "booking" ? "Processing..." : "Confirm Booking"}
                    </button>
                    {bookingStatus === "error" && (
                        <p className="text-red-500 text-sm text-center mt-3 font-medium">
                            Failed to finalize booking. Please try again.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
