// src/components/ShoeCarousel.tsx

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { products } from '../data/products';

export function ShoeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!products.length || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (!sliderRef.current || !containerRef.current) return;

    const width = containerRef.current.offsetWidth;

    gsap.to(sliderRef.current, {
      x: -currentIndex * width,
      duration: 0.8,
      ease: 'power3.inOut',
    });
  }, [currentIndex]);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % products.length);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  const goToSlide = (index: number) => setCurrentIndex(index);

  if (!products.length) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-3xl overflow-hidden border border-orange-500/30 mb-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex h-full"
        style={{ width: `${products.length * 100}%` }}
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-center md:justify-between px-4 md:px-8"
            style={{ width: `${100 / products.length}%` }}
          >
            {/* Left Arrow (hidden mobile) */}
            <button
              onClick={prevSlide}
              className="hidden md:block p-3 rounded-full border border-orange-500/50 hover:scale-110 transition"
            >
              <ChevronLeft className="w-6 h-6 text-orange-400" />
            </button>

            {/* Image (always visible) */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-[220px] md:max-w-xs max-h-80 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Product Info (hidden mobile) */}
            <div className="hidden md:flex flex-1 flex-col justify-center gap-4 text-white">
              <div>
                <h3 className="text-3xl font-black mb-2">
                  <span className="text-orange-500">
                    {product.name.split(' ')[0]}
                  </span>{' '}
                  {product.name.split(' ').slice(1).join(' ')}
                </h3>

                <p className="text-white/70 text-sm max-w-xs">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-orange-500">
                  ${product.price}
                </div>
                <div>
                  ⭐ {product.rating} ({product.reviews})
                </div>
              </div>
            </div>

            {/* Right Arrow (hidden mobile) */}
            <button
              onClick={nextSlide}
              className="hidden md:block p-3 rounded-full border border-orange-500/50 hover:scale-110 transition"
            >
              <ChevronRight className="w-6 h-6 text-orange-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Dots (always visible) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-8 bg-orange-500'
                : 'w-2 bg-orange-500/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
