import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import type { Product } from '../data/products';

export interface CartItem extends Product {
  quantity: number;
}

interface CartPageProps {
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onStartShopping: () => void;
}

export function CartPage({
  items,
  onClose,
  onRemoveItem,
  onUpdateQuantity,
  onStartShopping,
}: CartPageProps) {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Fade in backdrop
    tl.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
      0
    );

    // Slide in from right
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'back.out' },
        0.1
      );
    }

    // Stagger cart items
    const displayItems = itemsRef.current.filter(
      (item) => item !== null
    ) as HTMLDivElement[];

    if (displayItems.length > 0) {
      tl.fromTo(
        displayItems,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: {
            amount: 0.2,
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

  if (items.length === 0) {
    return (
      <div
        ref={pageRef}
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-orange-900 z-50 flex items-center justify-center p-4"
        style={{ opacity: 0 }}
        onClick={onClose}
      >
        <div
          ref={contentRef}
          className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-3xl max-w-2xl w-full border border-orange-500/30 p-12 text-center"
          style={{ opacity: 0, x: 100 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-orange-400 transition-colors hover:scale-110 duration-300"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Empty Cart Icon */}
          <div className="mb-6 flex justify-center">
            <div className="p-4 rounded-full bg-orange-500/20 border border-orange-500/50">
              <ShoppingBag className="w-12 h-12 text-orange-400" />
            </div>
          </div>

          {/* Empty State Message */}
          <h2 className="text-3xl font-black text-white mb-3">
            Cart is <span className="text-orange-500">Empty</span>
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            You haven't added any products yet. Start shopping to add items to your cart!
          </p>

          {/* Start Shopping Button */}
          <button
            onClick={() => {
              onStartShopping();
              onClose();
            }}
            className="w-full px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10">Start Shopping</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
          </button>

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-orange-500/10 rounded-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-orange-500/10 rounded-2xl pointer-events-none" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={pageRef}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-orange-900 z-50 flex flex-col overflow-hidden"
      style={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Header */}
      <div className="sticky top-0 z-40 px-8 py-6 bg-black/40 backdrop-blur-sm border-b border-orange-500/20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-4xl font-black text-white">
              Shopping <span className="text-orange-500">Cart</span>
            </h1>
            <p className="text-white/60 mt-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
            </p>
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
        <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    itemsRef.current[index] = el;
                  }}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-orange-500/30 p-6 flex gap-6 hover:border-orange-500/60 transition-all duration-300 group"
                  style={{
                    opacity: 0,
                    x: 50,
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)',
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      boxShadow: '0 0 0 rgba(249, 115, 22, 0)',
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }}
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-950 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain"
                      style={{
                        filter: 'drop-shadow(0 5px 10px rgba(139, 69, 19, 0.3))',
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-white/60 text-sm">{item.material}</p>
                    </div>
                    <div className="text-2xl font-black text-orange-500">
                      ${item.price}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="flex items-center gap-2 bg-gray-950 rounded-full p-1">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="p-2 hover:bg-orange-500/20 rounded-full transition-colors text-white/70 hover:text-orange-400"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-white font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-orange-500/20 rounded-full transition-colors text-white/70 hover:text-orange-400"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-white/70 hover:text-red-400 transition-colors hover:scale-110 duration-300 group/btn"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-white/60 text-sm mb-2">Subtotal</p>
                    <p className="text-2xl font-black text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-orange-500/30 p-6 space-y-6">
              <h3 className="text-2xl font-bold text-white">Order Summary</h3>

              {/* Price Breakdown */}
              <div className="space-y-3 border-b border-orange-500/20 pb-6">
                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Tax (estimated)</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-3xl font-black text-orange-500">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden">
                <span className="relative z-10">Proceed to Checkout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => {
                  onStartShopping();
                  onClose();
                }}
                className="w-full px-6 py-3 border-2 border-orange-500/50 hover:border-orange-500 text-orange-400 font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Continue Shopping
              </button>

              {/* Benefits */}
              <div className="pt-4 space-y-2 text-xs text-white/60 border-t border-orange-500/20">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day returns guarantee</p>
                <p>✓ Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
