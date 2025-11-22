'use client';

import { useStaggerAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import type { GalleryImage } from '@/types';

const images: GalleryImage[] = [
  { id: 1, src: '/images/gallery-1.jpg', alt: 'Pastry preparation' },
  { id: 3, src: '/images/gallery-3.jpg', alt: 'Dessert plating' },
  { id: 4, src: '/images/gallery-4.jpg', alt: 'Artistic decoration' },
  { id: 5, src: '/images/gallery-5.jpg', alt: 'Chef at work' },
];

export default function Gallery() {
  const containerRef = useStaggerAnimation(0.1);

  return (
    <section className="py-32 px-4 bg-[#1A1412] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-dark-brown mb-4">
            Find Us
          </h2>
          <p className="font-cormorant text-xl text-brown-700 max-w-2xl mx-auto">
            A glimpse into our world of Japanese-French artisan pastries
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-brown-500 mx-auto mt-4"></div>
        </div>

       
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`
                group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl smooth-hover cursor-pointer
                ${index === 0 ? 'col-span-2 row-span-2' : ''}
                ${index === 2 ? 'md:col-span-2' : ''}
              `}
            >
             
              <div className={`relative ${index === 0 ? 'h-96' : 'h-48'}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 smooth-hover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-dark-brown/20 to-transparent opacity-0 group-hover:opacity-100 smooth-hover flex items-end justify-start p-6">
                  <p className="text-white font-cormorant text-xl font-semibold">
                    {image.alt}
                  </p>
                </div>
              </div>

              
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-pink-400/50 to-transparent opacity-0 group-hover:opacity-100 smooth-hover"></div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-12">
          <p className="font-cormorant text-lg text-brown-700 mb-6">
            Follow us on our socials
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-brown-500 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-brown-600 smooth-hover shadow-lg hover:shadow-xl transform hover:scale-105">
            @caferosso
          </button>
        </div>
      </div>
    </section>
  );
}