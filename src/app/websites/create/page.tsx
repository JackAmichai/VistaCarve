"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MonitorSmartphone, Store, Palette, Globe } from "lucide-react";
import Link from "next/link";
import { provisionWixSite } from "./actions";

export default function CreateWebsiteWizard() {
    const [step, setStep] = useState(1);
    const [businessName, setBusinessName] = useState("");
    const [siteType, setSiteType] = useState("");
    const [provisionProgress, setProvisionProgress] = useState(0);
    const [dashboardUrl, setDashboardUrl] = useState("https://manage.wix.com/");
    const [error, setError] = useState<string | null>(null);

    // Handle Wix Site Provisioning
    const handleCreateSite = async () => {
        setStep(3);
        setProvisionProgress(0);
        setError(null);

        // Simulate progress bar UI
        const interval = setInterval(() => {
            setProvisionProgress((prev) => (prev < 90 ? prev + 2 : prev));
        }, 100);

        try {
            // CALL THE SERVER ACTION
            const result = await provisionWixSite(businessName, siteType);

            if (result.success && result.dashboardUrl) {
                setProvisionProgress(100);
                
                // MOCK B2B FLOW: Seamless transition logic
                // Automatically redirect the user to the Wix Dashboard upon successful provisioning
                setTimeout(() => {
                    clearInterval(interval);
                    window.location.href = result.dashboardUrl!;
                }, 1200); // Small delay to let the user see the "100%" success state
            } else {
                setError(result.error || "Unknown server error");
                setStep(5); // Error state
                clearInterval(interval);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "A network error occurred. Please try again.");
            setStep(5);
            clearInterval(interval);
        }
    };

    return (
        <div className="flex-1 min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
            <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                {/* Header */}
                <div className="flex items-center gap-3 mb-12">
                    <svg viewBox="0 0 100 100" className="w-6 h-6 text-black fill-current"><path d="M50 0 L100 50 L50 100 L0 50 Z" /></svg>
                    <span className="text-xl font-bold tracking-tight text-black font-serif">vistacarve <span className="text-blue-600 mx-1">x</span> wix</span>
                </div>

                {/* STEP 1: Site Type */}
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-2">What kind of website do you need?</h2>
                            <p className="text-black">This helps us pre-configure your Wix editor with the right templates and apps.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { id: "store", label: "Online Store", icon: Store, desc: "Sell physical or digital goods" },
                                { id: "portfolio", label: "Portfolio", icon: Palette, desc: "Showcase your artistic carvings" },
                                { id: "business", label: "Local Business", icon: Globe, desc: "Attract clients to your shop" },
                                { id: "landing", label: "Landing Page", icon: MonitorSmartphone, desc: "A simple one-page site" },
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSiteType(type.id)}
                                    className={`text-left p-6 rounded-2xl border-2 transition-all ${siteType === type.id
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300 bg-white"
                                        }`}
                                >
                                    <type.icon className={`w-8 h-8 mb-4 ${siteType === type.id ? "text-blue-600" : "text-black"}`} />
                                    <h3 className="font-bold text-black text-lg">{type.label}</h3>
                                    <p className="text-sm text-black mt-1">{type.desc}</p>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button
                                onClick={() => setStep(2)}
                                disabled={!siteType}
                                className="rounded-full px-8 bg-black hover:bg-gray-800 h-12 text-base font-bold"
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 2: Business Name */}
                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <button onClick={() => setStep(1)} className="text-sm font-bold text-black hover:text-black transition-colors flex items-center gap-1 mb-8">
                            &larr; Back
                        </button>
                        <div>
                            <h2 className="text-3xl font-bold text-black mb-2">What&apos;s the name of your business?</h2>
                            <p className="text-black">Don&apos;t worry, you can change this later in the Wix Editor.</p>
                        </div>

                        <Input
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            placeholder="e.g., John's Custom Woodworks"
                            className="h-16 text-xl px-6 rounded-2xl border-2 border-gray-300 focus-visible:border-blue-600 focus-visible:ring-0"
                            autoFocus
                        />

                        <div className="flex justify-end pt-8">
                            <Button
                                onClick={handleCreateSite}
                                disabled={!businessName.trim()}
                                className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 h-12 text-base font-bold"
                            >
                                Generate My Site
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 3: Provisioning State (Fake API Loading) */}
                {step === 3 && (
                    <div className="space-y-8 animate-in fade-in py-12 text-center flex flex-col items-center">
                        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                            <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="absolute font-bold text-2xl text-blue-900">{provisionProgress}%</span>
                        </div>
                        <h2 className="text-3xl font-bold text-black mb-2">Deploying your Wix site...</h2>
                        <p className="text-black text-lg">
                            {provisionProgress < 30 && "Initializing site structure..."}
                            {provisionProgress >= 30 && provisionProgress < 60 && `Adding apps for a ${siteType}...`}
                            {provisionProgress >= 60 && provisionProgress < 90 && `Applying brand name "${businessName}"...`}
                            {provisionProgress >= 90 && "Finalizing permissions..."}
                        </p>
                    </div>
                )}

                {/* STEP 4: Success Status */}
                {step === 4 && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-700 text-center py-8">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 font-serif">Your site is ready!</h2>
                        <p className="text-xl text-black max-w-lg mx-auto mb-10">
                            We&apos;ve created a new Wix backend for <strong className="text-black">{businessName}</strong>. You can now access the Editor to design your pages and manage your products.
                        </p>

                        <div className="flex flex-col gap-4 max-w-md mx-auto">
                            <Link href={dashboardUrl} target="_blank" rel="noopener noreferrer">
                                <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold">
                                    Go to Wix Dashboard
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={() => setStep(1)} className="w-full rounded-full h-14 text-lg font-bold text-black bg-transparent border-gray-300">
                                Create Another Site
                            </Button>
                        </div>
                    </div>
                )}

                {/* STEP 5: Error Status */}
                {step === 5 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-8">
                        <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                        </div>
                        <h2 className="text-3xl font-bold text-black mb-4 font-serif">Connection Failed</h2>
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 max-w-lg mx-auto mb-8">
                            <p className="text-red-800 font-medium">
                                {error || "Failed to connect to Wix services."}
                            </p>
                            <p className="text-red-600 text-sm mt-2">
                                Please check your Wix API Key and Secret configuration in your environment variables and ensure the app is published.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 max-w-md mx-auto">
                            <Button onClick={handleCreateSite} className="w-full rounded-full bg-black hover:bg-gray-800 h-14 text-lg font-bold">
                                Try Again
                            </Button>
                            <Button variant="outline" onClick={() => setStep(2)} className="w-full rounded-full h-14 text-lg font-bold text-black bg-transparent border-gray-300">
                                Back to Details
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
