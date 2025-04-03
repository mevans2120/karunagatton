'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  
  // Carousel photos data
  const carouselPhotos = [
    {
      src: "/Boys_Omsi_water_part.jpg",
      alt: "Boys at OMSI water exhibit"
    },
    {
      src: "/Charlie_Quincy_Silver.jpg",
      alt: "Charlie and Quincy Silver"
    },
    {
      src: "/Boys_at_Omsi.jpg",
      alt: "Boys at OMSI"
    },
    {
      src: "/Charlie_Quincy_Bubbles.jpg",
      alt: "Charlie and Quincy with bubbles"
    }
  ];
  
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
    
    return () => {
      fadeElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  // Carousel auto-rotation
  useEffect(() => {
    const photoTimer = setInterval(() => {
      setCurrentPhotoIndex(prev => (prev + 1) % carouselPhotos.length);
    }, 5000);
    
    return () => clearInterval(photoTimer);
  }, []);
  
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
      title: "Power Spirit Retrieval",
      description: "Connect with helping spirits that offer guidance, protection, and power.",
      icon: "/yurt-icon-2.svg"
    },
    {
      title: "Shamanic Counseling",
      description: "Personal guidance using shamanic techniques to address your unique situation.",
      icon: "/yurt-icon-3.svg"
    }
  ];

  return (
    <div className="min-h-screen text-gray-800 bg-gray-50">
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
      <header className="absolute top-0 w-full z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
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
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="md:hidden text-white"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      
      {/* Hero Section with Wavy Header */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden animate-gradient">
        {/* Wavy pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f5f3f7" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
          <svg className="absolute bottom-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ transform: 'translateY(10px)' }}>
            <path fill="#f3f4f6" fillOpacity="0.5" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,213.3C672,213,768,203,864,186.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-left px-8 md:px-16 pb-32 container mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-wider mb-4 leading-tight font-heading">
            Shamanic Healing <br className="hidden md:block" />in Eugene, OR
          </h1>
          <h2 className="text-xl md:text-2xl text-white font-light tracking-wide max-w-2xl mb-8">
            A place where spirit moves through ancient ceremony and gentle presence
          </h2>
          <Link href="#offerings" className="inline-flex items-center px-6 py-3 bg-white bg-opacity-20 text-white border border-white border-opacity-50 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition duration-300">
            View Offerings
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
      
      {/* Welcome Message */}
      <section id="welcome" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative fade-in-section">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 opacity-30">
              <img src="/yurt-icon-welcome.svg" alt="Yurt icon" className="w-full h-full" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-10 fade-in-section font-heading">Welcome</h2>
          <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-8 fade-in-section">
            You are not here by accident. You've been guided to a place of healing, a space where spirit moves through ancient ceremony and gentle presence. Karuna Gatton offers deep, soul-level healing from her yurt in Eugene, Oregon—and to those beyond through remote sessions.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 mb-16 fade-in-section">
            Through shamanic practice, she helps you reconnect to your wholeness, awaken your vitality, and walk forward empowered. Whether you're new to this work or returning to it, you're invited to explore, feel, and heal.
          </p>
        </div>
      </section>
      
      {/* Integrated Photo Carousel */}
      <section className="relative py-32 bg-purple-50">
        {/* Top wave decoration */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-300"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto fade-in-section relative">
            <div className="w-full h-[800px] relative overflow-hidden rounded-lg">
              {carouselPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentPhotoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className="w-[600px] h-[800px] object-cover mx-auto"
                  />
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-6 space-x-3">
              {carouselPhotos.map((_, index) => (
                <button 
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentPhotoIndex ? 'bg-primary' : 'bg-accent/30'
                  }`}
                  onClick={() => setCurrentPhotoIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20" style={{ transform: 'rotate(180deg)' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-purple-200"></path>
          </svg>
        </div>
      </section>
      
      {/* Offerings Teaser */}
      <section id="offerings" className="py-20 bg-purple-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-transparent"></div>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center font-light text-primary mb-16 fade-in-section font-heading">Healing Offerings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {offeringTeasers.map((offering, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center min-h-64 fade-in-section" style={{transitionDelay: `${index * 150}ms`}}>
                <div className="mb-6">
                  <img 
                    src={offering.icon} 
                    alt="Yurt icon" 
                    width="72"
                    height="72
                    "
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
            <Link href="/offerings" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition duration-300">
              View All Offerings
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
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
      
      {/* Drum Circle Highlight */}
      <section className="bg-primary text-white py-20">
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
      
      {/* About Karuna Teaser */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="md:flex items-center">
            <div className="md:w-1/3 mb-8 md:mb-0 md:pr-12 flex justify-center fade-in-section">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="/Charlie_Quincy_Silver.jpg" 
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
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0 fade-in-section">
              <h3 className="text-2xl font-light text-white mb-4 font-heading">Karuna</h3>
              <p className="max-w-xs">Shamanic healing in Eugene, Oregon and beyond through remote sessions.</p>
            </div>
            
            <nav className="grid grid-cols-2 md:grid-cols-3 gap-8 fade-in-section">
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
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm fade-in-section">
            <p>&copy; {new Date().getFullYear()} Karuna Gatton. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
