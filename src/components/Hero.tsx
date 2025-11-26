"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const decorRef = useRef<HTMLDivElement | null>(null);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const transformSetterRef = useRef<((v: number) => void) | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!decorRef.current) return;

    transformSetterRef.current = gsap.quickSetter(decorRef.current, "y", "px") as (v: number) => void;

    const onScroll = () => {
      scrollYRef.current = window.scrollY || window.pageYOffset;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          const y = Math.round(scrollYRef.current * 0.36);
          transformSetterRef.current?.(y);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "Tab" && isModalOpen && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    if (isModalOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      document.addEventListener("keydown", onKey);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        const focusTarget = modalRef.current?.querySelector<HTMLElement>("button, [tabindex]:not([tabindex='-1'])");
        focusTarget?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      if (!isModalOpen && previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isModalOpen]);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isSmall: "(max-width: 767px)",
          isLarge: "(min-width: 768px)",
        },
        (context) => {
          const { isSmall } = context.conditions as { isSmall: boolean };
          const heroElems = heroRef.current?.querySelectorAll<HTMLElement>(".hero-animate");
          if (heroElems && heroElems.length) {
            gsap.from(heroElems, { opacity: 0, y: 36, duration: 1, ease: "power3.out", stagger: 0.12 });
          }

          const decorItems = decorRef.current?.querySelectorAll<HTMLElement>(".decor-item");
          if (decorItems && decorItems.length) {
            const floatVars = isSmall
              ? { x: 6, y: 8, rotation: 2, scaleMin: 0.995, scaleMax: 1.005, durationMin: 6, durationMax: 9 }
              : { x: 14, y: 18, rotation: 5, scaleMin: 0.99, scaleMax: 1.01, durationMin: 5, durationMax: 8 };

            const tl = gsap.timeline({ repeat: -1 });

            decorItems.forEach((el, i) => {
              const dur = gsap.utils.random(floatVars.durationMin, floatVars.durationMax, 1);
              const tx = gsap.utils.random(-floatVars.x, floatVars.x);
              const ty = gsap.utils.random(-floatVars.y, floatVars.y);
              const rot = gsap.utils.random(-floatVars.rotation, floatVars.rotation);
              const sc = gsap.utils.random(floatVars.scaleMin, floatVars.scaleMax);

              tl.to(
                el,
                { x: tx, y: ty, rotation: rot, scale: sc, skewX: gsap.utils.random(-0.4, 0.4), ease: "sine.inOut", duration: dur, yoyo: true, repeat: 1 },
                i * 0.12
              );
            });

            gsap.to(decorRef.current, { rotation: 0.01, onRepeat() {} });
          }
        }
      );

      return () => mm.revert();
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef as React.RefObject<HTMLElement>} className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1412] via-[#221816] to-[#1a1412] overflow-hidden" aria-label="Hero: Café Rosso">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.12),transparent_70%)] animate-pulse-slow pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, transparent 1px, transparent 40px)" }} aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" aria-hidden="true" />

      <div ref={decorRef} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="md:hidden">
          <div className="decor-item absolute top-12 -left-8 w-28 h-28 opacity-25">
            <div className="absolute inset-0 bg-pink-500/10 blur-2xl rounded-full animate-pulse-slow" />
            <Image src="/images/coffee-bean-left.png" alt="" fill className="object-contain filter drop-shadow-[0_0_20px_rgba(236,72,153,0.2)]" sizes="112px" loading="lazy" />
          </div>
          <div className="decor-item absolute top-16 -right-8 w-32 h-32 opacity-25">
            <div className="absolute inset-0 bg-pink-400/10 blur-2xl rounded-full animate-pulse-slow animation-delay-2000" />
            <Image src="/images/hero-left-leaf.png" alt="" fill className="object-contain filter drop-shadow-[0_0_20px_rgba(236,72,153,0.2)]" sizes="128px" loading="lazy" />
          </div>
        </div>

        <div className="hidden md:block">
          <div className="decor-item absolute top-8 left-4 md:top-14 md:left-4 lg:top-16 lg:left-16 xl:left-24 w-40 h-40 md:w-56 md:h-56 lg:w-80 lg:h-80 xl:w-96 xl:h-96 opacity-30 md:opacity-38 lg:opacity-42 hover:opacity-50 transition-opacity duration-500">
            <div className="absolute inset-0 bg-pink-500/15 blur-3xl rounded-full animate-pulse-slow" />
            <Image src="/images/coffee-bean-left.png" alt="" fill className="object-contain filter drop-shadow-[0_0_40px_rgba(236,72,153,0.3)]" sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 224px, 160px" priority={false} loading="lazy" />
          </div>

          <div className="decor-item absolute top-14 right-2 md:top-20 md:right-2 lg:top-20 lg:right-12 xl:right-24 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 opacity-30 md:opacity-38 lg:opacity-42 hover:opacity-50 transition-opacity duration-500">
            <div className="absolute inset-0 bg-pink-400/15 blur-3xl rounded-full animate-pulse-slow animation-delay-2000" />
            <Image src="/images/hero-left-leaf.png" alt="" fill className="object-contain filter drop-shadow-[0_0_40px_rgba(236,72,153,0.3)]" sizes="(min-width: 1280px) 288px, (min-width: 1024px) 256px, (min-width: 768px) 224px, 192px" loading="lazy" />
          </div>

          <div className="decor-item absolute bottom-20 left-0 md:bottom-28 md:left-0 lg:bottom-32 lg:left-12 xl:left-48 w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-60 opacity-20 md:opacity-25 lg:opacity-20 hover:opacity-35 transition-opacity duration-500">
            <div className="absolute inset-0 bg-pink-300/12 blur-3xl rounded-full animate-pulse-slow animation-delay-1000" />
            <Image src="/images/swirl-decoration-v2.png" alt="" fill className="object-contain filter drop-shadow-[0_0_50px_rgba(236,72,153,0.2)]" sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 768px) 256px, 224px" loading="lazy" />
          </div>

          <div className="decor-item absolute bottom-16 right-0 md:bottom-24 md:right-0 lg:bottom-26 lg:right-8 xl:right-20 w-52 h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80 opacity-25 md:opacity-25 lg:opacity-32 hover:opacity-50 transition-opacity duration-500">
            <div className="absolute inset-0 bg-pink-400/12 blur-3xl rounded-full animate-pulse-slow animation-delay-3000" />
            <Image src="/images/coffee-bean-right.png" alt="" fill className="object-contain filter drop-shadow-[0_0_50px_rgba(236,72,153,0.2)]" sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 768px) 240px, 208px" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col items-center text-center md:hidden space-y-8">
          <h1 className="hero-animate font-playfair text-4xl sm:text-5xl font-light tracking-[0.02em] leading-none">
            <span className="bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(236,72,153,0.4)]">Café Rosso</span>
          </h1>

          <div className="hero-animate flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-400/90 shadow-lg shadow-pink-400/50 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-pink-300/80 animate-pulse animation-delay-500" />
            </div>
          </div>

          <div className="hero-animate space-y-2">
            <p className="font-cormorant text-xl sm:text-2xl text-pink-100/90 leading-relaxed font-light">Japanese-French Artisanal Treats</p>
            <p className="font-cormorant text-base sm:text-lg text-pink-200/80">Made for indulgence in Lagos</p>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <h1 className="hero-animate font-playfair text-5xl md:text-6xl lg:text-7xl xl:text-[8rem] font-light tracking-[0.02em] leading-none whitespace-nowrap">
              <span className="bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(236,72,153,0.4)]">Café Rosso</span>
            </h1>
          </div>

          <div className="flex flex-col items-end gap-6 lg:gap-8">
            <div className="hero-animate flex items-center justify-end gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-pink-400/90 shadow-lg shadow-pink-400/50 animate-pulse hover:scale-125 transition-transform" />
                <div className="w-1.5 h-1.5 rounded-full bg-pink-300/80 animate-pulse animation-delay-500 hover:scale-125 transition-transform" />
              </div>
              <div className="h-px w-12 md:w-16 lg:w-20 bg-gradient-to-l from-pink-400/80 via-pink-400/60 to-transparent shadow-lg shadow-pink-400/20" />
            </div>

            <div className="text-right">
              <p className="hero-animate font-cormorant text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pink-100/90 mb-2 leading-relaxed font-light">Japanese-French Artisanal Treats</p>
              <p className="hero-animate font-cormorant text-base md:text-lg lg:text-xl text-pink-200/80">Made for indulgence in Lagos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
        <div className="hero-animate">
          <button onClick={() => setIsModalOpen(true)} className="group relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:scale-105 hover:brightness-110 border border-pink-500/30" aria-haspopup="dialog" aria-expanded={isModalOpen}>
            <span className="relative z-10 text-white font-semibold tracking-wider text-xs sm:text-sm uppercase flex items-center gap-2 md:gap-3">
              Explore Menu
              <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>

        <div className="hero-animate cursor-pointer hover:text-pink-100 transition-colors" aria-hidden>
          <div className="inline-flex flex-col items-center gap-2 text-pink-200/60">
            <span className="text-xs font-medium tracking-widest uppercase animate-scroll-float" style={{ animationDelay: "0s" }}>Scroll</span>
            <svg className="w-5 h-5 animate-scroll-float" style={{ animationDelay: "0.15s" }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in" role="dialog" aria-modal="true" ref={modalRef}>
          <div className="bg-[#1a1412] p-8 md:p-12 rounded-2xl max-w-2xl w-full text-white">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Menu Coming Soon</h2>
            <p className="text-base md:text-lg mb-6">We’re preparing something delicious. Stay tuned!</p>
            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-full text-white font-semibold transition-all">Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
