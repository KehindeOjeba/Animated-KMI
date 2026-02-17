import { useState } from 'react';
import './App.css';
import { ShoppingCart, Heart, ArrowRight, X } from 'lucide-react';

function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [cart, setCart] = useState<number[]>([]);
  
  const products = [
    { id: 1, name: 'Classic Leather Oxford', price: 120, image: '/shoe1.png' },
    { id: 2, name: 'Premium Chelsea Boot', price: 145, image: '/shoe2.png' },
    { id: 3, name: 'Casual Loafer', price: 110, image: '/shoe3.png' },
    { id: 4, name: 'Elegant Derby Shoe', price: 135, image: '/shoe4.png' },
    { id: 5, name: 'Modern Sneaker', price: 100, image: '/shoe5.png' },
    { id: 6, name: 'Luxury Dress Shoe', price: 160, image: '/shoe6.png' },
  ];

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-8 py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img 
              src="/kensmadeit-logo.png" 
              alt="Kensmadeit" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-bold text-xl tracking-tight">Kensmadeit</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-white/70 hover:text-orange-400 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setShowProducts(true)}
              className="text-white/70 hover:text-orange-400 transition-colors relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white font-medium">
                {cart.length}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Animation Container */}
      <div className="relative z-10 flex items-center justify-center">
        
        {/* Logo Circle - Always visible, hover target */}
        <div 
          className={`
            relative w-[200px] h-[200px] flex items-center justify-center cursor-pointer
            transition-all duration-500 ease-out
            ${isHovered ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}
          `}
          onMouseEnter={() => setIsHovered(true)}
        >
          {/* Glowing border rings */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 animate-glow-pulse" />
          <div className="absolute inset-2 rounded-full border border-orange-500/20" />
          <div className="absolute inset-4 rounded-full border border-orange-500/10" />
          
          {/* Rotating gradient border */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div 
              className="absolute inset-[-50%] animate-border-rotate"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(249, 115, 22, 0.5), transparent, rgba(249, 115, 22, 0.5), transparent)',
              }}
            />
          </div>
          
          {/* Inner circle with logo */}
          <div className="absolute inset-[3px] rounded-full bg-black flex items-center justify-center overflow-hidden">
            <img 
              src="/kensmadeit-logo.png" 
              alt="Kensmadeit Logo" 
              className="w-full h-full object-cover animate-float"
            />
          </div>
          
          {/* Hover hint text */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-orange-500/60 text-sm tracking-wider uppercase">Hover to explore</span>
          </div>
        </div>

        {/* Card - Appears on hover */}
        <div 
          className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            overflow-hidden cursor-default
            transition-all duration-500 ease-out
            ${isHovered 
              ? 'w-[320px] sm:w-[500px] md:w-[600px] h-[400px] sm:h-[350px] rounded-3xl opacity-100 scale-100' 
              : 'w-[200px] h-[200px] rounded-full opacity-0 scale-90 pointer-events-none'
            }
          `}
          style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
            boxShadow: '0 0 40px rgba(249, 115, 22, 0.3), 0 0 80px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card border glow */}
          <div className="absolute inset-0 rounded-3xl border border-orange-500/30" />
          
          {/* Content Container */}
          <div className="relative h-full flex flex-col sm:flex-row items-center justify-between p-6 sm:p-10">
            {/* Left side - Text Content */}
            <div className="flex flex-col items-start gap-4 sm:gap-6 max-w-[280px] z-10">
              <h2 
                className={`
                  text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight
                  transition-all duration-500
                  ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
                style={{
                  textShadow: '0 0 30px rgba(249, 115, 22, 0.5)',
                  transitionDelay: isHovered ? '100ms' : '0ms',
                }}
              >
                <span className="text-orange-500">KENS</span>MADEIT
              </h2>
              
              <p 
                className={`
                  text-sm sm:text-base text-white/70 leading-relaxed
                  transition-all duration-500
                  ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
                style={{ transitionDelay: isHovered ? '200ms' : '0ms' }}
              >
                Handcrafted with precision. Our premium leather shoes blend timeless elegance with modern comfort. Each pair tells a story of artisan craftsmanship.
              </p>
              
              <button 
                className={`
                  group flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 
                  text-white font-semibold rounded-full transition-all duration-300
                  hover:shadow-glow-lg hover:scale-105 active:scale-95
                  ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}
                style={{ transitionDelay: isHovered ? '300ms' : '0ms' }}
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                onClick={() => setShowProducts(true)}
              >
                Shop Now
                <ArrowRight 
                  className={`
                    w-4 h-4 transition-transform duration-300
                    ${isButtonHovered ? 'translate-x-1' : ''}
                  `} 
                />
              </button>
            </div>

            {/* Right side - Shoe Image */}
            <div 
              className={`
                absolute sm:relative right-0 top-1/2 sm:top-auto -translate-y-1/2 sm:translate-y-0
                transition-all duration-700 ease-out
                ${isHovered 
                  ? 'translate-x-0 sm:translate-x-0 opacity-100' 
                  : 'translate-x-[100px] sm:translate-x-[100px] opacity-0'
                }
              `}
              style={{ transitionDelay: isHovered ? '150ms' : '0ms' }}
            >
              <img 
                src="/hero-shoe.png" 
                alt="Handmade Leather Shoe" 
                className="w-[180px] sm:w-[250px] md:w-[300px] h-auto object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(139, 69, 19, 0.4))',
                  transform: 'rotate(-15deg)',
                }}
              />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-20 h-20 border border-orange-500/20 rounded-full" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border border-orange-500/10 rounded-full" />
        </div>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-white/40 text-sm tracking-widest uppercase">
          Handmade Leather Footwear
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-20 left-8 w-px h-20 bg-gradient-to-b from-orange-500/50 to-transparent" />
      <div className="absolute top-20 left-8 h-px w-20 bg-gradient-to-r from-orange-500/50 to-transparent" />
      <div className="absolute bottom-20 right-8 w-px h-20 bg-gradient-to-t from-orange-500/50 to-transparent" />
      <div className="absolute bottom-20 right-8 h-px w-20 bg-gradient-to-l from-orange-500/50 to-transparent" />

      {/* Products Modal */}
      {showProducts && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-3xl max-w-6xl w-full border border-orange-500/30 p-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-black text-white">
                <span className="text-orange-500">Premium</span> Collection
              </h2>
              <button
                onClick={() => setShowProducts(false)}
                className="text-white/70 hover:text-orange-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl overflow-hidden border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                >
                  {/* Product Image Container */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-950 to-gray-900 overflow-hidden flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Decorative corner */}
                    <div className="absolute top-3 right-3 w-12 h-12 border border-orange-500/30 rounded-full" />
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-3xl font-black text-orange-500">
                        ${product.price}
                      </div>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
  );
}

export default App;
