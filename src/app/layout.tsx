import type { Metadata } from "next";
import { EB_Garamond, Unbounded } from "next/font/google";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/next";
import SunAnimationHandler from "@/components/SunAnimationHandler";
//import "./tailwind-test.css";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
  weight: ["400", "500", "600"],
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Karuna | Shamanic Healing",
  description: "Shamanic healing in Eugene, Oregon and beyond through remote sessions.",
  openGraph: {
    title: "Karuna | Shamanic Healing",
    description: "Shamanic healing in Eugene, Oregon and beyond through remote sessions.",
    images: [
      {
        url: "/Homepage_Screenshot.png",
        width: 1200,
        height: 630,
        alt: "Karuna Shamanic Healing",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karuna | Shamanic Healing",
    description: "Shamanic healing in Eugene, Oregon and beyond through remote sessions.",
    images: ["/Homepage_Screenshot.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${unbounded.variable} font-serif`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* SVG favicon (primary) */}
        <link rel="icon" href="/drum-favicon.svg" type="image/svg+xml" sizes="any" />
        
        {/* Apple Touch Icon (for iOS devices) - makes icon larger on Apple devices */}
        <link rel="apple-touch-icon" href="/drum-favicon.svg" sizes="180x180" />
        
        {/* Large favicon sizes for various contexts */}
        <link rel="icon" type="image/svg+xml" href="/drum-favicon.svg" sizes="192x192" />
        <link rel="icon" type="image/svg+xml" href="/drum-favicon.svg" sizes="512x512" />
        
        {/* PNG fallback for browsers that don't support SVG favicons */}
        <link rel="icon" type="image/png" href="/drum-favicon.png" sizes="32x32" />
      </head>
      <body className="font-serif">
        <SunAnimationHandler />
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
