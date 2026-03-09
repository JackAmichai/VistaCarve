"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
        { role: "bot", text: "Hi there! Welcome to VistaCarve. Unsure which material to carve your gift in? I can help!" },
    ]);
    const [input, setInput] = useState("");

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
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center z-50 overflow-hidden border-4 border-white"
                    aria-label="Open Chat"
                >
                    <div className="relative w-full h-full p-2 bg-white">
                        <Image src="/images/logo.png" alt="Chat" fill className="object-contain p-2" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-white"></span>
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 animate-in slide-in-from-bottom-5 duration-300">

                    {/* Header */}
                    <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white relative overflow-hidden flex items-center justify-center">
                                <Image src="/images/logo.png" alt="VistaCarve" fill className="object-cover" />
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
