'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SunAnimationHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Debounce animation to prevent excessive re-runs
    let timeoutId: NodeJS.Timeout;
    
    const startSunAnimation = () => {
      const sunSpots = document.querySelectorAll('.sun-spot');
      if (sunSpots.length === 0) return; // Early exit if no sun spots
      
      sunSpots.forEach(spot => {
        // Remove existing animate class first to reset animation
        spot.classList.remove('animate');
        // Use requestAnimationFrame to ensure the class removal is processed
        requestAnimationFrame(() => {
          spot.classList.add('animate');
        });
      });
    };

    // Debounce the animation start to avoid excessive calls
    timeoutId = setTimeout(() => {
      requestAnimationFrame(startSunAnimation);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname]); // Re-run whenever the route changes

  return null;
}