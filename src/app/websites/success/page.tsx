"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Globe, ExternalLink, Settings, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WebsiteSuccessPage() {
    const [showDisclaimer, setShowDisclaimer] = useState(true);

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center px-4 py-12 relative">
            {/* Architecture Disclaimer Modal */}
            {showDisclaimer && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[32px] max-w-lg w-full p-8 md:p-10 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                            <Settings className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notice: Technical Demonstration</h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                This interface illustrates a <strong>B2B Solution Integration</strong> architecture.
                            </p>
                            <p>
                                In a real-world implementation, this flow programmatically provisions a Wix sub-account and establishes a secure <strong>Single Sign-On (SSO)</strong> session. This allows a VistaCarve user to automatically create and manage their professional Wix presence using their parent credentials.
                            </p>
                            <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-sm text-amber-800">
                                <p className="font-semibold flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4" /> Final Step
                                </p>
                                <p className="mt-1">
                                    Clicking the button below will direct you to the live VistaPrint x Wix website creation page to complete the experience.
                                </p>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setShowDisclaimer(false)}
                            className="w-full mt-8 rounded-full h-14 bg-gray-900 hover:bg-black text-white font-bold"
                        >
                            Got it, let's continue
                        </Button>
                    </div>
                </div>
            )}

            <div className="max-w-3xl w-full bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-700">
                {/* Header Decoration */}
                <div className="bg-blue-600 h-3 w-full" />
                
                <div className="p-8 md:p-16 text-center">
                    <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
                        Your website is online!
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-lg mx-auto leading-relaxed">
                        We've successfully provisioned your new Wix-powered business site. Your templates and custom product catalog are ready for editing.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                            <Globe className="w-6 h-6 text-blue-600 mb-3" />
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Live URL</h3>
                            <p className="text-xs text-gray-600">your-business.wixsite.com</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100">
                            <Settings className="w-6 h-6 text-purple-600 mb-3" />
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Editor Tools</h3>
                            <p className="text-xs text-gray-600">100+ Design components</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100">
                            <BarChart className="w-6 h-6 text-orange-600 mb-3" />
                            <h3 className="font-bold text-gray-900 text-sm mb-1">Analytics</h3>
                            <p className="text-xs text-gray-600">Built-in visitor tracking</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="https://www.wix.com/vistaprint/create-your-website" target="_blank">
                            <Button size="lg" className="rounded-full px-10 h-14 bg-blue-600 hover:bg-blue-700 text-lg font-bold shadow-lg shadow-blue-200">
                                Open Wix Dashboard <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/websites">
                            <Button variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg font-bold border-gray-200 hover:bg-gray-50">
                                Back to Websites
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">
                        Need help customizing? <Link href="/help" className="text-blue-600 hover:underline">Check our guides</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
