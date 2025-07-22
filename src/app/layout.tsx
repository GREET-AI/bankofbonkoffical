import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Sidebar } from "@/components/sidebar";
import FloatingProofButtonClient from "@/components/FloatingProofButtonClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Bank of Bonk",
  description: "Welcome to The Bank of Bonk - where every BONK counts and rewards are the currency of growth. Earn BONK rewards through our unique tier and time multiplier system.",
  openGraph: {
    title: "The Bank of Bonk",
    description: "Welcome to The Bank of Bonk - where every BONK counts and rewards are the currency of growth. Earn BONK rewards through our unique tier and time multiplier system.",
    images: [
      {
        url: "/bonkbank.png",
        width: 1200,
        height: 630,
        alt: "The Bank of Bonk Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bank of Bonk",
    description: "Welcome to The Bank of Bonk - where every BONK counts and rewards are the currency of growth.",
    images: ["/bonkbank.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-[#2B1B00]">
      <body className={`${inter.className} bg-[#2B1B00] min-h-screen`}>
        <ThemeProvider>
          <div className="flex min-h-screen bg-[#1A0F00] relative">
            <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#FFA319]/5 via-[#2B1B00]/10 to-[#1A0F00]/20" />
            <Sidebar className="w-64 hidden md:block fixed h-screen" />
            <div className="flex-1 md:ml-64 bg-[#1A0F00] min-h-screen">
              <main className="min-h-screen bg-[#1A0F00]">
                {children}
              </main>
            </div>
            <FloatingProofButtonClient />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
