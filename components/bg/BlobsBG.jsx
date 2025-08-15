'use client';
export default function BlobsBG() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-10 top-10 h-64 w-64 rounded-full blur-2xl blob-1" />
      <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full blur-2xl blob-2" />
      <style>{`
        .blob-1 {
          background: radial-gradient(circle at 30% 30%, rgba(40,171,226,0.45), transparent 60%);
          animation: floatY 6s ease-in-out infinite;
        }
        .blob-2 {
          background: radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2), transparent 60%);
          animation: floatY 7s ease-in-out infinite reverse;
        }
        @keyframes floatY { 0% { transform: translateY(0) } 50% { transform: translateY(-12px) } 100% { transform: translateY(0) } }
      `}</style>
    </div>
  );
}
