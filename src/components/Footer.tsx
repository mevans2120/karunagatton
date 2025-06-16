'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-footer text-gray-300 py-12 relative overflow-hidden">
      {/* SVG Filters for sun spot */}
      <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
        <filter id="turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="25" />
        </filter>
      </svg>
      
      {/* Sun spot animation */}
      <div className="sun-spot sun-spot-footer"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0 fade-in-section">
            <h3 className="text-2xl font-light text-white mb-4 font-heading flex items-center">
              <Image
                src="/Group 5.svg"
                alt="Drum logo"
                width={24}
                height={24}
                className="w-6 h-6 mr-3"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              Karuna
            </h3>
            <p className="max-w-xs">Shamanic healing in Eugene, Oregon and beyond through remote sessions.</p>
          </div>
          
          <nav className="grid grid-cols-2 md:grid-cols-3 gap-8 fade-in-section">
            <div>
              <h4 className="text-lg font-medium text-white mb-4 font-heading">Pages</h4>
              <ul className="space-y-2 list-none">
                <li><Link href="/offerings" className="hover:text-accent transition duration-300">Offerings</Link></li>
                <li><Link href="/drum-circle" className="hover:text-accent transition duration-300">Drum Circle</Link></li>
                <li><Link href="/about" className="hover:text-accent transition duration-300">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4 font-heading">Connect</h4>
              <address className="not-italic space-y-2">
                <p> 2826 Floral Hill Drive</p>
                <p>Eugene, Oregon 97405</p>
                <p>
                  <Link href="/get-in-touch" className="hover:text-accent transition duration-300">
                    Get in Touch
                  </Link>
                </p>
              </address>
            </div>
          </nav>
        </div>
        
        <div className="mt-12 pt-8 text-center text-sm fade-in-section">
          <p>&copy; {new Date().getFullYear()} Karuna Gatton. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 