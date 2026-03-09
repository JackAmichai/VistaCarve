import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VistaCarve | Custom Carvings & Engravings",
  description: "If you need it carved, we carve it. Shop custom wood, metal, and stone signs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 relative`}>
        <Header />
        <main className="flex-1 flex flex-col pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
