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
  title: "BrandRoute Partners — Build Your Brand. Generate More Leads.",
  description:
    "Personal branding, lead generation, cold email marketing, sales support, and marketing automation — backed by Google-certified product engineering. One system builds your reputation while the other fills your calendar.",
  keywords: [
    "BrandRoute Partners",
    "personal branding",
    "lead generation",
    "cold email marketing",
    "sales support",
    "marketing automation",
    "brand growth",
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
