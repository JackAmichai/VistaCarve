export default function HelpPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl flex-1">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">How can we help?</h1>
                <p className="text-lg text-gray-600">Search our knowledge base or contact our 24/7 support team.</p>

                <div className="max-w-xl mx-auto mt-8 relative">
                    <input
                        type="text"
                        placeholder="Search FAQs (e.g., How long does oak take to carve?)"
                        className="w-full border-2 border-gray-300 rounded-full py-4 pl-6 pr-12 focus:border-blue-600 focus:outline-none text-lg"
                    />
                    <button className="absolute right-4 top-4 text-blue-600 font-bold uppercase tracking-wide text-sm">Search</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2">My Orders</h3>
                    <p className="text-gray-600 mb-4 text-sm">Track shipments, view invoices, or cancel an order.</p>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Track Order &rarr;</button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2">Returns & Refunds</h3>
                    <p className="text-gray-600 mb-4 text-sm">Not happy with your carve? See our satisfaction guarantee.</p>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Start a Return &rarr;</button>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <h3 className="font-bold text-xl mb-2">Live Support</h3>
                    <p className="text-gray-600 mb-4 text-sm">Need help configuring a design? Chat with our experts.</p>
                    <button className="text-blue-600 font-bold text-sm hover:underline">Start Chat &rarr;</button>
                </div>
            </div>
        </div>
    );
}
