import { useEffect, useRef } from 'react';
import { X, ShoppingCart, Heart } from 'lucide-react';
import gsap from 'gsap';
import type { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (productId: number) => void;
}

export function ProductDetail({
  product,
  onClose,
  onAddToCart,
}: ProductDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in backdrop
    tl.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
      0
    );

    // Slide in content from right
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'back.out' },
        0.1
      );
    }

    // Image zoom in
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        0.2
      );
    }

    // Info fade in
    if (infoRef.current) {
      tl.fromTo(
        infoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        0.3
      );
    }

    return () => {
      tl.kill();
    };
  }, [product]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <div
        ref={contentRef}
        className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-3xl max-w-4xl w-full border border-orange-500/30 p-8 max-h-[90vh] overflow-y-auto"
        style={{
          opacity: 0,
          x: 100,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-orange-400 transition-colors hover:scale-110 duration-300"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="flex flex-col items-center justify-center">
            <img
              ref={imageRef}
              src={product.image}
              alt={product.name}
              className="w-full max-w-xs object-contain drop-shadow-2xl mb-6"
              style={{
                filter: 'drop-shadow(0 20px 40px rgba(249, 115, 22, 0.4))',
                opacity: 0,
                scale: 0.8,
              }}
            />
            {/* Decorative corner */}
            <div className="absolute top-20 right-20 w-32 h-32 border border-orange-500/20 rounded-3xl pointer-events-none" />
          </div>

          {/* Info Section */}
          <div ref={infoRef} style={{ opacity: 0, y: 20 }}>
            <h1 className="text-4xl font-black text-white mb-4">
              <span className="text-orange-500">{product.name.split(' ')[0]}</span>
              {' '}
              {product.name.split(' ').slice(1).join(' ')}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-yellow-400">★</span>
                <span className="text-2xl font-bold text-white">{product.rating}</span>
              </div>
              <span className="text-white/50">({product.reviews} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="text-5xl font-black text-orange-500 mb-8">
              ${product.price}
            </div>

            {/* Description */}
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="bg-gray-950/50 rounded-2xl border border-orange-500/20 p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm font-semibold mb-1">Material</p>
                  <p className="text-white font-bold">{product.material}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm font-semibold mb-1">Color</p>
                  <p className="text-white font-bold">{product.color}</p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <p className="text-white font-bold mb-3">Available Sizes</p>
              <div className="grid grid-cols-4 gap-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    className="py-2 px-3 border border-orange-500/50 rounded-lg text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 hover:scale-105"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => onAddToCart(product.id)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
               
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-orange-500/50 hover:border-orange-500 text-orange-400 font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Additional Info */}
            <p className="text-white/40 text-xs mt-6 text-center">
              ✓ Free Shipping on Orders Over $100 | ✓ 30-Day Returns | ✓ 2-Year Warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
