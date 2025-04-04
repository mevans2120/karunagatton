'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function DrumCircle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Add useEffect to ensure page elements load correctly
  useEffect(() => {
    // This forces a re-render after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50 w-full">
      {/* SVG Filters */}
      <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
        <filter id="turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="25" />
        </filter>
      </svg>
      
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
        <section className="relative min-h-[80vh] flex items-center bg-primary text-white overflow-hidden">
          {/* SVG Filters */}
          <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
            <filter id="turbulence">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
              <feDisplacementMap in="SourceGraphic" scale="25" />
            </filter>
          </svg>
          
          {/* Animated yellow sun spot */}
          <div className="sun-spot sun-spot-drum-circle"></div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10 text-left py-24 pt-36">
            <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">Monthly Drum Circle</h1>
            <p className="text-xl max-w-3xl mb-6">
              Join our community gathering for healing and connection through the power of the drum.
            </p>
          </div>
        </section>
        
        {/* Wave divider as separate section */}
        <div className="relative bg-primary h-12 -mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="absolute top-0 w-full" style={{ transform: 'translateY(-80%)' }}>
            <path fill="#f5f3f7" d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,53.3C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
          </svg>
        </div>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Image and circle info sections */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="relative">
                <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/Drum-circle-image.png" 
                    alt="Drum Circle Gathering" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col justify-center">
                <h2 className="text-3xl font-light mb-6 font-heading text-primary">Join Our Circle</h2>
                <p className="text-base leading-relaxed mb-6">
                  Experience the transformative power of communal drumming in a supportive and welcoming environment. Our monthly drum circle meets on the first Tuesday of each month at 7:30pm.
                </p>
                <div className="space-y-4 mb-8">
                  <p className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3">1</span>
                    <span>No experience necessary</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3">2</span>
                    <span>Drums provided or bring your own</span>
                  </p>
                  <p className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3">3</span>
                    <span>All skill levels welcome</span>
                  </p>
                </div>
                <Link href="/get-in-touch" className="inline-flex items-center text-primary hover:text-accent transition duration-300">
                  RSVP for the next circle
                  <ChevronRight size={20} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Stacked Cards */}
            <div className="space-y-10">
              {/* What to Expect Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-3xl font-light mb-6 font-heading text-primary">What to Expect</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Each drum circle is a unique experience, guided by the energy of the group and the intention of the evening. We begin with a brief introduction and grounding meditation, then move into the drumming practice.
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-4">
                  <li>Opening ceremony and intention setting</li>
                  <li>Basic drumming techniques and rhythms</li>
                  <li>Group improvisation and connection</li>
                  <li>Healing vibrations and energy work</li>
                  <li>Closing ceremony and integration</li>
                </ul>
              </div>

              {/* Benefits Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-3xl font-light mb-6 font-heading text-primary">Benefits of Drum Circle</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Regular participation in drum circles can bring numerous benefits to your life:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-4">
                  <li>Stress reduction and relaxation</li>
                  <li>Enhanced creativity and self-expression</li>
                  <li>Improved focus and mindfulness</li>
                  <li>Community connection and support</li>
                  <li>Physical and emotional healing</li>
                </ul>
              </div>

              {/* Location Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-3xl font-light mb-6 font-heading text-primary">Location & Details</h2>
                <p className="text-lg leading-relaxed mb-6">
                  The drum circle takes place in my healing yurt in Eugene, Oregon. The space is designed to create an intimate and supportive environment for group gatherings.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4 font-heading text-primary">Next Gathering</h3>
                  <p className="mb-2">First Tuesday of the month</p>
                  <p className="mb-2">7:30pm - 9:30pm</p>
                  <p className="mb-2">Eugene, Oregon</p>
                  <p className="text-sm text-gray-600">Please arrive 10-15 minutes early to settle in</p>
                </div>
              </div>
            </div>
          </div>
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
                  <h4 className="text-lg font-medium text-white mb-4">Pages</h4>
                  <ul className="space-y-2">
                    <li><Link href="/" className="hover:text-accent transition duration-300">Home</Link></li>
                    <li><Link href="/offerings" className="hover:text-accent transition duration-300">Offerings</Link></li>
                    <li><Link href="/drum-circle" className="hover:text-accent transition duration-300">Drum Circle</Link></li>
                    <li><Link href="/about" className="hover:text-accent transition duration-300">About</Link></li>
                    <li><Link href="/get-in-touch" className="hover:text-accent transition duration-300">Get in Touch</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Connect</h4>
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