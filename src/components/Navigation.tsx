'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Memoize the close menu function to prevent unnecessary re-renders
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  
  // Handle ESC key to close menu
  useEffect(() => {
    if (!isMenuOpen) return; // Only add listener when menu is open
    
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen, closeMenu]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isMenuOpen]);
  
  // Memoize active state calculations
  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  }, [pathname]);

  // Memoize nav link classes to prevent recalculation
  const navLinkClass = useCallback((path: string) => {
    const baseClass = "font-heading hover:text-accent transition duration-300";
    return `${baseClass} ${isActive(path) ? 'font-semibold' : 'font-normal'}`;
  }, [isActive]);

  // Memoize navigation links to prevent unnecessary re-renders
  const navigationLinks = useMemo(() => [
    { href: '/offerings', label: 'Offerings' },
    { href: '/drum-circle', label: 'Drum Circle' },
    { href: '/about', label: 'About' },
    { href: '/get-in-touch', label: 'Get in Touch' }
  ], []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-primary bg-opacity-95 flex flex-col items-center justify-center mobile-menu-overlay open"
          style={{ touchAction: 'none', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
        >
          <nav className="flex flex-col items-center space-y-8 text-xl text-white mobile-menu-nav open">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={navLinkClass(href)}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </nav>
          
        </div>
      )}

      {/* Header */}
      <header className="absolute md:absolute top-0 w-full z-50 py-4 text-white">
        <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
          <Link href="/" className="flex items-center text-white text-3xl font-light tracking-wider font-heading">
            <Image
              src="/Group 5.svg"
              alt="Drum logo"
              width={32}
              height={32}
              className="w-8 h-8 mr-3"
              style={{ filter: 'brightness(0) invert(1)' }}
              priority
            />
            Karuna
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-white">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={navLinkClass(href)}
              >
                {label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white cursor-pointer p-2"
            style={{
              touchAction: 'manipulation',
              position: 'relative',
              zIndex: 60
            }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
    </>
  );
} 