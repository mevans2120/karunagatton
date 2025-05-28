'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Calendar, Clock, MapPin, X, Menu } from 'lucide-react';
import Link from 'next/link';
import PortraitCarousel from '@/components/PortraitCarousel';
import ViewAllButton from '@/components/ViewAllButton';
import Footer from '@/components/Footer';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Set viewport height immediately to prevent layout shift
  if (typeof window !== 'undefined') {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Ensure page starts at top on mobile
  useEffect(() => {
    // Only run on mount
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      
      // Set custom viewport height property for mobile
      const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      // Already set above, but add resize listener
      window.addEventListener('resize', setViewportHeight);
      
      return () => window.removeEventListener('resize', setViewportHeight);
    }
  }, []);
  
  // Debug log for menu state
  useEffect(() => {
    console.log("Menu state changed:", isMenuOpen);
  }, [isMenuOpen]);
  
  useEffect(() => {
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
    
    // Ensure menu can be closed with escape key
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);
  
  // Testimonial data
  const testimonials = [
    {
      quote: "Karuna has been tremendously helpful to me, and the wellness of my whole family. Her unique insight and extraordinary gifts make her a powerful healer. She is also simply delightful to spend time with. Her ability to work remotely makes it so easy to work with her and have work done when it's really needed, even when life is keeping you busy.",
      author: "Fauna"
    },
    {
      quote: "Since working with Karuna, I have become connected with Spirit on a level that I'd never experienced before! She shares the tools needed to make and maintain this connection that makes magnitudes of difference in my life on a daily basis…. Health, relationships, material success and spiritual realms… I never knew how powerful I was until she showed me!",
      author: "Kristin F."
    },
    {
      quote: "My first shamanic session with Karuna was almost 20 years ago, after a significant family trauma. Upon meeting Karuna, I immediately felt at ease. I intuitively sensed that I could trust her completely. The session was a deeply healing experience for me and for my child. I felt seen, supported, and loved.",
      author: "Wendy H."
    },
    {
      quote: "I have had the pleasure of knowing Karuna for over 20 years. During this time she performed a Healing and Empowerment Ceremony for me as well as distance healing for several members of my family. My own healing was very profound. The soul gathering for family members who had passed was such a blessing for the entire family.",
      author: "Sue Brown"
    }
  ];
  
  const offeringTeasers = [
    {
      title: "Soul Retrieval",
      description: "Recover vital energy and essence lost through trauma or difficult life experiences.",
      icon: "/yurt-icon-1.svg"
    },
    {
      title: "Soul Part Integration",
      description: "After a soul retrieval, this ceremony offers continued support as you welcome home and integrate the returned soul parts..",
      icon: "/yurt-icon-2.svg"
    },
    {
      title: "Power Animal Retrieval",
      description: "Connect with helping spirits that offer guidance, protection, and power.",
      icon: "/yurt-icon-3.svg"
    },
  ];

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50 w-full">
      {/* SVG Filters */}
      <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
        <filter id="turbulence">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="5" />
          <feDisplacementMap in="SourceGraphic" scale="25" />
        </filter>
      </svg>
      
      {/* Main content wrapper */}
      <div className="page-content">
        {/* Hero Section with Wavy Header */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary" style={{ isolation: 'isolate' }}>
          {/* Wavy pattern - Ensure it doesn't block pointer events */}
          <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
            <svg className="absolute bottom-0 w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ marginBottom: '-1px' }}>
              <path fill="#f9fafb" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <svg className="absolute bottom-0 w-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ transform: 'translateY(10px)' }}>
              <path fill="#f9fafb" fillOpacity="0.5" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,213.3C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          {/* Animated yellow sun spot - with stable positioning */}
          <div className="sun-spot sun-spot-home" style={{ position: 'absolute', zIndex: 1, contain: 'layout' }}></div>
          
          {/* Hero Content - wrapped in stable container */}
          <div className="relative z-20 text-left pb-32 container mx-auto px-2 md:px-4" style={{ contain: 'layout', transform: 'translateZ(0)' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wider mb-4 leading-tight font-heading">
              Shamanic Healing <br className="hidden md:block" />in Eugene, OR
            </h1>
            <h2 className="text-xl md:text-2xl text-white font-light tracking-wide max-w-2xl mb-8">
              A place where spirit moves through ancient ceremony and great mystery
            </h2>
            <Link 
              href="/offerings" 
              className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-white rounded-full backdrop-blur-sm hover:bg-white hover:bg-opacity-10 transition duration-300"
              style={{
                position: 'relative',
                zIndex: 40
              }}
            >
              View Offerings
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </section>
        
        {/* Welcome Message */}
        <section id="welcome" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="relative fade-in-section">
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 opacity-30">
                <img src="/yurt-icon-welcome.svg" alt="Yurt icon" className="w-full h-full" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-10 fade-in-section font-heading">
              Welcome
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-8 fade-in-section">
              You are not here by accident. You've been guided to a place of healing, a space where spirit moves through ancient ceremony and great mystery. Karuna Gatton offers deep, soul-level healing from her yurt in Eugene, Oregon—and to those beyond through remote sessions.
            </p>
            <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 fade-in-section">
              Through shamanic practice, she helps you reconnect to your wholeness, awaken your vitality, and walk forward empowered. Whether you're new to this work or returning to it, you're invited to explore, feel, and heal.
            </p>
          </div>
        </section>
        
        {/* Transition Wave to Photo Carousel */}
        <section className="bg-gray-50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ marginBottom: '-1px' }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 block" style={{ transform: 'rotate(180deg)', verticalAlign: 'bottom' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-50"></path>
            </svg>
          </div>
          <div className="h-24 bg-gray-50"></div>
        </section>
        
        {/* Integrated Photo Carousel */}
        <section className="relative py-20 bg-purple-50">
          {/* Top wave decoration */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 block" style={{ verticalAlign: 'bottom' }}>
              <path fill="#f5f3ff" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl text-center font-light text-primary mb-8 fade-in-section font-heading">Visiting Karuna</h2>
            
            <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 fade-in-section max-w-3xl mx-auto">
              She works out of her yurt, between her purple house and Hendricks Park's urban forest in Eugene
            </p>
            
            <div className="max-w-5xl mx-auto fade-in-section">
              {/* Old Carousel (or Gallery) – Replaced with PortraitCarousel */}
              <PortraitCarousel />
            </div>
          </div>
          
          {/* Add custom CSS for carousel */}
          <style jsx>{`
            .carousel {
              display: flex;
              width: 100%;
              align-items: center;
              margin: 0 auto;
              height: 500px;
            }

            .carousel__list {
              display: flex;
              list-style: none;
              position: relative;
              width: 100%;
              height: 450px;
              justify-content: center;
              perspective: 300px;
              padding: 0;
              margin: 0;
            }
            
            .carousel__item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 270px;
              height: 400px;
              border-radius: 12px;
              position: absolute;
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
              cursor: pointer;
              overflow: visible;
              pointer-events: auto;
              will-change: transform, opacity, filter;
              transform-origin: center center;
              -webkit-tap-highlight-color: transparent;
            }
            
            .carousel__item[data-pos="0"] {
              z-index: 5;
              transform: translateX(0) scale(1.25);
              opacity: 1;
              filter: blur(0px) grayscale(0%);
              width: 300px;
            }
            
            .carousel__item[data-pos="-1"] {
              transform: translateX(-40%) scale(0.9);
              z-index: 4;
              opacity: 0.8;
              filter: blur(1px) grayscale(10%);
            }
            
            .carousel__item[data-pos="1"] {
              transform: translateX(40%) scale(0.9);
              z-index: 4;
              opacity: 0.8;
              filter: blur(1px) grayscale(10%);
            }
            
            .carousel__item[data-pos="-2"] {
              transform: translateX(-75%) scale(0.5);
              z-index: 2;
              opacity: 0.4;
              filter: blur(2px) grayscale(30%);
            }
            
            .carousel__item[data-pos="2"] {
              transform: translateX(75%) scale(0.5);
              z-index: 2;
              opacity: 0.4;
              filter: blur(2px) grayscale(30%);
            }
            
            .carousel__item > div {
              height: 350px;
            }
            
            .carousel__item[data-pos="0"] > div {
              height: 400px;
            }
            
            .carousel__item > div > div:first-child {
              box-shadow: 0px 1px 4px 0px rgba(50, 50, 50, 0.5);
              height: 100%;
            }
            
            /* Desktop media query for larger carousel (20% increase) */
            @media (min-width: 768px) {
              .carousel {
                height: 600px; /* 500px × 1.2 */
              }
              
              .carousel__list {
                height: 540px; /* 450px × 1.2 */
              }
              
              .carousel__item {
                width: 324px; /* 270px × 1.2 */
                height: 480px; /* 400px × 1.2 */
              }
              
              .carousel__item[data-pos="0"] {
                width: 360px; /* 300px × 1.2 */
              }
              
              .carousel__item > div {
                height: 420px; /* 350px × 1.2 */
              }
              
              .carousel__item[data-pos="0"] > div {
                height: 480px; /* 400px × 1.2 */
              }
            }
          `}</style>
          
          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ marginBottom: '-1px' }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 block" style={{ transform: 'rotate(180deg)', verticalAlign: 'bottom' }}>
              <path fill="#f5f3ff" d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Transition Wave to Offerings */}
        <section className="bg-purple-50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ marginBottom: '-1px' }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 block" style={{ transform: 'rotate(180deg)', verticalAlign: 'bottom' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
            </svg>
          </div>
          <div className="h-24 bg-purple-50"></div>
        </section>
        
        {/* Offerings Teaser */}
        <section id="offerings" className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">Empowerment Ceremonies Include</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {offeringTeasers.map((offering, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-lg shadow-sm flex flex-col items-center text-center min-h-64 fade-in-section" style={{transitionDelay: `${index * 150}ms`}}>
                  <div className="mb-6">
                    <img 
                      src={offering.icon} 
                      alt="Yurt icon" 
                      width="86"
                      height="86"
                      style={{ 
                        filter: 'invert(13%) sepia(88%) saturate(2651%) hue-rotate(257deg) brightness(86%) contrast(116%)',
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4 font-heading">{offering.title}</h3>
                  <p className="text-gray-600">{offering.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 fade-in-section">
              <Link href="/offerings" passHref legacyBehavior>
                <ViewAllButton>Learn More</ViewAllButton>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Transition Wave to Testimonials */}
        <section className="bg-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ marginBottom: '-1px' }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 block" style={{ transform: 'rotate(180deg)', verticalAlign: 'bottom' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background"></path>
            </svg>
          </div>
          <div className="h-24 bg-white"></div>
        </section>
        
        {/* Testimonial Section */}
        <section className="py-24 bg-background text-gray-800 relative overflow-hidden">
          <div className="absolute top-10 left-10 text-8xl text-secondary opacity-10">❝</div>
          <div className="absolute bottom-10 right-10 text-8xl text-secondary opacity-10">❞</div>
          
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">What the community says</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm fade-in-section">
                  <div className="flex flex-col h-full">
                    <div className="text-secondary text-xl mb-4">❝</div>
                    <p className="text-gray-700 italic mb-6 text-lg flex-grow">
                      {testimonial.quote.length > 150 
                        ? testimonial.quote.substring(0, 150) + "..." 
                        : testimonial.quote}
                    </p>
                    <p className="font-medium text-primary self-end text-right">
                      ― {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Transition Wave to Drum Circle */}
        <section className="bg-background relative" style={{ paddingBottom: '10%', minHeight: '0' }}>
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full block" style={{ transform: 'rotate(180deg)' }}>
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary"></path>
            </svg>
          </div>
        </section>
        
        {/* Drum Circle Highlight */}
        <section className="bg-primary text-white py-20" style={{ marginTop: '-1px' }}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-light mb-6 fade-in-section font-heading">Monthly Drum Circle</h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-200 fade-in-section max-w-2xl mx-auto">
                Join our community gathering on the first Tuesday of each month at 7:30pm. Experience the healing power of the drum in a supportive environment. No experience necessary.
              </p>
              <Link href="/drum-circle" className="inline-flex items-center text-accent hover:text-accent/80 transition duration-300 fade-in-section">
                Learn More
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Transition Wave to About Section - removed from here */}
        
        {/* About Karuna Teaser */}
        <section className="py-20 bg-gray-50 relative" style={{ marginTop: '0' }}>
          {/* Wave transition at top */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10" style={{ marginTop: '-1px' }}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-24 block">
              <path d="M0,0L0,27.35A600.21,600.21,0,0,0,321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0Z" className="fill-primary"></path>
            </svg>
          </div>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="md:flex items-center">
              <div className="md:w-1/3 mb-8 md:mb-0 md:pr-12 flex justify-center fade-in-section">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                  <img 
                    src="/Karuna_headshot.png" 
                    alt="Karuna Gatton" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-800 fade-in-section font-heading">About Karuna</h2>
                <p className="text-lg leading-relaxed mb-6 text-gray-700 fade-in-section">
                  Karuna Gatton brings decades of experience in shamanic healing traditions. Her approach is gentle yet powerful, focusing on empowering her clients through deep connection with spirit and nature.
                </p>
                <Link href="/about" className="inline-flex items-center text-secondary hover:text-primary transition duration-300 fade-in-section">
                  Read More About Karuna
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
  );
}
