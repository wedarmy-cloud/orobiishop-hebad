import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MiniCartDrawer } from "@/components/MiniCartDrawer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koleksi Stiker, Pin & Merchandise Kreatif di Orobiishop Indonesia",
  description:
    "Orobiishop menghadirkan stiker vinyl, enamel pin, pin button, gantungan kunci akrilik, tote bag, dan custom merch dengan desain orisinal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#141414]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MiniCartDrawer />
      </body>
    </html>
  );
}
