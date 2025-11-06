'use client';

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

export default function LazyAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    let loaded = false;

    // Load analytics after user interaction or after 3 seconds
    const loadAnalytics = () => {
      if (!loaded) {
        loaded = true;
        setShouldLoad(true);
      }
    };

    // Load on first user interaction
    const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
    events.forEach(event => {
      window.addEventListener(event, loadAnalytics, { once: true, passive: true });
    });

    // Or after 3 seconds as fallback
    const timer = setTimeout(loadAnalytics, 3000);

    return () => {
      clearTimeout(timer);
      events.forEach(event => {
        window.removeEventListener(event, loadAnalytics);
      });
    };
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <Analytics />;
}