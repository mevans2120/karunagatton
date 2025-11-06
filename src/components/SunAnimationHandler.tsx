'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SunAnimationHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Delay animation to prioritize initial render
    const timeoutId = setTimeout(() => {
      const sunSpots = document.querySelectorAll('.sun-spot');
      if (sunSpots.length === 0) return; // Early exit if no sun spots

      // Use requestIdleCallback for better performance (with fallback)
      const animate = () => {
        sunSpots.forEach(spot => {
          spot.classList.remove('animate');
          requestAnimationFrame(() => {
            spot.classList.add('animate');
          });
        });
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(animate, { timeout: 500 });
      } else {
        requestAnimationFrame(animate);
      }
    }, 300); // Increased delay to prioritize content rendering

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Re-run whenever the route changes

  return null;
}