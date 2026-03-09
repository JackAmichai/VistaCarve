export default function ResellerPage() {
    return (
        <div className="flex-1">
            <div className="bg-[#1C2024] text-white py-20 px-4 md:px-8 text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Pro Advantage Reseller Program</h1>
                <p className="text-xl max-w-2xl mx-auto font-light text-gray-300">
                    Unlock wholesale pricing, white-label shipping, and priority production for your agency or retail business.
                </p>
                <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all">
                    Apply Now
                </button>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">Why partner with VistaCarve?</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                <div>
                                    <h4 className="font-bold text-gray-900">Deep Discounts</h4>
                                    <p className="text-gray-600 text-sm">Up to 40% off retail prices on bulk corporate orders.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                <div>
                                    <h4 className="font-bold text-gray-900">Unbranded Packaging</h4>
                                    <p className="text-gray-600 text-sm">We dropship directly to your clients with your return address.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                <div>
                                    <h4 className="font-bold text-gray-900">Dedicated Account Manager</h4>
                                    <p className="text-gray-600 text-sm">Get priority support for complex 3D modeling and laser requests.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-8 h-full flex items-center justify-center aspect-square">
                        <span className="text-gray-400 font-medium">[ Hero Image Placeholder ]</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
