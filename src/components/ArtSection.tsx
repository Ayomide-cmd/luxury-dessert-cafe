'use client';

import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

const features = [ 
  'Fresh daily preparation',
  'Perfectly balanced flavors',
];

export default function ArtSection() {
  const sectionRef = useScrollAnimation();
  const parallaxRef = useParallax(0.3);

  return (
    <section
      ref={sectionRef}
      className="py-32 px-4 bg-linear-to-br from-brown-100 via-pink-50 to-cream relative overflow-hidden"
    >
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 border-4 border-pink-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 border-4 border-brown-300 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-20">
          <h2 className="font-playfair text-6xl md:text-7xl font-bold text-dark-brown mb-4">
            The ART
          </h2>
          <p className="font-cormorant text-2xl md:text-3xl text-brown-700 italic">
            Of Japanese-French Patisserie
          </p>
          <div className="w-32 h-1 bg-linear-to-r from-pink-500 via-brown-500 to-pink-500 mx-auto mt-6"></div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl smooth-hover transform hover:-translate-y-1"
                >
                  
                  <div className="w-12 h-12 bg-linear-to-br from-pink-500 to-brown-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 smooth-hover">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  
                  <h3 className="font-cormorant text-xl font-bold text-dark-brown">
                    {feature}
                  </h3>

                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-pink-500 to-transparent opacity-0 group-hover:opacity-100 smooth-hover"></div>
                </div>
              ))}
            </div>
       
          </div>

          
          <div
            ref={parallaxRef}
            className="relative"
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/feature-img.jpg"
                alt="Artisan patisserie creation"
                fill
                className="object-cover"
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-dark-brown/60 via-transparent to-transparent"></div>
              
              
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-playfair text-4xl font-bold text-white mb-2">
                  Crafted to Perfection
                </h3>
                <p className="font-cormorant text-xl text-white/90">
                  Where Tradition Meets Innovation
                </p>
              </div>
            </div>

            
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-pink-400 rounded-full opacity-30 blur-2xl animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-brown-400 rounded-full opacity-30 blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            
            
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-pink-400 rounded-tr-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-brown-400 rounded-bl-3xl opacity-50"></div>
          </div>
        </div>

        
        <div className="text-center mt-20">
          
        </div>
      </div>
    </section>
  );
}