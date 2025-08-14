'use client';
export default function WavesBG() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-60">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-40 w-full">
        <path
          d="M0,80 C240,140 480,40 720,90 C960,140 1200,60 1440,110"
          stroke="rgba(40,171,226,0.5)" strokeWidth="6" fill="none"
          className="wave-anim-1"
        />
      </svg>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-40 w-full">
        <path
          d="M0,140 C260,60 520,160 780,110 C1040,60 1300,140 1560,100"
          stroke="rgba(255,255,255,0.25)" strokeWidth="10" fill="none"
          className="wave-anim-2"
        />
      </svg>
      <style>{`
        .wave-anim-1 { animation: slideX 6s ease-in-out infinite alternate; }
        .wave-anim-2 { animation: slideX 8s ease-in-out infinite alternate-reverse; }
        @keyframes slideX { from { transform: translateX(-20px); } to { transform: translateX(20px); } }
      `}</style>
    </div>
  );
}
