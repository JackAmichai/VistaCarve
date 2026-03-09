"use client";

import { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function WalkMeGuide() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        // Check if the user has already taken the tour
        const hasSeenTour = localStorage.getItem("vistacarve_tour_seen");

        if (!hasSeenTour) {
            setTimeout(() => {
                const driverObj = driver({
                    showProgress: true,
                    steps: [
                        { popover: { title: 'Welcome to VistaCarve!', description: 'Let us take you on a quick tour of our updated premium layout.', side: "bottom", align: 'start' } },
                        { element: 'header', popover: { title: 'Navigation', description: 'Quickly find products, design services, or access your cart.', side: "bottom", align: 'start' } },
                        { element: '.concept-wrapper', popover: { title: 'Choose Your Material', description: 'Browse our premium selection of Wood, Metal, and Stone carvings directly from here.', side: "top", align: 'center' } },
                        { popover: { title: 'All set!', description: 'Feel free to explore and create your perfect custom carving. If you need help, our chat assistant is in the corner!' } }
                    ],
                    onDestroyStarted: () => {
                        driverObj.destroy();
                        localStorage.setItem("vistacarve_tour_seen", "true");
                    },
                });

                driverObj.drive();
            }, 1500);
        }
    }, [isClient]);

    return null;
}
