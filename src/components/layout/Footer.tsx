import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#1C2024] text-gray-300 py-12 md:py-16 text-sm">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4 font-serif">vistacarve.</h3>
                        <p className="mb-4">From custom wooden signs to metal statues. If you need it carved, we carve it.</p>
                        <p className="font-semibold text-white">1.800.123.4567</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Let Us Help</h4>
                        <ul className="space-y-3">
                            <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Options</Link></li>
                            <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Our Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
                            <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Sign Up For Inspiration</h4>
                            <div className="letter-image scale-[0.35] origin-left -ml-2 -mt-5 h-[100px] w-[100px]">
                                <div className="animated-mail">
                                    <div className="back-fold"></div>
                                    <div className="letter">
                                        <div className="letter-border"></div>
                                        <div className="letter-title"></div>
                                        <div className="letter-context"></div>
                                        <div className="letter-stamp"></div>
                                    </div>
                                    <div className="top-fold"></div>
                                    <div className="body"></div>
                                    <div className="left-fold"></div>
                                </div>
                                <div className="shadow"></div>
                            </div>
                        </div>
                        <p className="mb-4 mt-[-2rem]">Get exclusive offers and creative design tips delivered directly to your inbox.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-white/10 border-white/20 border px-4 py-2 flex-1 rounded text-white focus:outline-none focus:border-white transition-colors"
                            />
                            <button className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200 transition-colors">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <div className="flex gap-4">
                        <span className="opacity-60">© {new Date().getFullYear()} VistaCarve. All rights reserved.</span>
                    </div>
                    <div className="flex gap-4 opacity-80">
                        <Link href="/terms" className="hover:text-white transition-colors hover:underline">Terms of Use</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors hover:underline">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
