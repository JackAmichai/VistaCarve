"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, TerminalSquare, UserIcon, Zap } from "lucide-react";
import { generatePortfolio } from "@/app/actions/generate";
import { useRouter } from "next/navigation";

export default function OnboardingWizard() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generateError, setGenerateError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        tech: "",
        vibe: "Professional",
    });

    const handleNext = () => setStep((s) => s + 1);
    const handleBack = () => setStep((s) => Math.max(0, s - 1));

    const handleSubmit = async () => {
        setIsGenerating(true);
        setGenerateError("");
        try {
            const result = await generatePortfolio(formData);
            if (result.success) {
                router.push("/preview");
            } else {
                setGenerateError(result.error || "Failed to generate portfolio.");
                setIsGenerating(false);
            }
        } catch (err: any) {
            setGenerateError(err.message || "An unexpected error occurred.");
            setIsGenerating(false);
        }
    };

    const steps = [
        {
            title: "Welcome to DevHub",
            subtitle: "Let's build your Headless Portfolio in seconds.",
            icon: <Sparkles className="w-12 h-12 text-blue-500 mb-6" />,
            content: (
                <div className="space-y-4">
                    <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-sm mx-auto mb-8">
                        Our AI will write your bio, generate case studies, and populate your Wix CMS automatically.
                    </p>
                    <button
                        onClick={handleNext}
                        className="w-full h-14 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full font-medium shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center"
                    >
                        Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            ),
        },
        {
            title: "Who are you?",
            subtitle: "The basics for your profile.",
            icon: <UserIcon className="w-10 h-10 text-neutral-400 mb-6" />,
            content: (
                <div className="space-y-6 text-left">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Your Full Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Jane Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full h-14 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-900 dark:focus:border-white focus:ring-0 outline-none transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Job Role / Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Senior Frontend Engineer"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full h-14 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-900 dark:focus:border-white focus:ring-0 outline-none transition-colors"
                        />
                    </div>
                    <button
                        disabled={!formData.name || !formData.role}
                        onClick={handleNext}
                        className="w-full h-14 mt-4 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full font-medium disabled:opacity-50 disabled:pointer-events-none transition-all"
                    >
                        Continue
                    </button>
                </div>
            ),
        },
        {
            title: "Your Tech Stack",
            subtitle: "What tools do you master?",
            icon: <TerminalSquare className="w-10 h-10 text-neutral-400 mb-6" />,
            content: (
                <div className="space-y-6 text-left">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Technologies (comma separated)</label>
                        <textarea
                            rows={3}
                            placeholder="e.g. React, Next.js, Node, TypeScript, AWS"
                            value={formData.tech}
                            onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                            className="w-full p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-900 dark:focus:border-white focus:ring-0 outline-none transition-colors resize-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Portfolio Tone / Vibe</label>
                        <div className="grid grid-cols-2 gap-3">
                            {["Professional", "Casual & Fun", "Highly Technical", "Direct & Bold"].map((vibe) => (
                                <button
                                    key={vibe}
                                    onClick={() => setFormData({ ...formData, vibe })}
                                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.vibe === vibe
                                            ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white"
                                            : "bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400"
                                        }`}
                                >
                                    {vibe}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <button onClick={handleBack} className="h-14 px-6 rounded-full font-medium text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                            Back
                        </button>
                        <button
                            disabled={!formData.tech}
                            onClick={handleSubmit}
                            className="flex-1 h-14 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-full font-medium disabled:opacity-50 transition-all flex items-center justify-center"
                        >
                            Generate Portfolio <Zap className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                </div>
            ),
        }
    ];

    if (isGenerating) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-8" />
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4 animate-pulse">
                    Crafting your digital presence...
                </h2>
                <p className="text-neutral-500 max-w-sm text-center">
                    Our AI is writing your bio, generating project case studies, and securely saving them to your Wix backend. This takes about 10-15 seconds.
                </p>
                {generateError && (
                    <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-center max-w-md">
                        <p className="font-bold mb-1">Error Generating</p>
                        <p className="text-sm">{generateError}</p>
                        <button
                            onClick={() => setIsGenerating(false)}
                            className="mt-4 px-4 py-2 border border-red-200 dark:border-red-800 rounded-full text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg relative">
                {/* Progress Bar */}
                {step > 0 && (
                    <div className="absolute -top-12 left-0 w-full flex gap-2">
                        {[1, 2].map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${s <= step ? "bg-neutral-900 dark:bg-white" : "bg-neutral-200 dark:bg-neutral-800"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 rounded-[2.5rem] shadow-xl text-center"
                    >
                        <div className="flex justify-center flex-col items-center">
                            {steps[step].icon}
                            <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2 tracking-tight">
                                {steps[step].title}
                            </h2>
                            <p className="text-neutral-500 dark:text-neutral-400 mb-8 max-w-xs mx-auto">
                                {steps[step].subtitle}
                            </p>
                        </div>
                        {steps[step].content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
