'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const decorRef = useRef<HTMLDivElement | null>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowNotice(false);
    };
    if (showNotice) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showNotice]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroElems = heroRef.current?.querySelectorAll('.hero-animate');
      const decorElems = decorRef.current?.querySelectorAll('.decor-item');

      if (heroElems && heroElems.length > 0) {
        gsap.from(heroElems as unknown as gsap.TweenTarget, {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15
        });
      }

      if (decorElems && decorElems.length > 0) {
        gsap.from(decorElems as unknown as gsap.TweenTarget, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out(1.2)',
          stagger: 0.1
        });

        decorElems.forEach((el) => {
          gsap.to(el, {
            y: gsap.utils.random(-15, 15),
            x: gsap.utils.random(-8, 8), 
            rotation: gsap.utils.random(-5, 5),
            scale: gsap.utils.random(0.99, 1.01), 
            skewX: gsap.utils.random(-0.5, 0.5), 
            duration: gsap.utils.random(5, 8), 
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.8
          });
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1412] via-[#221816] to-[#1a1412] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.12),transparent_70%)] animate-pulse-slow"></div>
      
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px)'
      }}></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

      
      <div 
        ref={decorRef} 
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }} 
      >
        <div className="decor-item absolute top-8 left-4 md:top-14 md:left-4 lg:top-16 lg:left-16 xl:left-24 w-40 h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-30 md:opacity-38 lg:opacity-42 hover:opacity-50 transition-opacity duration-500">
          <div className="absolute inset-0 bg-pink-500/15 blur-3xl rounded-full animate-pulse-slow"></div>
          <Image src="/images/coffee-bean-left.png" alt="" fill className="object-contain filter drop-shadow-[0_0_40px_rgba(236,72,153,0.3)]" priority />
        </div>

        <div className="decor-item absolute top-14 right-2 md:top-20 md:right-2 lg:top-20 lg:right-12 xl:right-24 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 opacity-30 md:opacity-38 lg:opacity-42 hover:opacity-50 transition-opacity duration-500">
          <div className="absolute inset-0 bg-pink-400/15 blur-3xl rounded-full animate-pulse-slow animation-delay-2000"></div>
          <Image src="/images/hero-left-leaf.png" alt="" fill className="object-contain filter drop-shadow-[0_0_40px_rgba(236,72,153,0.3)]" priority />
        </div>

        <div className="decor-item absolute bottom-20 left-0 md:bottom-28 md:left-0 lg:bottom-32 lg:left-12 xl:left-48 w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-60 opacity-20 md:opacity-25 lg:opacity-20 hover:opacity-35 transition-opacity duration-500">
          <div className="absolute inset-0 bg-pink-300/12 blur-3xl rounded-full animate-pulse-slow animation-delay-1000"></div>
          <Image src="/images/swirl-decoration-v2.png" alt="" fill className="object-contain filter drop-shadow-[0_0_50px_rgba(236,72,153,0.2)]" priority />
        </div>

        <div className="decor-item absolute bottom-16 right-0 md:bottom-24 md:right-0 lg:bottom-26 lg:right-8 xl:right-20 w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 opacity-25 md:opacity-25 lg:opacity-32 hover:opacity-50 transition-opacity duration-500">
          <div className="absolute inset-0 bg-pink-400/12 blur-3xl rounded-full animate-pulse-slow animation-delay-3000"></div>
          <Image src="/images/coffee-bean-right.png" alt="" fill className="object-contain filter drop-shadow-[0_0_50px_rgba(236,72,153,0.2)]" priority />
        </div>
      </div>

      
      <div className="relative z-20 w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-24">
        
        <div className="flex flex-col items-center text-center md:hidden space-y-8">
          <h1 className="hero-animate font-playfair text-4xl sm:text-5xl font-light tracking-[0.02em] leading-none">
            <span className="bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(236,72,153,0.4)]">
              Café Rosso
            </span>
          </h1>

          <div className="hero-animate flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-400/90 shadow-lg shadow-pink-400/50 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-300/80 animate-pulse animation-delay-500"></div>
            </div>
          </div>

          <div className="hero-animate space-y-2">
            <p className="font-cormorant text-xl sm:text-2xl text-pink-100/90 leading-relaxed font-light">
              Japanese-French Artisanal Treats
            </p>
            <p className="font-cormorant text-base sm:text-lg text-pink-200/80">
              Made for indulgence in Lagos
            </p>
          </div>
        </div>

        
        <div className="hidden md:flex items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <h1 className="hero-animate font-playfair text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] font-light tracking-[0.02em] leading-none whitespace-nowrap">
              <span className="bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(236,72,153,0.4)]">
                Café Rosso
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-end gap-6 lg:gap-8">
            <div className="hero-animate flex items-center justify-end gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-pink-400/90 shadow-lg shadow-pink-400/50 animate-pulse hover:scale-125 transition-transform"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-pink-300/80 animate-pulse animation-delay-500 hover:scale-125 transition-transform"></div>
              </div>
              <div className="h-px w-12 md:w-16 lg:w-20 bg-gradient-to-l from-pink-400/80 via-pink-400/60 to-transparent shadow-lg shadow-pink-400/20"></div>
            </div>

            <div className="text-right">
              <p className="hero-animate font-cormorant text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pink-100/90 mb-2 leading-relaxed font-light">
                Japanese-French Artisanal Treats
              </p>
              <p className="hero-animate font-cormorant text-base md:text-lg lg:text-xl text-pink-200/80">
                Made for indulgence in Lagos
              </p>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 sm:gap-5 md:gap-6"> 
        <div className="hero-animate">
          <button
            onClick={() => setShowNotice(true)}
            className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:scale-105 hover:brightness-110 border border-pink-500/30"
          >
            <span className="relative z-10 text-white font-semibold tracking-wider text-xs sm:text-sm uppercase flex items-center gap-2 md:gap-3">
              Explore Menu
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
          </button>
        </div>

        <div className="hero-animate cursor-pointer hover:text-pink-100 transition-colors">
          <div className="inline-flex flex-col items-center gap-2 text-pink-200/60">
            <span className="text-xs font-medium tracking-widest uppercase animate-scroll-float" style={{ animationDelay: '0s' }}>Scroll</span>
            <svg className="w-5 h-5 animate-scroll-float" style={{ animationDelay: '0.15s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {showNotice && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in px-4"
          onClick={() => setShowNotice(false)}
        >
          <div 
            className="relative bg-gradient-to-br from-[#2a2220] to-[#1f1614] p-8 md:p-10 rounded-3xl shadow-2xl border border-pink-500/30 max-w-md w-full text-center animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-pink-500/10 blur-3xl rounded-3xl"></div>

            <button
              onClick={() => setShowNotice(false)}
              className="absolute top-4 right-4 text-pink-200/60 hover:text-pink-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500/30 to-pink-600/30 flex items-center justify-center border border-pink-400/40 shadow-xl shadow-pink-500/20">
              <span className="text-3xl">🍰</span>
            </div>

            <h2 className="relative text-pink-100 text-2xl md:text-3xl font-playfair font-semibold mb-3">
              Our Starter Recommendations
            </h2>

            <p className="relative text-pink-200/70 text-sm mb-6 font-cormorant">
              Handpicked favorites to begin your journey
            </p>

            <ul className="relative text-pink-100 text-base md:text-lg font-cormorant space-y-3 mb-8 text-left">
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-pink-400 mt-1">•</span>
                <span>Whipped Strawberry Milkshake</span>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-pink-400 mt-1">•</span>
                <span>Stephanie's Opera Cake</span>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-pink-400 mt-1">•</span>
                <span>Cinamon au Biscoff</span>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-pink-400 mt-1">•</span>
                <span>Chocolate Éclair</span>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                <span className="text-pink-400 mt-1">•</span>
                <span>Stuffed Cream Puffs</span>
              </li>
            </ul>

            <button
              onClick={() => setShowNotice(false)}
              className="relative px-8 py-3 rounded-full bg-gradient-to-r from-pink-600 to-pink-700 text-white font-semibold tracking-wide shadow-lg shadow-pink-600/40 hover:shadow-xl hover:shadow-pink-600/50 hover:scale-105 transition-all duration-300"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        @keyframes bounce-slow {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-12px);
          }
        }

        @keyframes scroll-float {
          0%, 100% { 
            transform: translateY(0);
            opacity: 1;
          }
          50% { 
            transform: translateY(-8px);
            opacity: 0.7;
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-scroll-float { animation: scroll-float 2.5s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
        .animation-delay-3000 { animation-delay: 3000ms; }
      `}</style>
    </section>
  );
}