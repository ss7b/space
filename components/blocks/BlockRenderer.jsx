'use client';
import React from 'react';
import HeroBlock from './HeroBlock';
import WhatWeDoBlock from './WhatWeDoBlock';
import AboutValuesBlock from './AboutValuesBlock';
import PartnersBlock from './PartnersBlock';
import HeroSliderBlock from './HeroSliderBlock';
import HeroSimpleBlock from './HeroSimpleBlock';
import ValuesGlassyBlock from './ValuesGlassyBlock';
import AboutRichGlassyBlock from './AboutRichGlassyBlock';
import { normalizeMedia } from '../utils/media';
import ServicesGridBlock from './ServicesGridBlock';

export default function BlockRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((b, i) => {
        const kind = b.__component || b.type;

        switch (kind) {
          case 'section.hero-section':
            return (
              <HeroBlock
                key={i}
                title={b.title}
                subtitle={b.subtitle}
                primary_cta_text={b.primary_cta_text}
                primary_cta_link={b.primary_cta_link}
                secondary_cta_text={b.secondary_cta_text}
                secondary_cta_link={b.secondary_cta_link}
                badge_text={b.badge_text}
              />
            );

          case 'section.hero-slider':
            return (
              <HeroSliderBlock
                key={i}
                slides={(b.slides || []).map(s => ({
                  title: s.title,
                  description: s.description,
                  cta_text: s.cta_text,
                  cta_link: s.cta_link,
                  image: normalizeMedia(s.image),
                }))}
              />
            );

          case 'section.hero-simple':
            return (
              <HeroSimpleBlock
                key={i}
                title={b.title}
                background_image={normalizeMedia(b.background_image)}
                overlay={typeof b.overlay === 'boolean' ? b.overlay : true}
                minHeight={b.minHeight || '70vh'}
              />
            );

          case 'section.what-we-do':
            return (
              <WhatWeDoBlock
                key={i}
                section_title={b.section_title}
                section_subtitle={b.section_subtitle}
                steps={b.steps || []}
              />
            );

          case 'section.about-values':
            return (
              <AboutValuesBlock
                key={i}
                section_title={b.section_title}
                section_subtitle={b.section_subtitle}
                about_title={b.about_title}
                about_paragraph={b.about_paragraph}
                button_text={b.button_text}
                button_link={b.button_link}
                right_image={normalizeMedia(b.right_image)}
                values={b.values || []}
                mission_items={b.mission_items || []}
              />
            );

          case 'section.values-glassy':
            return (
              <ValuesGlassyBlock
                key={i}
                section_title={b.section_title}
                section_subtitle={b.section_subtitle}
                image={b.image}
                items={(b.items || []).map(v => ({
                  icon_name: v.icon_name,
                  title: v.title,
                  desc: v.desc,
                }))}
              />
            );

          case 'section.about-rich-glassy':
            return (
              <AboutRichGlassyBlock
                key={i}
                title={b.title}
                content={b.content}
                image={normalizeMedia(b.image)}
              />
            );

          case 'section.partners-marquee': {
            const logos = (b.partners || [])
              .map(p => normalizeMedia(p?.logo?.[0]))
              .filter(Boolean);
            return <PartnersBlock key={i} logos={logos} title={b.section_title} subtitle={b.section_subtitle} />;
          }

          case 'section.services-grid':
            return (
              <ServicesGridBlock
                key={i}
                section_title={b.section_title}
                section_subtitle={b.section_subtitle}
                cta_text={b.cta_text}
                cta_link={b.cta_link}
                services={Array.isArray(b.services) ? b.services : []}
                show_all={!!b.show_all}
                limit={b.limit ?? 24}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
