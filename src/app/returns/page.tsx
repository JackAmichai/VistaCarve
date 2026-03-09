export default function ReturnsPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl flex-1">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">VistaCarve Satisfaction Guarantee</h1>
            <div className="prose prose-blue max-w-none text-gray-700 text-sm md:text-base space-y-6">

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
                    <h3 className="font-bold text-lg text-blue-900 mb-2">Our "Carved in Stone" Promise</h3>
                    <p className="text-blue-800 m-0">
                        If you aren't absolutely thrilled with your custom product, let us know within 30 days and we'll make it right—whether that means a free reprint, an account credit, or a full refund.
                    </p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What if there's an error on my carve?</h3>
                <p>
                    If the defect was our fault (e.g., laser calibration issue, incorrect material used, damage during shipping), simply snap a photo and email it to support@vistacarve.com. We will expedite a replacement carve to you at zero cost.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What if I made a typo on my design?</h3>
                <p>
                    Because our products are completely customized, we generally cannot accept returns if the error was present in the proof you approved (like a typo or low-resolution image). However, please reach out to us anyway! We want you to love your item, and we often offer steep discounts on reprints for customer errors.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">How to request a return or reprint</h3>
                <ol className="list-decimal pl-5 space-y-2 font-medium">
                    <li>Locate your Order # from your confirmation email.</li>
                    <li>Contact our support team via Live Chat or Email.</li>
                    <li>Provide a brief explanation and a photo of the item received.</li>
                    <li>Our team will respond within 24 hours with a resolution.</li>
                </ol>
            </div>
        </div>
    );
}
