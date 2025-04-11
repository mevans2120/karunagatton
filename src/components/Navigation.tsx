'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
    } else {
      // Restore scrolling when menu is closed
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      // Clean up styles if component unmounts
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isMenuOpen]);
  
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-primary bg-opacity-95 flex flex-col items-center justify-center mobile-menu-overlay open"
          style={{ touchAction: 'none' }}  // Prevent default touch behaviors
        >
          <nav className="flex flex-col items-center space-y-8 text-xl text-white mobile-menu-nav open">
            <Link href="/offerings" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>Offerings</Link>
            <Link href="/drum-circle" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>Drum Circle</Link>
            <Link href="/about" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/get-in-touch" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>Get in Touch</Link>
          </nav>
          
          {/* Close button that's always visible */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="mobile-menu-open-button cursor-pointer absolute top-6 right-6"
          >
            <X size={24} color="white" />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="absolute top-0 w-full z-50 p-4">
        <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
          <Link href="/" className="text-white text-3xl font-light tracking-wider font-heading">Karuna</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-white">
            <Link href="/offerings" className="hover:text-accent transition duration-300">Offerings</Link>
            <Link href="/drum-circle" className="hover:text-accent transition duration-300">Drum Circle</Link>
            <Link href="/about" className="hover:text-accent transition duration-300">About</Link>
            <Link href="/get-in-touch" className="hover:text-accent transition duration-300">Get in Touch</Link>
          </nav>
          
          {/* Mobile Menu Button - Toggle between hamburger and X */}
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white cursor-pointer p-4"
            style={{
              touchAction: 'manipulation',
              position: 'relative',
              zIndex: 60
            }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </header>
    </>
  );
} 