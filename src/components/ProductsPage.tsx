import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { products } from '../data/products';
import { ShoeCarousel } from './ShoeCarousel';
import { ProductDetail } from './ProductDetail';

interface ProductsPageProps {
  onClose: () => void;
  onAddToCart: (productId: number) => void;
  cartCount: number;
}

export function ProductsPage({
  onClose,
  onAddToCart,
  //cartCount,
}: ProductsPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsGridRef = useRef<HTMLDivElement>(null);
  const productCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in backdrop
    tl.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
      0
    );

    // Slide in header
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'back.out' },
        0.1
      );
    }

    // Stagger product cards
    const cards = productCardsRef.current.filter(
      (card) => card !== null
    ) as HTMLDivElement[];

    if (cards.length > 0) {
      tl.fromTo(
        cards,
        { opacity: 0, y: 30 },
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
  }, []);

  const selectedProductData = products.find((p) => p.id === selectedProduct);

  return (
    <div
      ref={pageRef}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-orange-900 z-50 flex flex-col overflow-hidden"
      style={{
        opacity: 0,
      }}
    >
      {/* Header */}
      <div ref={headerRef} className="sticky top-0 z-40 px-8 py-6 bg-black/40 backdrop-blur-sm border-b border-orange-500/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-black text-white">
              <span className="text-orange-500">Premium</span> Collection
            </h1>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-orange-400 transition-colors hover:scale-110 duration-300 p-2"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full">
          {/* Carousel */}
          <ShoeCarousel />

          {/* Products Grid Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">
              Browse Our <span className="text-orange-500">Collection</span>
            </h2>
            <p className="text-white/60 mt-2">
              Click on any product to see detailed specifications and add to cart
            </p>
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
                  transform: 'translateY(30px)',
                }}
                onClick={() => setSelectedProduct(product.id)}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  gsap.to(target, {
                    y: -10,
                    boxShadow: '0 20px 40px rgba(249, 115, 22, 0.3)',
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  gsap.to(target, {
                    y: 0,
                    boxShadow: '0 0 0 rgba(249, 115, 22, 0)',
                    duration: 0.3,
                    ease: 'power2.out',
                  });
                }}
              >
                {/* Product Image Container */}
                <div className="relative h-64 bg-gradient-to-br from-gray-950 to-gray-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-48 h-48 object-contain transition-transform duration-300 group-hover:scale-110"
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

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white/80 text-sm font-semibold">
                      {product.rating}
                    </span>
                    <span className="text-white/40 text-sm">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-black text-orange-500">
                      ${product.price}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group/btn relative overflow-hidden"
                    >
                      <span className="relative z-10">Add</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && selectedProductData && (
        <ProductDetail
          product={selectedProductData}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}
