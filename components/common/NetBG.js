'use client';

import React, { useEffect, useRef } from 'react';

export default function NetBG({
  points = 85,
  linkDistance = 140,
  speed = 0.35,
  nodeSize = 2,
  nodeColor = '#ff4db8',   // وردي قريب من الصورة
  lineColor = '#ff4db8',   // نفس اللون للخطوط
  lineMaxOpacity = 0.35,
  className = 'absolute inset-0'
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ w: 300, h: 150, dpr: 1 });

  // تهيئة النقاط
  const initParticles = (w, h) => {
    const arr = [];
    for (let i = 0; i < points; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = speed * (0.5 + Math.random()); // سرعات متقاربة
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd
      });
    }
    particlesRef.current = arr;
  };

  // رسم إطار
  const draw = (ctx) => {
    const { w, h, dpr } = sizeRef.current;
    ctx.clearRect(0, 0, w * dpr, h * dpr);

    const ps = particlesRef.current;

    // تحديث مواقع النقاط مع ارتداد على الحواف
    for (let p of ps) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x <= 0 || p.x >= w) p.vx *= -1;
      if (p.y <= 0 || p.y >= h) p.vy *= -1;
    }

    // رسم الخطوط بين النقاط القريبة
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x;
        const dy = ps[i].y - ps[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < linkDistance) {
          const alpha = (1 - dist / linkDistance) * lineMaxOpacity;
          ctx.strokeStyle = toRGBA(lineColor, alpha);
          ctx.lineWidth = 1 * dpr;
          ctx.beginPath();
          ctx.moveTo(ps[i].x * dpr, ps[i].y * dpr);
          ctx.lineTo(ps[j].x * dpr, ps[j].y * dpr);
          ctx.stroke();
        }
      }
    }

    // رسم النقاط
    ctx.fillStyle = nodeColor;
    for (let p of ps) {
      ctx.beginPath();
      ctx.arc(p.x * dpr, p.y * dpr, nodeSize * dpr, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // لون مع ألفا
  const toRGBA = (hex, a) => {
    const v = hex.replace('#', '');
    const bigint = parseInt(v.length === 3 ? v.split('').map(c => c + c).join('') : v, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r},${g},${b},${a})`;
  };

  // حلقة الأنيميشن
  const loop = (ctx) => {
    draw(ctx);
    rafRef.current = requestAnimationFrame(() => loop(ctx));
  };

  // تحجيم الكانفس حسب DPR
  const resize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const styles = getComputedStyle(parent);
    const w = Math.floor(parent.clientWidth || parseInt(styles.width));
    const h = Math.floor(parent.clientHeight || parseInt(styles.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // جودة معقولة
    sizeRef.current = { w, h, dpr };
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    if (!particlesRef.current.length) initParticles(w, h);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    resize();
    loop(ctx);

    // تفاعل بسيط مع المؤشر (يجذب النقاط قليلاً)
    const onMove = (e) => {
      const { w, h } = sizeRef.current;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (let p of particlesRef.current) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 160 * 160) { // مجال تأثير
          p.vx += dx * 0.00003;
          p.vy += dy * 0.00003;
        }
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
