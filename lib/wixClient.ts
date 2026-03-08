import { createClient, OAuthStrategy } from "@wix/sdk";
import { services, bookings, availabilityCalendar } from "@wix/bookings";
import { plans } from "@wix/pricing-plans";
import { items } from "@wix/data";
import { redirects } from "@wix/redirects";
import Cookies from "js-cookie";

export const getWixClient = () => {
    let tokens = undefined;
    if (typeof window !== "undefined") {
        tokens = Cookies.get("session") ? JSON.parse(Cookies.get("session")!) : undefined;
    }

    const wixClient = createClient({
        modules: { services, bookings, availabilityCalendar, plans, items, redirects },
        auth: OAuthStrategy({
            clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
            tokens: tokens
        })
    });

    return wixClient;
};
