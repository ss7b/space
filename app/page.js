'use client';

import React from "react";
import { brand } from "@/constants/brand";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Values from "@/components/sections/Values";
import AboutUs from "@/components/sections/AboutUs";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Partners from "@/components/sections/Partners";
import Footer from "@/components/layout/Footer";
import NetBG from "@/components/common/NetBG";
import AboutValuesSection from "@/components/sections/AboutValuesSection";

export default function LandingPage() {
  return (
    <main className="min-h-screen w-full text-white" style={{ backgroundColor: brand.navy }}>
      <style>{`:root{--sky:${brand.sky};--navy:${brand.navy};}`}</style>
      <div className="relative">
              <NetBG
                points={90}
                linkDistance={150}
                speed={0.4}
                nodeSize={2}
                nodeColor="#ff4db8"
                lineColor="#ff4db8"
                lineMaxOpacity={0.35}
              />
        <Hero />
        {/* <Services /> */}
        {/* <Values />
        <AboutUs /> */}
        <AboutValuesSection />
        <WhatWeDo />
        <Partners />
        <Footer />
      </div>
    </main>
  );
}
