'use client';

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

export default function LazyAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay analytics loading until after initial page load
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <Analytics />;
}