'use client';
import React, { useMemo } from 'react';

const brand = { white: '#fff', sky: '#28abe2' };

export default function HeroParticles() {
  const dots = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,     // نسبة % ضمن viewBox
      y: Math.random() * 100,
      s: Math.random() * 3 + 1,   // حجم النقطة
      d: Math.random() * 12 + 8,  // مدة الحركة
      delay: Math.random() * 6,   // تأخير
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {dots.map((p) => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.s / 10}
            fill={p.id % 3 === 0 ? brand.sky : p.id % 3 === 1 ? '#78d0ff' : brand.white}
            style={{
              opacity: 0.7,
              filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.25))',
              animation: `drift ${p.d}s ease-in-out ${p.delay}s infinite alternate`,
              transformOrigin: `${p.x}% ${p.y}%`,
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes drift {
          from { transform: translate(0px, 0px) }
          to   { transform: translate(10px, -8px) }
        }
        @media (prefers-reduced-motion: reduce) {
          svg * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
