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
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-primary bg-opacity-95 flex flex-col items-center justify-center">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={30} />
          </button>
          <nav className="flex flex-col items-center space-y-8 text-xl text-white">
            <Link href="/" className="hover:text-accent transition duration-300">Home</Link>
            <Link href="/offerings" className="hover:text-accent transition duration-300">Offerings</Link>
            <Link href="/drum-circle" className="hover:text-accent transition duration-300">Drum Circle</Link>
            <Link href="/about" className="hover:text-accent transition duration-300">About</Link>
            <Link href="/get-in-touch" className="hover:text-accent transition duration-300">Get in Touch</Link>
          </nav>
        </div>
      )}
    
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
          
          {/* Mobile Menu Button */}
          <div 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden text-white cursor-pointer"
            aria-label="Open menu"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </div>
        </div>
      </header>
      
      {/* Hero Section with Wavy Pattern */}
      <section className="relative min-h-[80vh] flex items-center bg-primary text-white overflow-hidden animate-gradient">
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
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/api/placeholder/600/800" 
                  alt="Drum Circle Gathering" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-light mb-6 font-heading text-primary">Join Our Circle</h2>
              <p className="text-lg leading-relaxed mb-6">
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

          {/* Wave divider */}
          <div className="my-16 relative">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 opacity-25">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary"></path>
            </svg>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-light mb-6 font-heading text-primary">What to Expect</h2>
            <p className="text-lg leading-relaxed mb-6">
              Each drum circle is a unique experience, guided by the energy of the group and the intention of the evening. We begin with a brief introduction and grounding meditation, then move into the drumming practice.
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-4">
              <li>Opening ceremony and intention setting</li>
              <li>Basic drumming techniques and rhythms</li>
              <li>Group improvisation and connection</li>
              <li>Healing vibrations and energy work</li>
              <li>Closing ceremony and integration</li>
            </ul>

            {/* Wave divider */}
            <div className="my-16 relative">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 opacity-25 rotate-180">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary"></path>
              </svg>
            </div>

            <h2 className="text-3xl font-light mb-6 font-heading text-primary">Benefits of Drum Circle</h2>
            <p className="text-lg leading-relaxed mb-6">
              Regular participation in drum circles can bring numerous benefits to your life:
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-4">
              <li>Stress reduction and relaxation</li>
              <li>Enhanced creativity and self-expression</li>
              <li>Improved focus and mindfulness</li>
              <li>Community connection and support</li>
              <li>Physical and emotional healing</li>
            </ul>

            <h2 className="text-3xl font-light mb-6 font-heading text-primary">Location & Details</h2>
            <p className="text-lg leading-relaxed mb-6">
              The drum circle takes place in my healing yurt in Eugene, Oregon. The space is designed to create an intimate and supportive environment for group gatherings.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-4 font-heading text-primary">Next Gathering</h3>
              <p className="mb-2">First Tuesday of the month</p>
              <p className="mb-2">7:30pm - 9:30pm</p>
              <p className="mb-2">Eugene, Oregon</p>
              <p className="text-sm text-gray-600">Please arrive 10-15 minutes early to settle in</p>
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
  );
} 