'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function About() {
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
          <h1 className="text-4xl md:text-5xl font-light mb-6">About Karuna</h1>
          <p className="text-xl max-w-2xl">A journey of healing and spiritual guidance in Eugene, Oregon</p>
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
                  alt="Karuna Gatton" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-light mb-6">My Journey</h2>
              <p className="text-lg leading-relaxed mb-6">
                My path to shamanic healing began over 30 years ago, when I first discovered the profound power of connecting with spirit and nature. Through years of dedicated study and practice, I've developed a unique approach that combines traditional shamanic techniques with modern understanding.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                I've trained with indigenous healers and modern practitioners, learning to bridge ancient wisdom with contemporary life. My practice is rooted in the belief that healing happens when we reconnect with our true nature and the natural world around us.
              </p>
              <Link href="/get-in-touch" className="inline-flex items-center text-[#533e72] hover:text-[#301934] transition duration-300">
                Connect with me
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-light mb-6">My Approach</h2>
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

            <h2 className="text-3xl font-light mb-6">The Healing Space</h2>
            <p className="text-lg leading-relaxed mb-6">
              My healing yurt in Eugene provides a sacred space for transformation. This circular structure, inspired by traditional Mongolian yurts, creates an environment that supports deep healing work. The space is carefully designed to facilitate connection with spirit while maintaining comfort and accessibility.
            </p>

            <h2 className="text-3xl font-light mb-6">Community & Connection</h2>
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