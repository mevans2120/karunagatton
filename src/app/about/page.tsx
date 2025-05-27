'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function About() {
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
    <div className={`purple-dissolve${isLoaded ? ' is-loaded' : ''}`}>
      <div className="min-h-screen text-gray-800 w-full">
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
            <div className="sun-spot sun-spot-about z-10"></div>
            {/* Hero Content */}
            <div className="container mx-auto px-4 relative z-20 text-left py-24 pt-36">
              <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">About Karuna</h1>
              <p className="text-xl max-w-3xl mb-6">
              Karuna found deep healing through Shamanic practices. She was guided first by Spirit, then refined her practice through formal training. What began as a personal journey evolved into a calling. 
              </p>
            </div>
            {/* Wavy white bar at the bottom, in front of sun spot */}
            <svg className="absolute bottom-0 left-0 w-full z-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
              <path fill="#f5f3f7" d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,53.3C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" />
            </svg>
          </section>
          
          {/* Main Content */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="grid gap-12 mb-16 mt-6">
                <div className="relative">
                  <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="/Karuna in front of yurt.jpg" 
                      alt="Karuna Gatton in front of her healing yurt" 
                      width={800}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h2 className="text-3xl font-light mb-6 font-heading text-primary">My Journey</h2>
                  <p className="text-lg leading-relaxed mb-6">
                    Like many people who are drawn to Shamanic healing, my journey began after a car accident that left me with PTSD.
                    For over a year, I struggled with intense anxiety and nightly panic attacks.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    I sought out a soul retrieval from a local shaman. But the experience didn't bring the healing I had hoped for. Normally, a power animal would be retrieved alongside the soul parts, but that didn't happen for me.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Nearly two weeks later, I was able to see another shamanic healer, who did a power animal retrieval ceremony. As I lay down for the session, I saw a hawk in my mind's eye. I thought, even if he brings back a different helper, I know Hawk is mine.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    And he did bring back a hawk. It was powerful. It was validating.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    A few days later, I remembered: I had an ally. I could call on Hawk.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    At that time, I was still waking every night in fear and panic. My partner would help calm me back to sleep. But one night, I remembered Hawk—and the moment I did, I felt myself lifted up. I merged with Hawk. A prayer came into my mind:
                  </p>
                  <p className="text-lg leading-relaxed mb-6 italic">
                    I am the Hawk. I see with the Hawk's eye view.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    It brought me so much comfort. I kept repeating it until I fell into a peaceful sleep. I did that for two more nights.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    After that… it never happened again. I never woke in fear. That was my first miracle from this work.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    I had already learned the journey process, so I began journeying every day. The journeys healed me completely from PTSD. And as I healed, Spirit began teaching me how to do Shamanic healing work myself.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Eventually, I began taking workshops and reading everything I could find about Shamanism. To my surprise, I discovered that many of the techniques I had been taught by Spirit were the same ones I found in those trainings.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    I was also lucky. At that time, shamans from many cultures and countries were coming to Eugene and Portland to offer workshops. It was a rich time for our Shamanic community—and many of us are still connected, still growing together.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Because my first exposure to healing was so fragmented and painful, I made a promise to offer something more complete, more grounded, when I began my own healing practice.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Today, I offer a thorough, 3.5-hour healing empowerment ceremony. It includes soul retrieval, extraction, an illumination ceremony, depossession if needed, and power animal retrieval.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    I also teach each person how to journey. We do two practice journeys together—where deep healing and powerful teachings often arise.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    When the ceremony is complete, we take time to write everything down, so the person has a full record of the experience.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    I feel so honored and privileged to do this work—to be a conduit for Spirit.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    I look forward to being in service to you.
                  </p>
                  <Link href="/get-in-touch" className="inline-flex items-center text-primary hover:text-accent transition duration-300">
                    Connect with me
                    <ChevronRight size={20} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
} 