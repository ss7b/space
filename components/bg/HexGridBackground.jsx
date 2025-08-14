'use client';

import React, { useMemo } from 'react';
import { brand } from '@/constants/brand';

/**
 * خلفية شبكة سداسية مع وميض متحرك على الخطوط
 * Props:
 * - width, height: مساحة الرسم داخل الـ viewBox (لا تغيّرها عادة)
 * - cell: نصف قطر السداسي (الحجم)
 * - stroke: لون الخطوط
 * - strokeOpacity: شفافية الخطوط
 * - dot: لون نقاط الزوايا
 * - dotOpacity: شفافية النقاط
 * - className: للتحكّم بالتموضع (مثلا absolute inset-0)
 */
export default function HexGridBackground({
  width = 1600,
  height = 360,
  cell = 42,
  stroke = brand.sky,
  strokeOpacity = 0.35,
  dot = brand.navy,
  dotOpacity = 0.75,
  className = '',
}) {
  // حساب الشبكة مرة واحدة
  const { hexes, edges, dots } = useMemo(() => {
    const sqrt3 = Math.sqrt(3);
    const R = cell;                     // نصف القطر (من المركز للزاوية)
    const hexW = 2 * R;                 // عرض السداسي
    const hexH = sqrt3 * R;             // ارتفاع السداسي (مسافة عمودية بين رأسين)
    const horiz = 1.5 * R;              // المسافة الأفقية بين مراكز السداسيات
    const vert = hexH;                   // المسافة العمودية بين المراكز (flat-top)

    // عدد الصفوف والأعمدة لتغطية كامل الـ viewBox
    const rows = Math.ceil(height / vert) + 2;
    const cols = Math.ceil(width / horiz) + 2;

    const hexes = [];
    const edges = []; // مسارات الخطوط (لعمل وميض dashed فوقها)
    const dots = [];

    const hexPath = (cx, cy) => {
      // رؤوس سداسي مسطّح (flat-top)
      const pts = [
        [cx + R, cy],
        [cx + R / 2, cy + (sqrt3 * R) / 2],
        [cx - R / 2, cy + (sqrt3 * R) / 2],
        [cx - R, cy],
        [cx - R / 2, cy - (sqrt3 * R) / 2],
        [cx + R / 2, cy - (sqrt3 * R) / 2],
      ];
      return { d: `M ${pts.map(p => p.join(',')).join(' L ')} Z`, pts };
    };

    for (let r = 0; r < rows; r++) {
      const cy = r * vert + 12; // padding بسيط
      for (let c = 0; c < cols; c++) {
        const offsetX = (r % 2 === 0) ? 0 : horiz / 2;
        const cx = c * horiz + offsetX + 12;

        const { d, pts } = hexPath(cx, cy);
        hexes.push(d);

        // نضيف المسار كـ edge لطبقة الوميض
        edges.push(d);

        // نقاط الزوايا (دوائر صغيرة)
        pts.forEach(([x, y]) => dots.push({ x, y }));
      }
    }

    return { hexes, edges, dots };
  }, [width, height, cell]);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* ضوء وميض بسيط يمر على الـ dashed */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="b"/>
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* تدرّج بسيط للنقاط (اختياري) */}
        <radialGradient id="dotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={dot} stopOpacity={dotOpacity} />
          <stop offset="100%" stopColor={dot} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* طبقة الخطوط الأساسية */}
      <g stroke={stroke} strokeOpacity={strokeOpacity} fill="none" strokeWidth="1.2">
        {hexes.map((d, i) => (
          <path key={`h-${i}`} d={d} />
        ))}
      </g>

      {/* طبقة الوميض: نفس الخطوط لكن dashed + تحريك dashoffset */}
      <g
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#glow)"
        style={{ mixBlendMode: 'screen' }}
      >
        {edges.map((d, i) => (
          <path
            key={`e-${i}`}
            d={d}
            fill="none"
            strokeOpacity="0.6"
            strokeDasharray="6 28"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-300"
              dur={`${8 + (i % 5)}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </g>

      {/* نقاط الزوايا */}
      <g>
        {dots.map(({ x, y }, i) => (
          <circle
            key={`d-${i}`}
            cx={x}
            cy={y}
            r="2.3"
            fill="url(#dotGrad)"
            opacity="0.85"
          />
        ))}
      </g>

      {/* هالة لونية خفيفة في الخلف لإحساس عمق */}
      <rect
        x="0"
        y="0"
        width={width}
        height={height}
        fill={`url(#fade-${stroke})`}
        opacity="0"
      />
    </svg>
  );
}
