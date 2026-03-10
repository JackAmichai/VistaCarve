import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/custom.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chat/Chatbot";
import WalkMeGuide from "@/components/WalkMeGuide";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import CustomCursor from "@/components/ui/CustomCursor";

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
      <body className={`${inter.className} min-h-screen flex flex-col relative text-gray-100`}>
        <CustomCursor />
        <ParticlesBackground />
        <WalkMeGuide />
        <Header />
        <main className="flex-1 flex flex-col pt-0 z-10">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
