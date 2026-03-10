"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
        { role: "bot", text: "Hi there! Welcome to VistaCarve. Unsure which material to carve your gift in? I can help!" },
    ]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowPopup(true);
        }, 3500);

        const hideTimer = setTimeout(() => {
            setShowPopup(false);
        }, 12000);

        return () => { clearTimeout(timer); clearTimeout(hideTimer); };
    }, [isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { role: "user", text: input }]);
        setInput("");

        // Simulate bot thinking
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: "Thanks for reaching out! Right now I'm just a demo chatbot, but soon I'll be integrated with real AI models to assist you perfectly.",
                },
            ]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button Bubble */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Tooltip Popup */}
                    {showPopup && (
                        <div className="relative bg-white text-gray-800 text-sm font-medium px-4 py-3 rounded-2xl shadow-xl border border-gray-100 mb-2 animate-in fade-in zoom-in slide-in-from-right-2 duration-300">
                            Need help? I'm here! 👋
                            <button onClick={() => setShowPopup(false)} className="absolute -top-2 -left-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-1 transition-colors">
                                <X className="w-3 h-3" />
                            </button>
                            {/* Speech Bubble Arrow */}
                            <div className="absolute right-[-6px] bottom-3 w-3 h-3 bg-white border-t border-r border-gray-100 transform rotate-45"></div>
                        </div>
                    )}

                    <button
                        onClick={() => { setIsOpen(true); setShowPopup(false); }}
                        className="w-40 h-40 hover:scale-105 transition-transform flex items-center justify-center shrink-0 relative drop-shadow-2xl"
                        aria-label="Open Chat"
                    >
                        <div className="relative w-full h-full">
                            <Image src="/images/new_logo.png" alt="Chat" fill className="object-contain scale-[1.3]" />
                        </div>
                        <span className="absolute top-4 right-4 flex h-6 w-6 z-10">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-6 w-6 bg-accent border-2 border-white shadow-sm"></span>
                        </span>
                    </button>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5 duration-300">

                    {/* Header */}
                    <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white relative overflow-hidden flex items-center justify-center">
                                <Image src="/images/new_logo.png" alt="VistaCarve" fill className="object-contain p-1" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-tight">VistaCarve Support</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-accent block"></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                    ? "bg-blue-600 text-white self-end rounded-tr-sm"
                                    : "bg-white border border-gray-200 text-gray-800 self-start rounded-tl-sm shadow-sm"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-gray-100 border-transparent rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="bg-accent text-white p-2 rounded-full disabled:opacity-50 hover:bg-green-600 transition-colors"
                                aria-label="Send"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                </div>
            )}
        </>
    );
}
