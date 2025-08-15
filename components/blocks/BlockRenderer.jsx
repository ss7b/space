"use client";
import Hero from "./Hero";
import About from "./About";
import PartnersGrid from "./PartnersGrid";
import RichTextBlock from "./RichTextBlock";

export default function BlockRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.__component) {
          case "sections.hero":
            return <Hero key={i} {...block} />;
          case "sections.about":
            return <About key={i} {...block} />;
          case "sections.partners-grid":
            return <PartnersGrid key={i} {...block} />;
          case "sections.rich-text":
            return <RichTextBlock key={i} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}