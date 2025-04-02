'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DrumCircle() {
  return (
    <div className="min-h-screen text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="bg-[#301934] text-white py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-3xl font-light tracking-wider">Karuna</Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-[#b2a3c7] transition duration-300">Home</Link>
              <Link href="/offerings" className="hover:text-[#b2a3c7] transition duration-300">Offerings</Link>
              <Link href="/drum-circle" className="hover:text-[#b2a3c7] transition duration-300">Drum Circle</Link>
              <Link href="/about" className="hover:text-[#b2a3c7] transition duration-300">About</Link>
              <Link href="/get-in-touch" className="hover:text-[#b2a3c7] transition duration-300">Get in Touch</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-[#301934] text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-light mb-6">Monthly Drum Circle</h1>
          <p className="text-xl max-w-2xl">Join our community gathering for healing and connection through the power of the drum</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
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
              <h2 className="text-3xl font-light mb-6">Join Our Circle</h2>
              <p className="text-lg leading-relaxed mb-6">
                Experience the transformative power of communal drumming in a supportive and welcoming environment. Our monthly drum circle meets on the first Tuesday of each month at 7:30pm.
              </p>
              <div className="space-y-4 mb-8">
                <p className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#301934] text-white flex items-center justify-center mr-3">1</span>
                  <span>No experience necessary</span>
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#301934] text-white flex items-center justify-center mr-3">2</span>
                  <span>Drums provided or bring your own</span>
                </p>
                <p className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[#301934] text-white flex items-center justify-center mr-3">3</span>
                  <span>All skill levels welcome</span>
                </p>
              </div>
              <Link href="/get-in-touch" className="inline-flex items-center text-[#533e72] hover:text-[#301934] transition duration-300">
                RSVP for the next circle
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-light mb-6">What to Expect</h2>
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

            <h2 className="text-3xl font-light mb-6">Benefits of Drum Circle</h2>
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

            <h2 className="text-3xl font-light mb-6">Location & Details</h2>
            <p className="text-lg leading-relaxed mb-6">
              The drum circle takes place in my healing yurt in Eugene, Oregon. The space is designed to create an intimate and supportive environment for group gatherings.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Next Gathering</h3>
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
              <h3 className="text-2xl font-light text-white mb-4">Karuna</h3>
              <p className="max-w-xs">Shamanic healing in Eugene, Oregon and beyond through remote sessions.</p>
            </div>
            
            <nav className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Pages</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-[#b2a3c7] transition duration-300">Home</Link></li>
                  <li><Link href="/offerings" className="hover:text-[#b2a3c7] transition duration-300">Offerings</Link></li>
                  <li><Link href="/drum-circle" className="hover:text-[#b2a3c7] transition duration-300">Drum Circle</Link></li>
                  <li><Link href="/about" className="hover:text-[#b2a3c7] transition duration-300">About</Link></li>
                  <li><Link href="/get-in-touch" className="hover:text-[#b2a3c7] transition duration-300">Get in Touch</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Connect</h4>
                <address className="not-italic space-y-2">
                  <p>Eugene, Oregon</p>
                  <p>
                    <a href="mailto:contact@karunagatton.com" className="hover:text-[#b2a3c7] transition duration-300">
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