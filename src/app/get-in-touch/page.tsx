'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function GetInTouch() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set loaded state after mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Add useEffect to ensure page elements load correctly
  useEffect(() => {
    // This forces a re-render after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen text-gray-800 bg-primary w-full ${!isLoaded ? 'initial-load' : ''}`}>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-primary bg-opacity-95 flex flex-col items-center justify-center mobile-menu-overlay open">
          <nav className="flex flex-col items-center space-y-8 text-xl text-white mobile-menu-nav open">
            <Link href="/" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/offerings" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>Offerings</Link>
            <Link href="/drum-circle" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>Drum Circle</Link>
            <Link href="/about" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/get-in-touch" className="hover:text-accent transition duration-300" onClick={() => setIsMenuOpen(false)}>Get in Touch</Link>
          </nav>
          
          {/* Close button that's always visible */}
          <div 
            onClick={() => setIsMenuOpen(false)}
            className="mobile-menu-open-button cursor-pointer"
          >
            <X size={24} color="white" />
          </div>
        </div>
      )}
    
      {/* Main content wrapper with page transition */}
      <div className="page-content">
        {/* Header */}
        <header className="absolute top-0 w-full z-50 p-4">
          <div className="container mx-auto flex items-center justify-between px-2 md:px-4">
            <Link href="/" className="text-white text-3xl font-light tracking-wider font-heading">Karuna</Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 text-white">
              <Link href="/" className="hover:text-accent transition duration-300">Home</Link>
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
        
        {/* Hero Section with Wavy Pattern */}
        <section className="relative min-h-[50vh] flex items-center bg-primary text-white overflow-hidden">
          {/* SVG Filters */}
          <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
            <filter id="turbulence">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
              <feDisplacementMap in="SourceGraphic" scale="25" />
            </filter>
          </svg>
          
          {/* Animated yellow sun spot */}
          <div className="sun-spot sun-spot-contact"></div>
          
          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10 text-left py-24">
            <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">Get in Touch</h1>
            <p className="text-xl max-w-3xl mb-6">
              Whether you have questions, want to schedule a session, or need directions to the yurt — Karuna is here to connect with you.
            </p>
          </div>
        </section>
        
        {/* Wave divider as separate section */}
        <div className="relative bg-primary h-12 -mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="absolute top-0 w-full" style={{ transform: 'translateY(-80%)' }}>
            <path fill="#f5f3f7" d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,53.3C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
          </svg>
        </div>
        
        {/* Contact Form */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <style jsx>{`
              /* Formspree styles */
              .fs-form {
                display: grid;
                row-gap: 1.5rem;
              }
              
              .fs-field {
                display: flex;
                flex-direction: column;
                row-gap: 0.5rem;
              }
              
              .fs-label {
                color: var(--color-text-default);
                display: block;
                font-family: var(--font-family-heading);
                font-size: 1rem;
                line-height: 1.25rem;
              }
              
              .fs-description {
                color: var(--color-text-muted);
                display: block;
                font-size: 0.875rem;
                line-height: 1.25rem;
                opacity: 0.8;
              }
              
              .fs-button-group {
                display: flex;
                flex-direction: row-reverse;
                column-gap: 1.5rem;
              }
              
              .fs-input {
                appearance: none;
                border-radius: 9999px;
                border-width: 0;
                box-shadow: #d1d1d1 0 0 0 1px inset;
                color: var(--color-text-default);
                font-size: 1rem;
                height: 3rem;
                line-height: 1.5rem;
                outline: none;
                padding-left: 1rem;
                padding-right: 1rem;
              }
              
              .fs-input:focus-visible {
                box-shadow: var(--primary) 0 0 0 1px inset;
              }
              
              .fs-button {
                background-color: var(--primary);
                border-radius: 9999px;
                color: white;
                cursor: pointer;
                font-size: 1.125rem;
                font-weight: 600;
                line-height: 1.5rem;
                padding: 0.75rem 2rem;
                transition-duration: 200ms;
                transition-property: background-color;
                transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              }
              
              .fs-button:hover {
                background-color: var(--primary);
                opacity: 0.9;
              }
              
              .fs-textarea {
                appearance: none;
                border-radius: 0.75rem;
                border-width: 0;
                box-shadow: #d1d1d1 0 0 0 1px inset;
                color: var(--color-text-default);
                font-size: 1rem;
                line-height: 1.5rem;
                outline: none;
                padding: 0.75rem 1rem;
                resize: vertical;
                min-height: 10rem;
              }
              
              .fs-textarea:focus-visible {
                box-shadow: var(--primary) 0 0 0 1px inset;
              }
            `}</style>

            <form 
              action="https://formspree.io/f/yourFormID" // Replace with actual Formspree endpoint
              className="fs-form"
              target="_top"
              method="POST"
            >
              <div className="fs-field">
                <label className="fs-label" htmlFor="name">Your Name</label>
                <input className="fs-input" id="name" name="name" required />
              </div>
              
              <div className="fs-field">
                <label className="fs-label" htmlFor="email">Email</label>
                <input className="fs-input" id="email" name="email" required />
                <p className="fs-description">
                  This will help me respond to your query via an email.
                </p>
              </div>
              
              <div className="fs-field">
                <label className="fs-label" htmlFor="message">Message</label>
                <textarea
                  className="fs-textarea"
                  id="message"
                  name="message"
                  required
                ></textarea>
                <p className="fs-description">What would you like to discuss?</p>
              </div>
              
              <div className="fs-button-group">
                <button className="fs-button" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </section>
        
        {/* Divider Wave */}
        <section className="bg-gray-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-50"></path>
            </svg>
          </div>
          <div className="h-24"></div>
        </section>
        
        {/* Directions */}
        <section className="py-24 px-4 bg-purple-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-64 h-64 mx-auto mb-16">
              <img 
                src="/yurt-icon-9.svg" 
                alt="Yurt location" 
                className="w-full h-full" 
                width="190"
                height="190"
                style={{ filter: 'invert(13%) sepia(88%) saturate(2651%) hue-rotate(257deg) brightness(86%) contrast(116%)' }}
              />
            </div>
            <h2 className="text-3xl font-light text-primary mb-6 font-heading">Visit the Yurt</h2>
            <p className="text-lg text-gray-700 mb-8">
              Karuna's yurt is nestled in a peaceful part of Eugene, Oregon. Directions will be provided upon scheduling to protect the privacy and sacredness of the space.
            </p>
          </div>
        </section>
        
        {/* Bottom Wave */}
        <section className="bg-purple-50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24" style={{ transform: 'rotate(180deg)' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
            </svg>
          </div>
          <div className="h-24"></div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="md:flex md:justify-between">
              <div className="mb-8 md:mb-0">
                <h3 className="text-2xl font-light text-white mb-4 font-heading">Karuna</h3>
                <p className="max-w-xs">Shamanic healing in Eugene, Oregon and beyond through remote sessions.</p>
              </div>
              
              <nav className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 font-heading">Pages</h4>
                  <ul className="space-y-2">
                    <li><Link href="/" className="hover:text-accent transition duration-300">Home</Link></li>
                    <li><Link href="/offerings" className="hover:text-accent transition duration-300">Offerings</Link></li>
                    <li><Link href="/drum-circle" className="hover:text-accent transition duration-300">Drum Circle</Link></li>
                    <li><Link href="/about" className="hover:text-accent transition duration-300">About</Link></li>
                    <li><Link href="/get-in-touch" className="hover:text-accent transition duration-300">Get in Touch</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-4 font-heading">Connect</h4>
                  <address className="not-italic space-y-2">
                    <p>Eugene, Oregon</p>
                    <p>
                      <a href="mailto:contact@karunagatton.com" className="hover:text-accent transition duration-300">
                        contact@karunagatton.com
                      </a>
                    </p>
                  </address>
                </div>
              </nav>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
              <p>&copy; {new Date().getFullYear()} Karuna Gatton. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 