"use server";

import { getWixAccessToken } from "@/lib/wix-oauth";

/**
 * Server Action to handle Wix Site Provisioning.
 * Uses the real Wix Site Management API to create a new site.
 */
export async function provisionWixSite(businessName: string, siteType: string) {
    try {
        console.log(`[Wix Provisioning] Starting for: ${businessName} (${siteType})`);

        // 1. Generate an OAuth Access Token dynamically
        const wixAccessToken = await getWixAccessToken();

        // 2. Call the Wix API to create the site
        // Using Site Management API: POST https://www.wixapis.com/site-management/v1/sites
        const response = await fetch("https://www.wixapis.com/site-management/v1/sites", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${wixAccessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                site: {
                    displayName: businessName,
                    // You can map siteType to a specific templateId if needed
                    // templateId: siteType === "store" ? "..." : "...",
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("[Wix API Error]:", response.status, errorText);
            throw new Error(`Failed to provision site: ${response.statusText}`);
        }

        const data = await response.json();
        const siteId = data.site.id;

        console.log(`[Wix Provisioning] Site created successfully: ${siteId}`);

        // 3. Generate the direct dashboard link
        const dashboardUrl = `https://manage.wix.com/dashboard/${siteId}`;

        return {
            success: true,
            siteId: siteId,
            dashboardUrl: dashboardUrl,
        };
    } catch (error) {
        console.error("[Wix Provisioning] Error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Internal Server Error",
        };
    }
}
