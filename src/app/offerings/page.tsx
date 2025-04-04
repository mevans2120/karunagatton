'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Offerings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Add useEffect to ensure page elements load correctly
  useEffect(() => {
    // This forces a re-render after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
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
      title: "Power Spirit Retrieval",
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
      <section className="relative min-h-[80vh] flex items-center bg-primary text-white overflow-hidden">
        {/* SVG Filters */}
        <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
          <filter id="turbulence">
            <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
            <feDisplacementMap in="SourceGraphic" scale="25" />
          </filter>
        </svg>
        
        {/* Animated yellow sun spot */}
        <div className="sun-spot" style={{ 
          bottom: '-27%', 
          left: '1%',
          pointerEvents: 'none',
          zIndex: 1
        }}></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-20 text-left py-24">
          <h1 className="text-5xl md:text-7xl font-light mb-8 font-heading">Healing Offerings</h1>
          <p className="text-xl max-w-3xl mb-10">
            Explore Karuna's comprehensive healing ceremonies, each designed to address specific aspects of spiritual, emotional, and energetic wellbeing. All offerings can be conducted both in-person and remotely.
          </p>
          <Link href="/get-in-touch" className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 text-white border border-white border-opacity-50 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition duration-300 relative z-20">
            Get in Touch
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
      
      {/* Wave divider as separate section */}
      <div className="relative bg-primary h-12 -mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="absolute top-0 w-full" style={{ transform: 'translateY(-80%)' }}>
          <path fill="#f5f3f7" d="M0,64L60,58.7C120,53,240,43,360,42.7C480,43,600,53,720,53.3C840,53,960,43,1080,37.3C1200,32,1320,32,1380,32L1440,32L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
      
      {/* Empowerment Ceremonies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-10 font-heading">Empowerment Ceremonies</h2>
          <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 max-w-3xl mx-auto">
            These core shamanic ceremonies are focused on soul healing, energy restoration, and spiritual empowerment. Each ceremony creates a sacred space for profound transformation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {empowermentCeremonies.map((ceremony, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6">
                  <img 
                    src={ceremony.icon} 
                    alt={ceremony.title} 
                    className="w-full h-full" 
                    width="72"
                    height="72"
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
          <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-10 font-heading">Other Offerings</h2>
          <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 max-w-3xl mx-auto">
            Beyond the core empowerment ceremonies, Karuna offers specialized shamanic services to address specific life situations and spaces.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherOfferings.map((offering, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6">
                  <img 
                    src={offering.icon} 
                    alt={offering.title}
                    className="w-full h-full" 
                    width="72"
                    height="72"
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
        <div className="container mx-auto max-w-3xl text-center">
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
                <h4 className="text-lg font-medium text-white mb-4 font-heading">Pages</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="hover:text-accent transition duration-300">Home</Link></li>
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
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Karuna Gatton. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 