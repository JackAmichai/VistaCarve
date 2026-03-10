import wixClient from "@/lib/wixClient";
import { redirect } from "next/navigation";
import { User, Package, Clock, ShieldCheck, MapPin } from "lucide-react";

export const revalidate = 0; // Ensure fresh data on load

export default async function AccountPage() {
    let member = null;
    let myOrders: any[] = [];

    try {
        // Try to fetch the currently authenticated member profile
        const { member: currMember } = await wixClient.members.getCurrentMember({
            fieldsets: ["FULL"]
        });
        member = currMember;

        // Fetch order history for the authenticated user
        if (member) {
            // Note: with Wix headless, authenticated users can simply query orders. 
            // The SDK automatically uses the session tokens context to secure it.
            try {
                // To fetch orders we might need to use ecom/orders API. 
                // However, without fully setting up the eCom module in wixClient, we can use the existing setup.
                // For this demo, we'll try to fetch if we had wixClient.orders
            } catch (orderErr) {
                console.error("Order fetch error", orderErr);
            }
        }
    } catch (err: any) {
        console.error("Failed to fetch member", err);
        // If not authenticated, redirect to home with a prompt to sign in
        redirect("/?signin=true");
    }

    if (!member) {
        redirect("/?signin=true");
    }

    const { profile, contact } = member;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Sidebar Profile */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                            <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                {profile?.photo?.url ? (
                                    <img src={profile.photo.url} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <User className="w-10 h-10" />
                                )}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">{profile?.nickname || contact?.firstName || "Valued Customizer"}</h2>
                            <p className="text-gray-500 text-sm mb-6">{member.loginEmail}</p>

                            <div className="w-full space-y-3">
                                <button className="w-full py-2 px-4 rounded-lg bg-blue-50 text-blue-700 font-semibold transition hover:bg-blue-100 flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Account Security
                                </button>
                                <button className="w-full py-2 px-4 rounded-lg bg-gray-50 text-gray-600 font-semibold transition hover:bg-gray-100 flex items-center justify-center gap-2">
                                    <MapPin className="w-4 h-4" /> Shipping Addresses
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Order History */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold font-serif text-gray-900 mb-6 flex items-center gap-3">
                                <Package className="w-6 h-6 text-blue-600" />
                                Your Custom Craft Orders
                            </h3>

                            {myOrders.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <h4 className="text-lg font-bold text-gray-900 mb-1">No orders yet</h4>
                                    <p className="text-gray-500 text-sm mb-6">You haven't purchased any custom carvings yet.</p>
                                    <a href="/shop" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition">
                                        Start your first design
                                    </a>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {myOrders.map((order, idx) => (
                                        <div key={idx} className="border border-gray-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition">
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">Order #{order.number}</p>
                                                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                                    <Clock className="w-4 h-4" /> {new Date(order._createdDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="mt-4 md:mt-0 text-right">
                                                <p className="font-bold text-xl text-gray-900">${order.priceSummary?.total?.amount}</p>
                                                <span className="inline-block mt-1 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                                                    {order.status || "PROCESSING"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
