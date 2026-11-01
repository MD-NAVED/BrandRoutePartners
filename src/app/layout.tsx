import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "BrandRoute Partners — Build Your Brand. Generate More Leads.",
  description:
    "Personal branding, lead generation, cold email marketing, sales support, and marketing automation — backed by high-performance engineering. One system builds your reputation while the other fills your calendar.",
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
      <body className="antialiased bg-[#061A15] text-[#F3F5F0] font-sans selection:bg-[#78E6C3]/30 selection:text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
