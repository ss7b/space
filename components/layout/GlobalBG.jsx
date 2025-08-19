'use client';

import dynamic from 'next/dynamic';

// منع SSR لأن الكومبوننت يستخدم APIs للمتصفح
const NetBG = dynamic(() => import('@/components/common/NetBG'), { ssr: false });

export default function GlobalBG() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <NetBG
        points={70}
        linkDistance={150}
        speed={0.4}
        nodeSize={2}
        nodeColor="#ff4db8"
        lineColor="#ff4db8"
        lineMaxOpacity={0.80}
      />
    </div>
  );
}
