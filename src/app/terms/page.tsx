export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl flex-1">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Terms of Use</h1>
            <div className="prose prose-blue max-w-none text-gray-700 text-sm md:text-base space-y-6">
                <p className="text-gray-500 italic">Last Updated: March 2026</p>
                <p>
                    Welcome to VistaCarve. By accessing our website, using our design tools, or purchasing our custom carved products, you agree to be bound by the following Terms of Use.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Custom Orders & User Content</h3>
                <p>
                    You retain all rights to the designs and logos you submit to our platform for carving. By uploading an image, you grant VistaCarve a non-exclusive license to use, reproduce, and modify the design solely for the purpose of fulfilling your order. You warrant that you have the legal right to use any logos, trademarks, or copyrighted material submitted.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Product Variations</h3>
                <p>
                    Because we work with natural materials like wood and stone, variations in grain, color, and texture are inherent and expected. These are not considered defects. The preview shown in our design maker is an digital approximation; the final physical carve may slightly differ in depth and hue.
                </p>

                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Cancellations & Modifications</h3>
                <p>
                    Due to the rapid and permanent nature of our custom carving process, orders enter production almost immediately. We can only guarantee cancellation or modification if requested within 1 hour of placing the order.
                </p>
            </div>
        </div>
    );
}
