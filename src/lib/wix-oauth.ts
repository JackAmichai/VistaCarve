/**
 * Wix OAuth Utility
 * Handles dynamic generation of Access Tokens using App ID and Secret.
 */

export async function getWixAccessToken() {
    const appId = process.env.NEXT_PUBLIC_WIX_APP_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID || process.env.WIX_APP_ID;
    const appSecret = process.env.WIX_APP_SECRET;

    if (!appId || !appSecret) {
        throw new Error("Missing Wix App ID or Secret in environment variables (check NEXT_PUBLIC_WIX_APP_ID and WIX_APP_SECRET)");
    }

    try {
        const response = await fetch("https://www.wixapis.com/oauth/access", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                grant_type: "client_credentials",
                client_id: appId,
                client_secret: appSecret,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("[Wix OAuth] Token generation failed:", response.status, error);
            throw new Error("Failed to generate Wix Access Token");
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("[Wix OAuth] Error:", error);
        throw error;
    }
}
