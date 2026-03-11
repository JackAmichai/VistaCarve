/**
 * Wix OAuth Utility
 * Handles dynamic generation of Access Tokens using App ID and Secret.
 */

export async function getWixAccessToken() {
    const appId = process.env.NEXT_PUBLIC_WIX_APP_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID || process.env.WIX_APP_ID || "1c5c13cd-d1e1-4d8d-a950-b9b600033564";
    const appSecret = process.env.WIX_APP_SECRET;

    if (!appId || !appSecret) {
        throw new Error("Missing Wix App ID or Secret in environment variables (check NEXT_PUBLIC_WIX_APP_ID and WIX_APP_SECRET)");
    }

    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", appId);
        params.append("client_secret", appSecret);

        const response = await fetch("https://www.wixapis.com/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[Wix OAuth] Token generation failed:", response.status, errorText);
            throw new Error(`Wix Auth Error (${response.status}): ${errorText || "Failed to generate access token"}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("[Wix OAuth] Error:", error);
        throw error;
    }
}
