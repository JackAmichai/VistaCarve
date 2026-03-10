import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
import Cookies from "js-cookie";

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
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
