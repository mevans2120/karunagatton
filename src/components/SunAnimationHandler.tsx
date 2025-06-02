'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SunAnimationHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Global sun spot animation logic
    const startSunAnimation = () => {
      const sunSpots = document.querySelectorAll('.sun-spot');
      sunSpots.forEach(spot => {
        // Remove existing animate class first to reset animation
        spot.classList.remove('animate');
        // Use requestAnimationFrame to ensure the class removal is processed
        requestAnimationFrame(() => {
          spot.classList.add('animate');
        });
      });
    };

    // Start sun animation immediately for visual impact
    requestAnimationFrame(startSunAnimation);
  }, [pathname]); // Re-run whenever the route changes

  return null;
} 