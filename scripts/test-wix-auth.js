require('dotenv').config({ path: '.env.local' });

async function testWixAuth() {
    const appId = process.env.NEXT_PUBLIC_WIX_APP_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID || process.env.WIX_APP_ID;
    const appSecret = process.env.WIX_APP_SECRET;

    console.log("Testing with App ID:", appId ? appId.substring(0, 10) + "..." : "MISSING");
    console.log("Testing with App Secret:", appSecret ? "PRESENT (hidden)" : "MISSING");

    if (!appId || !appSecret) {
        console.error("Missing credentials in .env.local");
        process.exit(1);
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

        console.log("Response Status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Token generation failed:", errorText);
        } else {
            const data = await response.json();
            console.log("SUCCESS! Access Token generated (first 20 chars):", data.access_token.substring(0, 20) + "...");
        }
    } catch (error) {
        console.error("Network or parsing error:", error);
    }
}

testWixAuth();
