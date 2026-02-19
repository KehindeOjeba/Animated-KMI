import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedCartProps {
  itemCount: number;
  onClick: () => void;
}

export function AnimatedCart({ itemCount, onClick }: AnimatedCartProps) {
  const cartRef = useRef<HTMLDivElement>(null);
  const wheelLeftRef = useRef<HTMLDivElement>(null);
  const wheelRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweens: ReturnType<typeof gsap.to>[] = [];

    // Continuous rotation animation for wheels
    const wheels = [wheelLeftRef.current, wheelRightRef.current];
    wheels.forEach((wheel) => {
      if (wheel) {
        const tween = gsap.to(wheel, {
          rotation: 360,
          duration: 1.5,
          repeat: -1,
          ease: 'none',
        });
        tweens.push(tween);
      }
    });

    // Subtle bounce animation for cart body
    if (cartRef.current) {
      const tween = gsap.to(cartRef.current, {
        y: -4,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      tweens.push(tween);
    }

    return () => {
      tweens.forEach((tween) => {
        tween.kill();
      });
    };
  }, []);

  return (
    <div
      ref={cartRef}
      onClick={onClick}
      className="relative cursor-pointer hover:scale-110 transition-transform duration-300"
    >
      {/* Cart body */}
      <div className="relative w-8 h-8">
        {/* Cart visual */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-full h-full text-white/70 hover:text-orange-400 transition-colors"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {/* Animated wheels */}
        <div
          ref={wheelLeftRef}
          className="absolute bottom-1 left-1 w-2 h-2 border-2 border-orange-400 rounded-full"
          style={{ transformOrigin: 'center' }}
        />
        <div
          ref={wheelRightRef}
          className="absolute bottom-1 right-1 w-2 h-2 border-2 border-orange-400 rounded-full"
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* Cart badge */}
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs flex items-center justify-center text-white font-medium animate-pulse">
          {itemCount}
        </span>
      )}
    </div>
  );
}
