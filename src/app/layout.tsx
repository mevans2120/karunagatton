import type { Metadata } from "next";
import { EB_Garamond, Unbounded } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${unbounded.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* SVG favicon (primary) */}
        <link rel="icon" href="/yurt-icon-welcome.svg" type="image/svg+xml" sizes="any" />
        
        {/* Apple Touch Icon (for iOS devices) - makes icon larger on Apple devices */}
        <link rel="apple-touch-icon" href="/yurt-icon-welcome.svg" sizes="180x180" />
        
        {/* Large favicon sizes for various contexts */}
        <link rel="icon" type="image/svg+xml" href="/yurt-icon-welcome.svg" sizes="192x192" />
        <link rel="icon" type="image/svg+xml" href="/yurt-icon-welcome.svg" sizes="512x512" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          h1, h2, h3, h4, h5, h6, nav, a[href="/"] { 
            font-family: 'Unbounded', sans-serif !important; 
          }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
