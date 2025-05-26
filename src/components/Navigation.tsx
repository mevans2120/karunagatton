'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
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
    // Define the function once for consistent reference
    const preventTouch = (e: TouchEvent) => {
      e.preventDefault();
    };
    
    if (isMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Apply styles to prevent scrolling - more robust approach
      document.documentElement.style.overflow = 'hidden'; // <html> element
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Add touch event listeners to prevent mobile scrolling
      document.addEventListener('touchmove', preventTouch, { passive: false });
      
    } else if (document.body.style.position === 'fixed') {
      // Only run this code if the body is currently fixed (menu was previously open)
      // Restore scrolling when menu is closed
      const scrollY = document.body.style.top;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Remove touch event listeners
      document.removeEventListener('touchmove', preventTouch);
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    // Cleanup function that runs when component unmounts or before effect runs again
    return () => {
      document.removeEventListener('touchmove', preventTouch);
      
      // Only clean up styles if the menu is currently open when unmounting
      if (isMenuOpen) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
    };
  }, [isMenuOpen]);
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const navLinkClass = (path: string) => {
    const baseClass = "font-heading hover:text-accent transition duration-300";
    return `${baseClass} ${isActive(path) ? 'font-semibold' : 'font-normal'}`;
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-primary bg-opacity-95 flex flex-col items-center justify-center mobile-menu-overlay open"
          style={{ touchAction: 'none' }}
        >
          <nav className="flex flex-col items-center space-y-8 text-xl text-white mobile-menu-nav open">
            <Link href="/offerings" className={navLinkClass('/offerings')} onClick={() => setIsMenuOpen(false)}>Offerings</Link>
            <Link href="/drum-circle" className={navLinkClass('/drum-circle')} onClick={() => setIsMenuOpen(false)}>Drum Circle</Link>
            <Link href="/about" className={navLinkClass('/about')} onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/get-in-touch" className={navLinkClass('/get-in-touch')} onClick={() => setIsMenuOpen(false)}>Get in Touch</Link>
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
      <header className="absolute top-0 w-full z-50 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
          <Link href="/" className="text-white text-3xl font-light tracking-wider font-heading">Karuna</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-white">
            <Link href="/offerings" className={navLinkClass('/offerings')}>Offerings</Link>
            <Link href="/drum-circle" className={navLinkClass('/drum-circle')}>Drum Circle</Link>
            <Link href="/about" className={navLinkClass('/about')}>About</Link>
            <Link href="/get-in-touch" className={navLinkClass('/get-in-touch')}>Get in Touch</Link>
          </nav>
          
          {/* Mobile Menu Button */}
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