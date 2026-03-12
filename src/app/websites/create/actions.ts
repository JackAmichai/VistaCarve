"use server";

import { getWixAccessToken } from "@/lib/wix-oauth";

/**
 * Server Action to handle Wix Site Provisioning.
 * Uses the real Wix Site Management API to create a new site.
 */
export async function provisionWixSite(businessName: string, siteType: string) {
    try {
        console.log(`[Wix Provisioning] Starting for: ${businessName} (${siteType})`);

        // 1. Generate an OAuth Access Token or use API Key dynamically
        const wixAccessToken = await getWixAccessToken();

        // Template mapping based on siteType
        const templateMapping: Record<string, string> = {
            "ecommerce": "b08ad60d-275d-4ecc-b68e-0fde69d78465", // Online Store Template
            "store": "b08ad60d-275d-4ecc-b68e-0fde69d78465",
            "portfolio": "8c5c13cd-d1e1-4d8d-a950-b9b600033564",
            "business": "a1b2c3d4-e5f6-4a5b-6c7d-8e9f0a1b2c3d",
            "landing": "d1e1-4d8d-a950-b9b600033564",
        };

        const templateId = templateMapping[siteType] || templateMapping.business;

        // 2. Call the Wix API to create the site
        const response = await fetch("https://www.wixapis.com/site-management/v1/sites", {
            method: "POST",
            headers: {
                "Authorization": wixAccessToken.startsWith("IST.") ? wixAccessToken : `Bearer ${wixAccessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                site: {
                    displayName: businessName,
                    templateId: templateId,
                },
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = "Failed to provision site";
            try {
                const errorJson = JSON.parse(errorText);
                errorMessage = errorJson.message || errorJson.errorDescription || errorMessage;
            } catch (e) {}
            
            console.error("[Wix API Error]:", response.status, errorText);
            return {
                success: false,
                error: errorMessage,
                status: response.status
            };
        }

        const data = await response.json();
        
        if (!data.site || !data.site.id) {
            throw new Error("Invalid response from Wix API: Missing site ID");
        }

        const siteId = data.site.id;
        console.log(`[Wix Provisioning] Site created successfully: ${siteId}`);

        // 3. Generate the direct dashboard link
        const dashboardUrl = `https://manage.wix.com/dashboard/${siteId}`;

        return {
            success: true,
            siteId: siteId,
            dashboardUrl: dashboardUrl,
        };
    } catch (error: any) {
        console.error("[Wix Provisioning] Unexpected Error:", error);
        
        return {
            success: false,
            error: error.message || "An unexpected error occurred during provisioning",
        };
    }
}
