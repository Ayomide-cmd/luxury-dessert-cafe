'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function NewsletterSection() {
  const sectionRef = useScrollAnimation();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 bg-gradient-to-b from-[#2a1e1a] via-[#1a1412] to-[#1a1412] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.08),transparent_70%)]"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        

        <h2 className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 bg-clip-text text-transparent mb-6 leading-tight">
          Stay Sweet
        </h2>

        <p className="font-cormorant text-xl md:text-2xl text-pink-200/80 max-w-2xl mx-auto mb-12 leading-relaxed">
          Be the first to know about new creations, seasonal specials, and exclusive tastings
        </p>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-[#2a2220]/50 border border-pink-900/30 rounded-full text-pink-100 placeholder-pink-300/40 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:scale-105 border border-pink-500/30 whitespace-nowrap"
              >
                <span className="relative z-10 text-white font-semibold tracking-wider text-sm uppercase flex items-center gap-2 justify-center">
                  Subscribe
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </form>
        ) : (
          <div className="animate-fade-in max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-[#2a2220]/80 to-[#1f1614]/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-500/30 shadow-2xl shadow-pink-500/20">
              <div className="flex items-center justify-center gap-3 text-pink-100">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-cormorant text-2xl">Welcome to the sweet life!</span>
              </div>
            </div>
          </div>
        )}

        <p className="font-cormorant text-sm text-pink-300/50 mt-8">
          We respect your inbox. Unsubscribe anytime.
        </p>

        <div className="flex items-center justify-center gap-8 mt-12 text-pink-200/60">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-100">2.5k+</div>
            <div className="text-sm font-cormorant">Subscribers</div>
          </div>
          <div className="h-12 w-px bg-pink-400/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-100">Weekly</div>
            <div className="text-sm font-cormorant">Updates</div>
          </div>
          <div className="h-12 w-px bg-pink-400/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-100">Exclusive</div>
            <div className="text-sm font-cormorant">Offers</div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}