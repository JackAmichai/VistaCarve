import Link from "next/link";
import { Briefcase, Calendar, Star } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
                            DevHub
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <Link href="/portfolio" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Portfolio
                        </Link>
                        <Link href="/book-time" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
                            <Calendar className="w-4 h-4 mr-2" />
                            Book Time
                        </Link>
                        <Link href="/retainers" className="flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
                            <Star className="w-4 h-4 mr-2" />
                            Retainers
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
