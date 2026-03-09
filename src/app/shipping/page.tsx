export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl flex-1">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Shipping Options</h1>
            <div className="prose prose-blue max-w-none text-gray-700 text-sm md:text-base space-y-6">
                <p className="text-xl font-medium text-gray-900 leading-relaxed mb-8">
                    We know you're excited to receive your custom carving. We offer several shipping tiers to meet your timeline needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-2 text-gray-900">Standard Shipping</h3>
                        <p className="text-2xl font-bold text-blue-600 mb-4">$5.99 <span className="text-sm text-gray-500 font-normal">or FREE over $75</span></p>
                        <ul className="text-sm space-y-2 text-gray-600 mb-6">
                            <li>✓ 3-5 days production time</li>
                            <li>✓ 5-7 days transit time</li>
                            <li>✓ Fully tracked</li>
                        </ul>
                    </div>

                    <div className="border-2 border-blue-600 rounded-xl p-6 shadow-md relative">
                        <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
                        <h3 className="font-bold text-lg mb-2 text-gray-900">Priority Carve & Ship</h3>
                        <p className="text-2xl font-bold text-blue-600 mb-4">$14.99</p>
                        <ul className="text-sm space-y-2 text-gray-600 mb-6">
                            <li>✓ 1-2 days production time</li>
                            <li>✓ 2-3 days transit time</li>
                            <li>✓ VIP Support queue</li>
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-12 mb-4">International Shipping</h3>
                <p>
                    We currently ship to the US, Canada, UK, and Australia. International transit times vary from 7-21 days depending on customs clearance. Duties and taxes are the responsibility of the recipient.
                </p>
            </div>
        </div>
    );
}
