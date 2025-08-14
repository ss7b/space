'use client';

import React from "react";
import { motion } from "framer-motion";

export default function TechBgSVG() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 80% 10%, rgba(40,171,226,0.15), transparent 60%), radial-gradient(1000px 600px at 20% 90%, rgba(28,54,100,0.35), transparent 60%)",
        }}
      />
      {/* dotted rings */}
      <svg className="absolute -right-40 top-10 opacity-50" width="700" height="700" viewBox="0 0 700 700" fill="none">
        <defs>
          <pattern id="dotsA" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="rgba(255,255,255,0.6)" />
          </pattern>
        </defs>
        <circle cx="350" cy="350" r="330" fill="url(#dotsA)" />
      </svg>
      {/* animated curves */}
      <motion.svg
        className="absolute -left-20 -bottom-10 opacity-60"
        width="900" height="600" viewBox="0 0 900 600" fill="none"
        initial={{ x: -20 }} animate={{ x: 20 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <path
          d="M-20 500 C 150 400, 250 650, 450 520 S 800 300, 950 450"
          stroke="rgba(40,171,226,0.5)" strokeWidth="8" fill="none" strokeLinecap="round"
        />
        <path
          d="M-40 540 C 120 480, 300 620, 520 520 S 820 300, 980 420"
          stroke="rgba(255,255,255,0.15)" strokeWidth="10" fill="none" strokeLinecap="round"
        />
      </motion.svg>
      {/* glowing blobs */}
      <motion.div
        className="absolute left-10 top-10 h-64 w-64 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(40,171,226,0.45), transparent 60%)" }}
        animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-20 bottom-20 h-72 w-72 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2), transparent 60%)" }}
        animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }}
      />
    </div>
  );
}
