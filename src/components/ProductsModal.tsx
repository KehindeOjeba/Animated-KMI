import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import type { Product } from '../data/products';


interface ProductsModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onAddToCart: (productId: number) => void;
  cartCount: number;
}

export function ProductsModal({
  isOpen,
  products,
  onClose,
  onAddToCart,
  cartCount,
}: ProductsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);
  const productCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const tl = gsap.timeline();

    // Fade in backdrop
    tl.to(
      modalRef.current,
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      },
      0
    );

    // Scale and fade in modal content
    if (contentRef.current) {
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out',
        },
        0.1
      );
    }

    // Stagger product cards in
    if (productCardsRef.current.length > 0) {
      tl.to(
        productCardsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: {
            amount: 0.3,
            from: 'start',
          },
          ease: 'power2.out',
        },
        0.3
      );
    }

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto opacity-0"
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
    >
      <div
        ref={contentRef}
        className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-3xl max-w-6xl w-full border border-orange-500/30 p-8 max-h-[90vh] overflow-y-auto"
        style={{
          scale: 0.95,
          opacity: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with animation */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black text-white">
            <span className="text-orange-500">Premium</span> Collection
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-orange-400 transition-colors hover:scale-110 duration-300"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Products Grid */}
        <div
          ref={productsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                productCardsRef.current[index] = el;
              }}
              className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl overflow-hidden border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer"
              style={{
                opacity: 0,
                y: 30,
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                gsap.to(target, {
                  y: -10,
                  boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
                  duration: 0.3,
                  ease: 'power2.out',
                });

                // Scale image on hover
                const img = target.querySelector('img');
                if (img) {
                  gsap.to(img, {
                    scale: 1.15,
                    duration: 0.4,
                    ease: 'power2.out',
                  });
                }
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                gsap.to(target, {
                  y: 0,
                  boxShadow: '0 0 0 rgba(249, 115, 22, 0)',
                  duration: 0.3,
                  ease: 'power2.out',
                });

                const img = target.querySelector('img');
                if (img) {
                  gsap.to(img, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out',
                  });
                }
              }}
            >
              {/* Product Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-gray-950 to-gray-900 overflow-hidden flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-48 h-48 object-contain transition-transform duration-300"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(139, 69, 19, 0.3))',
                  }}
                />
                {/* Decorative corner */}
                <div className="absolute top-3 right-3 w-12 h-12 border border-orange-500/30 rounded-full" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black text-orange-500">
                    ${product.price}
                  </div>
                  <button
                    onClick={() => onAddToCart(product.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10">Add to Cart</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
