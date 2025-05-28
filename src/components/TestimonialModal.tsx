import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    quote: string;
    author: string;
  };
}

const TestimonialModal: React.FC<TestimonialModalProps> = ({ isOpen, onClose, testimonial }) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-[90vw] max-w-2xl bg-white rounded-lg p-8 shadow-xl max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close testimonial"
        >
          <X size={24} />
        </button>

        {/* Testimonial content */}
        <div className="mt-4">
          <div className="text-secondary text-4xl mb-6">❝</div>
          {testimonial.quote.split('\n\n').map((para, idx) => (
            <p key={idx} className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 last:mb-0">
              {para}
            </p>
          ))}
          <p className="font-medium text-primary text-right text-lg">
            ― {testimonial.author}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TestimonialModal; 