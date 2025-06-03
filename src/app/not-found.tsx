'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function NotFound() {
  const mainPages = [
    {
      title: "Home",
      description: "Return to the homepage and explore shamanic healing services",
      href: "/",
      iconSrc: "/yurt-icon-welcome.svg"
    },
    {
      title: "Offerings",
      description: "Discover soul retrieval, power animal retrieval, and healing ceremonies",
      href: "/offerings",
      iconSrc: "/yurt-icon-1.svg"
    },
    {
      title: "About",
      description: "Learn about Karuna's journey and approach to shamanic healing",
      href: "/about",
      iconSrc: "/Buddha.svg"
    },
    {
      title: "Get in Touch",
      description: "Schedule a consultation or ask questions about healing services",
      href: "/get-in-touch",
      iconSrc: "/Staff.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      {/* Animated sun spot similar to homepage */}
      <div className="sun-spot sun-spot-404" style={{ 
        position: 'fixed', 
        zIndex: 1,
        top: '10%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255, 204, 0, 0.3) 0%, rgba(255, 204, 0, 0.1) 50%, transparent 100%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Header */}
          <div className="mb-12">
            <img 
              src="/Group 5.svg" 
              alt="Drum logo" 
              className="w-16 h-16 mx-auto mb-6 opacity-60"
            />
            <h1 className="text-8xl md:text-9xl font-light text-primary mb-4 font-heading">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-gray-700 mb-4 font-heading">
              Path Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
              The page you're looking for seems to have wandered off the beaten path. 
              Let us guide you back to where healing and wisdom await.
            </p>
          </div>

          {/* Main Pages Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {mainPages.map((page, index) => (
              <Link
                key={page.href}
                href={page.href}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 text-left border border-gray-100 hover:border-primary hover:border-opacity-30"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary bg-opacity-5 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:bg-opacity-10 transition-all duration-300">
                    <img 
                      src={page.iconSrc} 
                      alt={`${page.title} icon`} 
                      className="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-900 mb-2 font-heading group-hover:text-primary transition-colors duration-300">
                      {page.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {page.description}
                    </p>
                    <div className="flex items-center mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium mr-1">Visit page</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating animation CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
} 