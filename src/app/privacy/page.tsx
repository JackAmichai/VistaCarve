export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl flex-1">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-blue max-w-none text-gray-700 text-sm md:text-base space-y-6">
                <p className="text-gray-500 italic">Effective Date: March 2026</p>
                <p>
                    At VistaCarve, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our site or make a purchase.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Account Information:</strong> Name, email address, password, and contact preferences.</li>
                    <li><strong>Order Details:</strong> Shipping address, billing information, and the custom designs/images you upload for carving.</li>
                    <li><strong>Payment Information:</strong> Handled securely via our PCI-compliant payment gateways (Wix Ecom / Stripe). We do not store full credit card numbers on our servers.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h3>
                <p>
                    Your data is used strictly to fulfill your orders, provide customer support, and improve our platform. We may use your email to send transactional updates (order confirmation, tracking info) and occasional promotional offers (which you can opt out of at any time).
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Data Sharing</h3>
                <p>
                    We do not sell your personal data to third parties. Information is only shared with trusted service providers necessary to operate our business (e.g., shipping carriers like FedEx/UPS, payment processors).
                </p>
            </div>
        </div>
    );
}
