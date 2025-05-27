'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Offerings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  
  // Empowerment Ceremonies data
  const empowermentCeremonies = [
    {
      title: "Soul Retrieval",
      description: "A soul retrieval ceremony helps recover lost soul parts that have separated due to trauma, difficult life experiences, or grief. These soul parts carry with them vital energy and essence needed for wholeness. Through shamanic journeying, Karuna locates and returns these soul parts, facilitating healing and integration.",
      icon: "/yurt-icon-1.svg"
    },
    {
      title: "Soul Part Integration",
      description: "After a soul retrieval, this ceremony offers continued support as you welcome home and integrate the returned soul parts. Integration is a gentle process of honoring these aspects of yourself and creating space for them in your present life.",
      icon: "/yurt-icon-2.svg"
    },
    {
      title: "Power Animal Retrieval",
      description: "This ceremony connects you with helping spirits that offer guidance, protection, and power. Each of us has spiritual allies in non-ordinary reality who can assist us on our path. Through shamanic journeying, Karuna helps you meet and establish relationships with these power spirits.",
      icon: "/yurt-icon-3.svg"
    },
    {
      title: "Extraction",
      description: "An extraction ceremony removes energetic intrusions or blockages that may be causing physical or emotional distress. These intrusions often manifest from trauma, negative thought patterns, or harmful relationships. Karuna works with spirits to identify and extract these energies.",
      icon: "/Buddha.svg"
    },
    {
      title: "Depossession",
      description: "This specialized ceremony addresses the presence of spirit attachments or possessions that may be causing disturbance in your life or energy field. With compassion and respect for all beings involved, Karuna helps to release and guide these spirits to their proper place.",
      icon: "/Staff.svg"
    },
    {
      title: "Illumination Ceremony",
      description: "Drawing from Andean shamanic traditions, this ceremony works with your luminous energy field to release heavy energies and restore harmony. Through gentle touch and energy work, Karuna helps clear imprints from past traumas and karmic patterns.",
      icon: "/Statue 2.svg"
    }
  ];

  // Other Offerings data
  const otherOfferings = [
    {
      title: "Shamanic Counseling",
      description: "Shamanic counseling provides personal guidance using shamanic techniques to address your unique situation. Through a combination of spiritual insight and practical wisdom, Karuna helps you navigate life challenges, make important decisions, and deepen your own connection with spirit.",
      icon: "/yurt-icon-8.svg"
    },
    {
      title: "Death and Dying Skills",
      description: "These specialized sessions offer support and teachings around the sacred transition of death. Whether you are facing your own mortality, supporting a loved one through their final journey, or processing grief, Karuna provides shamanic perspectives and practical tools.",
      icon: "/yurt-icon-6.svg"
    },
    {
      title: "House Blessing and Clearing",
      description: "This ceremony purifies and blesses your home or space, removing stuck energies and establishing sacred harmony. Whether you're moving into a new home, experiencing unusual disturbances, or simply wish to refresh your space's energy.",
      icon: "/yurt-icon-7.svg"
    }
  ];

  return (
    <div className="min-h-screen text-gray-800 w-full">
      {/* Main content wrapper */}
      <div className="page-content">
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
          <div className="sun-spot sun-spot-offerings z-10"></div>
          {/* Hero Content: Empowerment Ceremonies header and paragraph */}
          <div className="container mx-auto px-4 relative z-20 text-left py-24 pt-36">
            <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">Empowerment Ceremonies</h1>
            <p className="text-xl max-w-3xl mb-6">
              Karuna offers an empowerment ceremony focused on soul healing from past traumas, energy restoration, and spiritual empowerment. Each ceremony creates a sacred space for profound transformation.
            </p>
          </div>
          {/* Wavy white bar at the bottom, in front of sun spot */}
          <svg className="absolute bottom-0 left-0 w-full z-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
            <path fill="#f5f3f7" d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,53.3C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z" />
          </svg>
        </section>
        
        {/* Empowerment Ceremonies Section: just the cards, no subhead or description */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {empowermentCeremonies.map((ceremony, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center fade-in-section">
                  <div className="w-24 h-24 mb-6">
                    <img 
                      src={ceremony.icon} 
                      alt={ceremony.title} 
                      className="w-full h-full" 
                      width="86"
                      height="86"
                      style={{ filter: 'invert(13%) sepia(88%) saturate(2651%) hue-rotate(257deg) brightness(86%) contrast(116%)' }}
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4 font-heading">{ceremony.title}</h3>
                  <p className="text-gray-600">{ceremony.description}</p>
                </div>
              ))}
            </div>
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
        
        {/* Other Offerings Section */}
        <section className="py-20 bg-purple-50 relative">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="fade-in-section">
              <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-10 font-heading">Other Offerings</h2>
              <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 max-w-3xl mx-auto">
                Beyond the core empowerment ceremony, Karuna offers specialized shamanic services to address specific life situations and spaces.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherOfferings.map((offering, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center fade-in-section">
                  <div className="w-24 h-24 mb-6">
                    <img 
                      src={offering.icon} 
                      alt={offering.title}
                      className="w-full h-full" 
                      width="86"
                      height="86"
                      style={{ filter: 'invert(13%) sepia(88%) saturate(2651%) hue-rotate(257deg) brightness(86%) contrast(116%)' }}
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4 font-heading">{offering.title}</h3>
                  <p className="text-gray-600">{offering.description}</p>
                </div>
              ))}
            </div>
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
        
        {/* Remote Healing Note */}
        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-3xl text-center fade-in-section">
            <div className="w-36 h-36 mx-auto mb-6">
              <img 
                src="/yurt-icon-9.svg" 
                alt="Distance healing" 
                className="w-full h-full" 
                width="108"
                height="108"
                style={{ filter: 'invert(13%) sepia(88%) saturate(2651%) hue-rotate(257deg) brightness(86%) contrast(116%)' }}
              />
            </div>
            <h3 className="text-2xl font-light text-primary mb-4 font-heading">Distance Is Not a Barrier</h3>
            <p className="text-lg text-gray-700">
              All of Karuna's healing offerings can be conducted remotely. The spiritual realm transcends physical distance, allowing for powerful healing experiences regardless of where you are located.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
} 