'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-footer text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0 fade-in-section">
            <h3 className="text-2xl font-light text-white mb-4 font-heading">Karuna</h3>
            <p className="max-w-xs">Shamanic healing in Eugene, Oregon and beyond through remote sessions.</p>
          </div>
          
          <nav className="grid grid-cols-2 md:grid-cols-3 gap-8 fade-in-section">
            <div>
              <h4 className="text-lg font-medium text-white mb-4 font-heading">Pages</h4>
              <ul className="space-y-2 list-none">
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
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm fade-in-section">
          <p>&copy; {new Date().getFullYear()} Karuna Gatton. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 