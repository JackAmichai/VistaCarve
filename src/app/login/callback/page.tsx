"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import wixClient from "@/lib/wixClient";
import Cookies from "js-cookie";

export default function LoginCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function handleCallback() {
            try {
                const code = searchParams.get("code");
                const state = searchParams.get("state");
                const errorParam = searchParams.get("error");
                const errorDesc = searchParams.get("error_description");

                if (errorParam) {
                    setError(`Error from Wix: ${errorDesc || errorParam}`);
                    return;
                }

                if (!code || !state) {
                    setError("Missing code or state in URL parameters");
                    return;
                }

                // Retrieve the oauthData we stored before redirecting
                const oauthDataStr = localStorage.getItem("wix_oauthData");
                if (!oauthDataStr) {
                    setError("No OAuth data found in local storage. Please try logging in again.");
                    return;
                }

                const oauthData = JSON.parse(oauthDataStr);

                // Exchange code for member tokens
                const memberTokens = await wixClient.auth.getMemberTokens(code, state, oauthData);

                // Save tokens
                if (memberTokens) {
                    wixClient.auth.setTokens(memberTokens);
                    Cookies.set("session", JSON.stringify(memberTokens), { expires: 14 }); // 14 days

                    // Clear oauthData
                    localStorage.removeItem("wix_oauthData");

                    // Redirect back to original page (or home)
                    router.push(state || "/");
                    router.refresh(); // Refresh to update user state across the app
                } else {
                    setError("Failed to generate member tokens");
                }

            } catch (err: any) {
                console.error("Callback error", err);
                setError(err.message || "An unexpected error occurred during login callback.");
            }
        }

        handleCallback();
    }, [searchParams, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {error ? (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-lg text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Login Failed</h1>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700"
                    >
                        Return Home
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Securely logging you in...</h1>
                    <p className="text-gray-500">Please wait while we finalize your authentication.</p>
                </div>
            )}
        </div>
    );
}
