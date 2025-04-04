'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function About() {
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
          <div className="sun-spot sun-spot-about"></div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10 text-left py-24 pt-36">
            <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">About Karuna</h1>
            <p className="text-xl max-w-3xl mb-6">
              A journey of healing and spiritual guidance in Eugene, Oregon.
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
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative">
                <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="/api/placeholder/600/800" 
                    alt="Karuna Gatton" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-light mb-6 font-heading text-primary">My Journey</h2>
                <p className="text-lg leading-relaxed mb-6">
                  My path to shamanic healing began over 30 years ago, when I first discovered the profound power of connecting with spirit and nature. Through years of dedicated study and practice, I've developed a unique approach that combines traditional shamanic techniques with modern understanding.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  I've trained with indigenous healers and modern practitioners, learning to bridge ancient wisdom with contemporary life. My practice is rooted in the belief that healing happens when we reconnect with our true nature and the natural world around us.
                </p>
                <Link href="/get-in-touch" className="inline-flex items-center text-primary hover:text-accent transition duration-300">
                  Connect with me
                  <ChevronRight size={20} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Wave divider */}
            <div className="my-16 relative">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 opacity-25">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary"></path>
              </svg>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-light mb-6 font-heading text-primary">My Approach</h2>
              <p className="text-lg leading-relaxed mb-6">
                I believe that healing is a journey of rediscovery. Through shamanic practice, we work together to:
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-4">
                <li>Reconnect with your authentic self</li>
                <li>Restore lost energy and vitality</li>
                <li>Find clarity and purpose</li>
                <li>Heal past traumas</li>
                <li>Develop a deeper connection with spirit</li>
              </ul>

              {/* Wave divider */}
              <div className="my-16 relative">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 opacity-25 rotate-180">
                  <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary"></path>
                </svg>
              </div>

              <h2 className="text-3xl font-light mb-6 font-heading text-primary">The Healing Space</h2>
              <p className="text-lg leading-relaxed mb-6">
                My healing yurt in Eugene provides a sacred space for transformation. This circular structure, inspired by traditional Mongolian yurts, creates an environment that supports deep healing work. The space is carefully designed to facilitate connection with spirit while maintaining comfort and accessibility.
              </p>

              <h2 className="text-3xl font-light mb-6 font-heading text-primary">Community & Connection</h2>
              <p className="text-lg leading-relaxed mb-6">
                Beyond individual sessions, I'm committed to building community through monthly drum circles and seasonal ceremonies. These gatherings provide opportunities for shared healing and spiritual growth.
              </p>
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