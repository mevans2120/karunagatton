import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { createPortal } from 'react-dom';
import ViewAllButton from '@/components/ViewAllButton';

// Sample portrait images – now using local images from the public folder
const sampleImages = [
  {
    id: 1,
    src: '/01_Yurt with flowers.jpg',
    thumbnail: '/01_Yurt with flowers.jpg',
    alt: 'Yurt with beautiful flowers in the foreground',
    title: 'Yurt with beautiful flowers in the foreground',
  },
  {
    id: 2,
    src: '/02_Purple house from driveway.jpg',
    thumbnail: '/02_Purple house from driveway.jpg',
    alt: 'Purple house viewed from the driveway',
    title: 'Purple house viewed from the driveway',
  },
  {
    id: 3,
    src: '/03_karuna with drum.png',
    thumbnail: '/03_karuna with drum.png',
    alt: 'Karuna with ceremonial drum',
    title: 'Karuna with ceremonial drum',
  },
  {
    id: 4,
    src: '/04_Yurt from a distance.jpg',
    thumbnail: '/04_Yurt from a distance.jpg',
    alt: 'Yurt viewed from a distance',
    title: 'Yurt viewed from a distance',
  },
  {
    id: 5,
    src: '/05_Purple house up close.JPG',
    thumbnail: '/05_Purple house up close.JPG',
    alt: 'Close-up view of the purple house',
    title: 'Close-up view of the purple house',
  },
  {
    id: 6,
    src: '/Karuna.jpg',
    thumbnail: '/Karuna.jpg',
    alt: 'Portrait of Karuna Gatton',
    title: 'Portrait of Karuna Gatton',
  },
];

const PortraitCarousel = ({ images = sampleImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Navigation functions
  const goToPrevious = useCallback(() => { setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }, [images.length]);
  const goToNext = useCallback(() => { setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }, [images.length]);
  const goToSlide = (index) => { setCurrentIndex(index); };

  // Modal functions
  const openModal = (index) => { setCurrentIndex(index); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isModalOpen) return;
      switch (event.key) {
        case 'ArrowLeft': goToPrevious(); break;
        case 'ArrowRight': goToNext(); break;
        case 'Escape': closeModal(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, goToPrevious, goToNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const currentImage = images[currentIndex];

  return (
    <>
      <div className="w-full max-w-6xl mx-auto p-4">
        {/* Double column, single row grid (first 2 images only) */}
        {!isModalOpen && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {images.slice(0, 2).map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 cursor-pointer group"
                  onClick={() => openModal(index)}
                >
                  <Image src={image.thumbnail} alt={image.alt} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end">
                    <div className="p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-medium">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <ViewAllButton onClick={() => openModal(0)} />
            </div>
          </>
        )}
        {/* No bottom navigation needed */}
      </div>
      {/* Modal - now rendered via portal */}
      {isModalOpen && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
          <div className="relative w-full h-full flex flex-col">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="text-white">
                <h3 className="text-lg font-semibold">{currentImage.title}</h3>
                <p className="text-sm opacity-75">{currentIndex + 1} of {images.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={closeModal} className="p-2 text-white hover:bg-white/20 rounded-full transition-colors" title="Close">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-[90vw] max-w-2xl aspect-[3/4]">
                <Image src={currentImage.src} alt={currentImage.alt} fill className="object-contain" priority onLoadStart={() => setIsLoading(true)} onLoad={() => setIsLoading(false)} />
                {isLoading && ( <div className="absolute inset-0 flex items-center justify-center bg-gray-100"> <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div> </div> )}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-colors" title="Previous image">
              <ChevronLeft size={24} />
            </button>
            <button onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-white/20 rounded-full transition-colors" title="Next image">
              <ChevronRight size={24} />
            </button>

            {/* Bottom Thumbnail Carousel */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-center p-4 space-x-2 overflow-x-auto">
                {images.map((image, index) => ( <button key={image.id} onClick={() => goToSlide(index)} className={`flex-shrink-0 relative w-16 h-20 rounded overflow-hidden transition-all duration-200 ${index === currentIndex ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-80'}`}><Image src={image.thumbnail} alt={image.alt} fill className="object-cover" sizes="64px" /></button> ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PortraitCarousel; 