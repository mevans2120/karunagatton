'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function DrumCircle() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set loaded state after mount to trigger dissolve effect
  useEffect(() => {
    // Short timeout to ensure purple background is visible first
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50); // Just enough delay to ensure the purple bg shows first
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add useEffect to ensure page elements load correctly and handle fade-in animations
  useEffect(() => {
    // This forces a re-render after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      clearTimeout(timer);
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-800 w-full">
      {/* SVG Filters */}
      <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
        <filter id="turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="25" />
        </filter>
      </svg>
      
      {/* Main content wrapper */}
      <div className="page-content">
        {/* Navigation */}
        <Navigation />
        
        {/* Hero Section with Wavy Pattern */}
        <section className="relative h-[400px] flex items-center bg-primary text-white overflow-hidden">
          {/* SVG Filters */}
          <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
            <filter id="turbulence">
              <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
              <feDisplacementMap in="SourceGraphic" scale="25" />
            </filter>
          </svg>
          {/* Animated yellow sun spot */}
          <div className="sun-spot sun-spot-drum-circle z-10"></div>
          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-20 text-left py-24 pt-36">
            <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">Drum Circle</h1>
            <p className="text-xl max-w-3xl mb-6">
              Join the 30 year running Casa del Sol
              Drum and Journey Circle for healing and connection.
            </p>
          </div>
          {/* Wavy white bar at the bottom, in front of sun spot */}
          <svg className="absolute bottom-0 left-0 w-full z-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f9fafb" d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,53.3C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" />
          </svg>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-2 max-w-4xl">
            {/* Image and circle info sections */}
            <div className="grid md:grid-cols-2 gap-4 mb-10 mt-[50px] fade-in-section">
              <div className="relative w-full">
                <div className="w-full h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="/Photo of Yurt.webp"
                    alt="Karuna's Healing Yurt"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority={true}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col justify-center w-full">
                <h2 className="text-3xl font-light mb-6 font-heading text-primary">New to the Journey Process?</h2>
                <p className="space-y-4 mb-8">
                  Experience the transformative power of communal drumming in a supportive and welcoming environment. You may come 30 minutes early for instruction to help you begin your practice.
                </p>
                <div className="space-y-4 mb-8">
                 
                  <div className="flex items-start">
                    <span className="text-lg leading-relaxed">We reccomend an appointment for newcomers to learn more about the Journey Process:</span>
                  </div>
                
                </div>
                <Link href="/get-in-touch" className="inline-flex items-center text-primary hover:text-accent transition duration-300">
                  Get in touch
                  <ChevronRight size={20} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Stacked Cards */}
            <div className="space-y-24 max-w-4xl mx-auto">
              {/* Location Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm fade-in-section mt-10">
                <h2 className="text-3xl font-light mb-6 font-heading text-primary">Location & Details</h2>
                <p className="text-lg leading-relaxed mb-6">
                  The drum circle takes place in Karuna's healing yurt in Eugene, Oregon. The space is designed to create an intimate and supportive environment for group gatherings. Suggested donation is $10 - 20 dollars.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="mb-4">
                    <p className="mb-1">First Tuesday of the month</p>
                    <p className="mb-0">7:30pm - 9:30pm</p>
                  </div>
                  <div className="mb-4">
                    <p className="mb-1">2826 Floral Hill Drive</p>
                    <p className="mb-0">Eugene, Oregon 97405</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-0">Please arrive 10-15 minutes early to settle in</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
} 