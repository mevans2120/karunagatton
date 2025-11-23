import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';

// Sample portrait images – now using optimized WebP images
const sampleImages = [
  {
    id: 1,
    src: '/01_Yurt_In_Spring.webp',
    thumbnail: '/01_Yurt_In_Spring-640w.webp',
    alt: 'Yurt in spring setting',
    title: 'Yurt in spring setting',
  },
  {
    id: 2,
    src: '/02_Karuna_Yurt.webp',
    thumbnail: '/02_Karuna_Yurt-640w.webp',
    alt: "Karuna's yurt",
    title: "Karuna's yurt",
  },
  {
    id: 3,
    src: '/03_path_to_yurt.webp',
    thumbnail: '/03_path_to_yurt-640w.webp',
    alt: 'Path leading to the yurt',
    title: 'Path leading to the yurt',
  },
  {
    id: 4,
    src: '/04_Yurt from a distance.webp',
    thumbnail: '/04_Yurt from a distance-640w.webp',
    alt: 'Yurt viewed from a distance',
    title: 'Yurt viewed from a distance',
  },
  {
    id: 5,
    src: '/05_Purple house up close.webp',
    thumbnail: '/05_Purple house up close-640w.webp',
    alt: 'Close-up view of the purple house',
    title: 'Close-up view of the purple house',
  }
];

const PortraitCarousel = ({ images = sampleImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Navigation functions
  const goToPrevious = useCallback(() => { setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }, [images.length]);
  const goToNext = useCallback(() => { setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }, [images.length]);
  const goToSlide = (index: number) => { setCurrentIndex(index); };

  // Modal functions
  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => { setIsModalOpen(false); };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

  // Prevent body scroll when modal is open and ensure proper positioning
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      // Force body to not have any transforms that could break fixed positioning
      document.body.style.transform = 'none';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.transform = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.transform = '';
      document.documentElement.style.overflow = '';
    };
  }, [isModalOpen]);

  const currentImage = images[currentIndex];

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Double column, single row grid (first 2 images only) */}
        {!isModalOpen && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {images.slice(0, 2).map((image, index: number) => (
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
              <Button onClick={() => openModal(0)}>
                View All
              </Button>
            </div>
          </>
        )}
        {/* No bottom navigation needed */}
      </div>
      {/* Modal - now rendered via portal */}
      {isModalOpen && typeof window !== 'undefined' && createPortal(
        <div
          data-modal-root="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            background: 'rgba(0,0,0,0.5)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            flexShrink: 0,
            zIndex: 10
          }}>
            <div style={{ color: 'white' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0 }}>{currentImage.title}</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.75, margin: 0 }}>{currentIndex + 1} of {images.length}</p>
            </div>
            <button onClick={closeModal} style={{
              padding: '0.5rem',
              color: 'white',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            title="Close (ESC)">
              <X size={20} />
            </button>
          </div>

          {/* Main Image Container */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            minHeight: 0,
            padding: '2rem',
            overflow: 'hidden'
          }}>
            {/* Image wrapper - smaller size */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '500px',  // Reduced from 672px
              height: '100%',
              maxHeight: '667px',  // 500px * 4/3 aspect ratio
              aspectRatio: '3/4'
            }}>
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%'
                }}
                sizes="(max-width: 768px) 80vw, 500px"
                priority
              />
            </div>

            {/* Navigation Arrows */}
            <button onClick={goToPrevious} style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '0.75rem',
              color: 'white',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              borderRadius: '50%',
              transition: 'all 0.2s',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            title="Previous (←)">
              <ChevronLeft size={24} />
            </button>
            <button onClick={goToNext} style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '0.75rem',
              color: 'white',
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              borderRadius: '50%',
              transition: 'all 0.2s',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.7)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            title="Next (→)">
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Thumbnails */}
          <div style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            overflowX: 'auto',
            flexShrink: 0
          }}>
            {images.map((image, index: number) => (
              <button key={image.id} onClick={() => goToSlide(index)} style={{
                position: 'relative',
                width: '4.5rem',
                height: '6rem',
                border: index === currentIndex ? '3px solid white' : '2px solid transparent',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                opacity: index === currentIndex ? 1 : 0.5,
                cursor: 'pointer',
                padding: 0,
                background: 'rgba(0,0,0,0.3)',
                transition: 'all 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}>
                <Image
                  src={image.thumbnail}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default PortraitCarousel; 