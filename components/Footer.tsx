export function Footer() {
    return (
        <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-background py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
                <p>© {new Date().getFullYear()} Person-as-a-Service.</p>
                <div className="mt-4 md:mt-0 flex space-x-4">
                    <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
