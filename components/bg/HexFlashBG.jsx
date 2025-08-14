'use client';

import React, { useId } from 'react';

/**
 * خلفية خلية سداسية مع ومض متحرك بداخلها.
 * ضع هذا المكوّن كـ absolute داخل الفوتر (أو أي قسم) ليكون خلفية لطيفة.
 */
export default function HexFlashBG({ className = "" }) {
  const uid = useId().replace(/:/g, ''); // لتفادي تصادم المعرفات في الـ DOM
  const maskId = `hexMask-${uid}`;
  const gradFillId = `gradFill-${uid}`;
  const gradShineId = `gradShine-${uid}`;
  const blurId = `blur-${uid}`;

  return (
    <svg
      className={className}
      viewBox="0 0 1200 420"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        {/* تعبئة خلفية ناعمة داخل الخلية */}
        <radialGradient id={gradFillId} cx="60%" cy="40%" r="60%">
          <stop offset="0%" stopOpacity="0.18" stopColor="#28abe2" />
          <stop offset="60%" stopOpacity="0.08" stopColor="#28abe2" />
          <stop offset="100%" stopOpacity="0" stopColor="#28abe2" />
        </radialGradient>

        {/* تدرج الوميض (شريط لامع ضيق يتحرك قطرياً) */}
        <linearGradient id={gradShineId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="0.0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.45" />
          <stop offset="55%" stopColor="white" stopOpacity="0.0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* بلور خفيف للوميض */}
        <filter id={blurId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        </filter>

        {/* الماسك: نحصر الوميض داخل خلية سداسية */}
        <mask id={maskId}>
          <rect width="1200" height="420" fill="black" />
          {/* خلية سداسية كبيرة في يمين/وسط الفوتر */}
          <polygon
            fill="white"
            points="
              1120,200
              1010,390
              790,390
              680,200
              790,10
              1010,10
            "
          />
        </mask>
      </defs>

      {/* طبقة الوهج/التعبئة داخل الخلية عبر الماسك */}
      <g mask={`url(#${maskId})`}>
        {/* تعبئة خفيفة لتلوين الخلية */}
        <rect width="1200" height="420" fill={`url(#${gradFillId})`} />

        {/* شريط الوميض المتحرك */}
        <g filter={`url(#${blurId})`} opacity="0.9">
          <rect
            x="-1200"
            y="0"
            width="1200"
            height="420"
            fill={`url(#${gradShineId})`}
          >
            <animate
              attributeName="x"
              from="-1200"
              to="1200"
              dur="9s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
      </g>

      {/* حدود الخلية السداسية لزيادة الوضوح */}
      <polygon
        points="
          1120,200
          1010,390
          790,390
          680,200
          790,10
          1010,10
        "
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />
      {/* خلية ثانية خافتة أصغر لعمق إضافي */}
      <polygon
        points="
          980,210
          910,330
          770,330
          700,210
          770,90
          910,90
        "
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
    </svg>
  );
}
