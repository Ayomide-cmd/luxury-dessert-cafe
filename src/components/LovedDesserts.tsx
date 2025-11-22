'use client';

import { useSectionTransition } from '@/hooks/useScrollAnimation';
import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import type { Dessert } from '@/types';

const desserts: Dessert[] = [
  { id: 5, name: 'Whipped Strawberry Milkshake', origin: 'FR-JP', size: '200ml', price: 14000 },
  { id: 6, name: 'Crème Brulèé', origin: 'FR-JP', size: '1 serving', price: 18500 },
  { id: 7, name: 'Cinnamon au biscoff', origin: 'JP', size: '6 inch', price: 13000 },
  { id: 8, name: 'Stuffed Cream Puffs', origin: 'FR-JP', size: 'Piece', price: 17006 },
];

export default function LovedDesserts() {
  const sectionRef = useSectionTransition();
  const containerRef = useStaggerAnimation(0.15);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-[#1a1412] via-[#221816] to-[#2a1e1a] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.06),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-200 via-pink-100 to-amber-100 bg-clip-text text-transparent mb-4">
            Most Loved Desserts
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400/50 to-pink-400/70"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400/60"></div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent via-pink-400/50 to-pink-400/70"></div>
          </div>
        </div>

        {/* Desserts grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {desserts.map((dessert, index) => (
            <div
              key={dessert.id}
              className="group relative bg-gradient-to-br from-[#2a2220] to-[#1f1614] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-pink-900/20 smooth-hover cursor-pointer border border-pink-900/20"
            >
             
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`/images/dessert-${index + 5}.png`}
                  alt={dessert.name}
                  fill
                  className="object-cover group-hover:scale-110 smooth-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1412] via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 smooth-hover"></div>
              </div>

              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-pink-100 mb-1">
                      {dessert.name}
                    </h3>
                    <p className="text-pink-200/60 text-sm">
                      {dessert.origin} | {dessert.size}
                    </p>
                  </div>
                  <span className="font-bold text-2xl text-pink-400">
                    ₦{dessert.price}
                  </span>
                </div>

                
                <div className="h-px bg-gradient-to-r from-transparent via-pink-400/30 to-transparent mb-4"></div>

                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 fill-current text-pink-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <button className="text-sm text-pink-400 font-semibold hover:text-pink-300 smooth-hover">
                    Order Now →
                  </button>
                </div>
              </div>

              
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-transparent rounded-bl-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}