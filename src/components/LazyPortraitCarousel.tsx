'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Lazy load the PortraitCarousel component with loading fallback
const PortraitCarousel = dynamic(() => import('./PortraitCarousel'), {
  loading: () => (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-200 animate-pulse"
          >
            <div className="w-full h-full bg-gray-300"></div>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <div className="inline-block px-6 py-3 bg-gray-300 rounded-full animate-pulse w-32 h-12"></div>
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for this component to reduce initial bundle size
});

type PortraitCarouselProps = ComponentProps<typeof PortraitCarousel>;

export default function LazyPortraitCarousel(props: PortraitCarouselProps) {
  return <PortraitCarousel {...props} />;
}