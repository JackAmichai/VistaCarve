"use client";

import { X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import wixClient from "@/lib/wixClient";
import { useState } from "react";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleWixLogin = async () => {
        setIsLoading(true);
        try {
            // Generate OAuth Redirect URL
            const redirectUrl = window.location.origin + "/login/callback";
            const originalPath = window.location.pathname;

            const oauthData = wixClient.auth.generateOAuthData(redirectUrl, originalPath);

            // For OAuthStrategy, generating it returns the obj with authUrl and oauthData, wait actually in headless it returns oauthData Promise we need to extract authUrl
            const authUrl = await wixClient.auth.getAuthUrl(await oauthData);

            const generatedOAuthData = await oauthData;
            localStorage.setItem("wix_oauthData", JSON.stringify(generatedOAuthData));

            const finalAuthUrl = typeof authUrl === "string" ? authUrl : (authUrl as any).authUrl;
            if (finalAuthUrl) {
                window.location.href = finalAuthUrl;
            }
        } catch (err) {
            console.error("Failed to initiate Wix Login", err);
            alert("Failed to connect to authentication server.");
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10 p-1"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto mb-6">
                        <User className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                        VistaCarve Account
                    </h2>
                    <p className="text-gray-500 text-sm mb-8">
                        Sign in to view your order history, manage your profile, and save custom designs securely.
                    </p>

                    <Button
                        onClick={handleWixLogin}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg h-auto shadow-sm"
                    >
                        {isLoading ? "Connecting..." : "Continue with Wix Security"}
                    </Button>
                    <p className="text-xs text-gray-400 mt-6">
                        By continuing, you are securely authenticated via Wix infrastructure.
                    </p>
                </div>
            </div>
        </div>
    );
}
