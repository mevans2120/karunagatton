'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Offerings() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Empowerment Ceremonies data
  const empowermentCeremonies = [
    {
      title: "Soul Retrieval",
      description: "A soul retrieval ceremony helps recover lost soul parts that have separated due to trauma, difficult life experiences, or grief. These soul parts carry with them vital energy and essence needed for wholeness. Through shamanic journeying, Karuna locates and returns these soul parts, facilitating healing and integration. This ceremony often results in a profound sense of becoming more present, feeling more energy, and experiencing greater clarity about one's life purpose.",
      icon: "✧"
    },
    {
      title: "Soul Part Integration",
      description: "After a soul retrieval, this ceremony offers continued support as you welcome home and integrate the returned soul parts. Integration is a gentle process of honoring these aspects of yourself and creating space for them in your present life. Karuna provides guidance on how to maintain connection with your returned soul parts and how to nurture them as they settle back into wholeness with you.",
      icon: "✧"
    },
    {
      title: "Power Spirit Retrieval",
      description: "This ceremony connects you with helping spirits that offer guidance, protection, and power. Each of us has spiritual allies in non-ordinary reality who can assist us on our path. Through shamanic journeying, Karuna helps you meet and establish relationships with these power spirits, opening pathways for ongoing communication and support from the spirit world.",
      icon: "✧"
    },
    {
      title: "Extraction",
      description: "An extraction ceremony removes energetic intrusions or blockages that may be causing physical or emotional distress. These intrusions often manifest from trauma, negative thought patterns, or harmful relationships. Karuna works with spirits to identify and extract these energies that don't belong to you, creating space for healing and renewed vitality.",
      icon: "✧"
    },
    {
      title: "Depossession",
      description: "This specialized ceremony addresses the presence of spirit attachments or possessions that may be causing disturbance in your life or energy field. With compassion and respect for all beings involved, Karuna helps to release and guide these spirits to their proper place, restoring your energetic sovereignty and well-being.",
      icon: "✧"
    },
    {
      title: "Illumination Ceremony",
      description: "Drawing from Andean shamanic traditions, this ceremony works with your luminous energy field to release heavy energies and restore harmony. Through gentle touch and energy work, Karuna helps clear imprints from past traumas and karmic patterns, allowing your authentic light to shine through. The illumination process brings clarity and creates space for new possibilities to emerge.",
      icon: "✧"
    }
  ];

  // Other Offerings data
  const otherOfferings = [
    {
      title: "Shamanic Counseling",
      description: "Shamanic counseling provides personal guidance using shamanic techniques to address your unique situation. Through a combination of spiritual insight and practical wisdom, Karuna helps you navigate life challenges, make important decisions, and deepen your own connection with spirit. These sessions can be ongoing or single consultations based on your needs.",
      icon: "✧"
    },
    {
      title: "Death and Dying Skills",
      description: "These specialized sessions offer support and teachings around the sacred transition of death. Whether you are facing your own mortality, supporting a loved one through their final journey, or processing grief, Karuna provides shamanic perspectives and practical tools for approaching death with dignity, awareness, and spiritual presence.",
      icon: "✧"
    },
    {
      title: "House Blessing and Clearing",
      description: "This ceremony purifies and blesses your home or space, removing stuck energies and establishing sacred harmony. Whether you're moving into a new home, experiencing unusual disturbances, or simply wish to refresh your space's energy, Karuna works with spirits and elements to create a sanctuary that supports your well-being and spiritual growth.",
      icon: "✧"
    },
    {
      title: "Distant Healing",
      description: "All of Karuna's offerings can be conducted remotely through distant healing sessions. Spirit operates beyond the constraints of physical space, allowing powerful healing to occur regardless of geographic distance. These sessions are conducted through an initial phone consultation followed by Karuna's shamanic work on your behalf, with a follow-up call to share insights and integration guidance.",
      icon: "✧"
    }
  ];

  // Custom font styles
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
    
    body {
      font-family: 'EB Garamond', serif;
    }
    
    h1, h2, h3, h4, h5, h6, nav, button {
      font-family: Helvetica, Arial, sans-serif;
    }

    .fade-in-section {
      opacity: 1;
      transform: translateY(0);
    }

    .offerings-header {
      background: radial-gradient(circle at 25% 30%, #4b2b5c, transparent 40%), 
                  radial-gradient(circle at 75% 60%, #301934, transparent 50%), 
                  radial-gradient(circle at 50% 50%, #1d1020, transparent 60%), 
                  radial-gradient(circle at 80% 20%, #583668, transparent 40%),
                  radial-gradient(circle at 20% 70%, #eab308, transparent 35%),
                  radial-gradient(circle at 65% 40%, #facc15, transparent 30%),
                  radial-gradient(circle at 40% 25%, #fef08a, transparent 25%),
                  radial-gradient(circle at 85% 80%, #fef9c3, transparent 20%),
                  #301934;
    }
  `;

  useEffect(() => {
    // Add styles to document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3f7] text-gray-800">
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#301934] bg-opacity-95 flex flex-col items-center justify-center">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X size={30} />
          </button>
          <nav className="flex flex-col items-center space-y-8 text-xl text-white">
            <Link href="/" className="hover:text-[#b2a3c7] transition duration-300">Home</Link>
            <Link href="/offerings" className="hover:text-[#b2a3c7] transition duration-300">Offerings</Link>
            <Link href="/drum-circle" className="hover:text-[#b2a3c7] transition duration-300">Drum Circle</Link>
            <Link href="/about" className="hover:text-[#b2a3c7] transition duration-300">About</Link>
            <Link href="/get-in-touch" className="hover:text-[#b2a3c7] transition duration-300">Get in Touch</Link>
          </nav>
        </div>
      )}
      
      {/* Header Navigation */}
      <header className="absolute top-0 w-full z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-white text-3xl font-light tracking-wider">Karuna</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-white">
            <Link href="/" className="hover:text-[#b2a3c7] transition duration-300">Home</Link>
            <Link href="/offerings" className="hover:text-[#b2a3c7] transition duration-300">Offerings</Link>
            <Link href="/drum-circle" className="hover:text-[#b2a3c7] transition duration-300">Drum Circle</Link>
            <Link href="/about" className="hover:text-[#b2a3c7] transition duration-300">About</Link>
            <Link href="/get-in-touch" className="hover:text-[#b2a3c7] transition duration-300">Get in Touch</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      
      {/* Page Title */}
      <div className="offerings-header text-white pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-light mb-6">Healing Offerings</h1>
          <p className="text-xl max-w-3xl">
            Explore Karuna's comprehensive healing ceremonies, each designed to address specific aspects of spiritual, emotional, and energetic wellbeing. All offerings can be conducted both in-person and remotely.
          </p>
        </div>
      </div>
      
      {/* Empowerment Ceremonies Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl text-[#301934] font-light mb-4 text-center">Empowerment Ceremonies</h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            These core shamanic ceremonies are focused on soul healing, energy restoration, and spiritual empowerment. Each ceremony creates a sacred space for profound transformation and reconnection with your authentic self.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {empowermentCeremonies.map((ceremony, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 fade-in-section">
                <div className="flex items-start mb-4">
                  <span className="text-3xl text-[#6d5590] mr-4">{ceremony.icon}</span>
                  <h3 className="text-2xl font-medium text-[#301934]">{ceremony.title}</h3>
                </div>
                <p className="text-gray-700">{ceremony.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Divider */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#d2c9dd]"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#f5f3f7] px-8 text-3xl text-[#6d5590]">✧</span>
        </div>
      </div>
      
      {/* Other Offerings Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl text-[#301934] font-light mb-4 text-center">Other Offerings</h2>
          <p className="text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Beyond the core empowerment ceremonies, Karuna offers specialized shamanic services to address specific life situations and spaces. These offerings provide support for life transitions, environments, and ongoing spiritual development.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {otherOfferings.map((offering, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 fade-in-section">
                <div className="flex items-start mb-4">
                  <span className="text-3xl text-[#6d5590] mr-4">{offering.icon}</span>
                  <h3 className="text-2xl font-medium text-[#301934]">{offering.title}</h3>
                </div>
                <p className="text-gray-700">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Remote Healing Note */}
      <section className="py-12 px-4 bg-[#e9e4ee]">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="text-3xl text-[#6d5590] mb-4">✧</div>
          <h3 className="text-2xl font-light text-[#301934] mb-4">Distance Is Not a Barrier</h3>
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