"use client";

import { useState } from "react";
import { X, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-card animate-fade-in-up">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10 p-1"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary mx-auto mb-6">
                        <User className="w-6 h-6" />
                    </div>

                    <h2 className="text-2xl font-bold text-center text-white mb-2 font-serif">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-gray-400 text-center text-sm mb-8">
                        {isLogin ? "Sign in to access your saved designs." : "Join VistaCarve for premium custom creations."}
                    </p>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-xs text-gray-400 font-medium ml-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-medium ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-medium ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors text-sm"
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <Button className="w-full bg-primary hover:bg-blue-600 font-bold py-3 h-auto mt-2 text-base rounded-xl">
                            {isLogin ? "Sign In" : "Sign Up"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-bold hover:underline"
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>

                {/* Footer decorator */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-[#fbbf24]"></div>
            </div>
        </div>
    );
}
