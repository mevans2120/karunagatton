import React from 'react';
import { createPortal } from 'react-dom';

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen || typeof window === 'undefined') return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 999998
        }}
      />
      {/* Modal Content */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 999999,
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: '8px'
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export default SimpleModal;