import type { Metadata } from "next";
import { EB_Garamond, Unbounded } from "next/font/google";
import Navigation from "@/components/Navigation";
import LazyAnalytics from "@/components/LazyAnalytics";
import SunAnimationHandler from "@/components/SunAnimationHandler";
//import "./tailwind-test.css";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
  weight: ["400", "500", "600"],
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
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
        
        {/* DNS prefetch for faster font loading */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical images for faster FCP */}
        <link rel="preload" as="image" href="/yurt-icon-welcome.svg" />
        <link rel="preload" as="image" href="/yurt-icon-1.svg" />
        <link rel="preload" as="image" href="/yurt-icon-2.svg" />
        <link rel="preload" as="image" href="/yurt-icon-3.svg" />
        
        {/* Inline critical CSS for faster FCP and LCP - optimized for hero section */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--primary:#4B006E;--accent:#b2a3c7;--secondary:#6d5590;--background:#F5F3FE;--vh:1vh;--font-heading:var(--font-unbounded),'Unbounded Fallback',system-ui,-apple-system,BlinkMacSystemFont,sans-serif;--font-body:var(--font-eb-garamond),'EB Garamond Fallback',Georgia,'Times New Roman',serif}*,*::before,*::after{box-sizing:border-box}html{background-color:var(--primary);font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility;font-display:swap}body{background-color:#F5F3FE;color:#333;margin:0;padding:0;font-family:var(--font-body);font-size:1.1em;min-height:100vh;font-display:swap;contain:layout style}.bg-primary{background-color:var(--primary);position:relative;overflow:hidden;transform:translateZ(0);backface-visibility:hidden;contain:layout style paint}.h-screen{height:100vh;height:calc(var(--vh, 1vh) * 100)}.text-white{color:#fff}.text-5xl{font-size:3rem;line-height:1;font-display:swap}.text-xl{font-size:1.25rem;line-height:1.75rem}.font-light{font-weight:300}.font-heading{font-family:var(--font-heading);font-display:swap;font-feature-settings:"kern" 1}.flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.relative{position:relative}.absolute{position:absolute}.container{max-width:1280px;margin:0 auto;padding:0 1rem}.sun-spot{position:absolute;width:743px;height:743px;border-radius:50%;background:radial-gradient(circle,rgba(255,236,25,1) 0%,rgba(255,215,0,0.9) 10%,rgba(250,204,21,0.7) 25%,rgba(250,204,21,0.4) 40%,rgba(200,150,50,0.2) 60%,rgba(150,100,80,0.1) 75%,rgba(75,0,110,0.05) 90%,rgba(75,0,110,0) 100%);z-index:1;pointer-events:none;transform:translate3d(0,0,0);backface-visibility:hidden;contain:layout}.sun-spot-home{bottom:-20%;left:5%}.tracking-wider{letter-spacing:0.05em}.z-20{z-index:20}.mb-4{margin-bottom:1rem}.leading-tight{line-height:1.25}.pb-32{padding-bottom:8rem}.mx-auto{margin-left:auto;margin-right:auto}.px-2{padding-left:0.5rem;padding-right:0.5rem}.text-left{text-align:left}@media (min-width:768px){.text-5xl{font-size:4.5rem}.md\\:text-7xl{font-size:4.5rem;line-height:1}.md\\:text-2xl{font-size:1.5rem;line-height:2rem}.md\\:px-4{padding-left:1rem;padding-right:1rem}.md\\:block{display:block}}@media (min-width:1024px){.lg\\:text-8xl{font-size:6rem;line-height:1}}
          `
        }} />
        
        {/* Load critical fonts with optimized strategy for faster FCP */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=optional"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=optional"
        />
        
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600&display=optional"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600&display=optional"
        />
        
        {/* SVG favicon (primary) */}
        <link rel="icon" href="/drum-favicon.svg" type="image/svg+xml" sizes="any" />
        
        {/* Apple Touch Icon (for iOS devices) - makes icon larger on Apple devices */}
        <link rel="apple-touch-icon" href="/drum-favicon.svg" sizes="180x180" />
        
        {/* Large favicon sizes for various contexts */}
        <link rel="icon" type="image/svg+xml" href="/drum-favicon.svg" sizes="192x192" />
        <link rel="icon" type="image/svg+xml" href="/drum-favicon.svg" sizes="512x512" />
        
        {/* PNG fallback for browsers that don't support SVG favicons */}
        <link rel="icon" type="image/png" href="/drum-favicon.png" sizes="32x32" />
        
        {/* Google Analytics - deferred for better performance */}
        <script defer src="https://www.googletagmanager.com/gtag/js?id=G-FV6QM4YNNN"></script>
        <script defer dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FV6QM4YNNN');
            });
          `
        }} />
      </head>
      <body className="font-serif">
        <SunAnimationHandler />
        <Navigation />
        {children}
        <LazyAnalytics />
      </body>
    </html>
  );
}
