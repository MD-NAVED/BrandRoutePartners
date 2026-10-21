import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrandRoute Partners — Technology & Media Growth House",
  description:
    "A two-partner powerhouse: AI-powered product engineering meets seven specialist media & growth studios. Build, launch, and grow your brand — one route.",
  keywords: [
    "BrandRoute Partners",
    "brand growth",
    "media agency",
    "AI development",
    "digital marketing",
    "tech partnership",
  ],
  authors: [{ name: "BrandRoute Partners" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "BrandRoute Partners",
    description: "Technology × Media — build, launch, and grow your brand.",
    siteName: "BrandRoute Partners",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
