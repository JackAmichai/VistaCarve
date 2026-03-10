import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import { redirects } from "@wix/redirects";
import { members } from "@wix/members";
import { reviews } from "@wix/reviews";
import { services } from "@wix/bookings";
import { items } from "@wix/data";
import Cookies from "js-cookie";

const clientId = process.env.NEXT_PUBLIC_WIX_APP_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
const siteId = process.env.NEXT_PUBLIC_WIX_SITE_ID;

if (!clientId) {
  console.error("CRITICAL: Neither NEXT_PUBLIC_WIX_APP_ID nor NEXT_PUBLIC_WIX_CLIENT_ID is defined in environment variables!");
}

if (siteId) {
  console.log(`[Wix Client] Initializing for Site ID: ${siteId}`);
}

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    redirects,
    members,
    reviews,
    services,
    items,
  },
  auth: OAuthStrategy({
    clientId: clientId || "MISSING_CLIENT_ID",
  }),
});

// Sync tokens from cookies if available (useful for client-side persistence)
if (typeof window !== "undefined") {
  try {
    const tokensStr = Cookies.get("session");
    if (tokensStr && tokensStr !== "undefined") {
      wixClient.auth.setTokens(JSON.parse(tokensStr));
    }
  } catch (err) {
    console.error("Failed to parse Wix session cookie", err);
  }
}

export default wixClient;
