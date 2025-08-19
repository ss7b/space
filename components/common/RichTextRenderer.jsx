'use client';

import React from 'react';
import Image from 'next/image';
import { mediaUrl } from '@/lib/strapi';

/**
 * يدعم الأنواع الشائعة من محرّر Strapi Blocks:
 * paragraph, heading(level 1-6), list(ordered/unordered), list-item,
 * link, quote, code (block), image/media, text + marks (bold/italic/underline/code/strikethrough)
 * أي نوع غير معروف يتم تجاهله بهدوء.
 */

function isExternal(href = '') {
  try {
    const u = new URL(href);
    return u.protocol.startsWith('http');
  } catch {
    return false;
  }
}

function TextLeaf({ leaf }) {
  let el = leaf.text ?? '';

  // لفّ التأثيرات حسب العلامات
  if (leaf.code) el = <code className="rounded bg-white/10 px-1 py-0.5">{el}</code>;
  if (leaf.underline) el = <u>{el}</u>;
  if (leaf.strikethrough) el = <s>{el}</s>;
  if (leaf.italic) el = <em>{el}</em>;
  if (leaf.bold) el = <strong>{el}</strong>;

  return <>{el}</>;
}

function Inline({ node }) {
  switch (node.type) {
    case 'text':
      return <TextLeaf leaf={node} />;

    case 'link': {
      const href = node.url || node.href || '#';
      const children = (node.children || []).map((n, i) => <Inline key={i} node={n} />);
      const external = isExternal(href);
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
        >
          {children}
        </a>
      );
    }

    case 'line': // بعض الأدوات ترجع سطر جديد
    case 'br':
      return <br />;

    default:
      // أي inline غير معروف: اعرض أطفاله فقط
      return (node.children || []).map((n, i) => <Inline key={i} node={n} />);
  }
}

function Block({ node }) {
  switch (node.type) {
    case 'paragraph':
      return (
        <p className="leading-7 text-white/80">
          {(node.children || []).map((n, i) => <Inline key={i} node={n} />)}
        </p>
      );

    case 'heading': {
      const L = Math.min(Math.max(node.level || 2, 1), 6);
      const Tag = `h${L}`;
      const cls = {
        1: 'text-3xl md:text-4xl',
        2: 'text-2xl md:text-3xl',
        3: 'text-xl md:text-2xl',
        4: 'text-lg md:text-xl',
        5: 'text-base md:text-lg',
        6: 'text-base',
      }[L];
      return (
        <Tag className={`${cls} font-extrabold text-white`}>
          {(node.children || []).map((n, i) => <Inline key={i} node={n} />)}
        </Tag>
      );
    }

    case 'list': {
      const ordered = (node.format || node.order || node.style) === 'ordered';
      const Tag = ordered ? 'ol' : 'ul';
      return (
        <Tag className={`my-3 ms-6 ${ordered ? 'list-decimal' : 'list-disc'} text-white/80`}>
          {(node.children || []).map((item, i) =>
            item?.type === 'list-item' ? (
              <li key={i} className="leading-7">
                {(item.children || []).map((n, j) => <Inline key={j} node={n} />)}
              </li>
            ) : null
          )}
        </Tag>
      );
    }

    case 'quote':
      return (
        <blockquote className="my-4 border-r-4 border-white/20 pr-4 text-white/80">
          {(node.children || []).map((n, i) => <Inline key={i} node={n} />)}
        </blockquote>
      );

    case 'code': {
      const text = (node.children || []).map((n) => (n.text ?? '')).join('');
      const lang = node.language || '';
      return (
        <pre className="my-4 overflow-auto rounded-xl bg-black/50 p-4 text-white/90">
          <code className={`language-${lang}`}>{text}</code>
        </pre>
      );
    }

    // صور/ميديا — تختلف حسب الـ plugin؛ ندعم مفاتيح شائعة
    case 'image':
    case 'media': {
      const rawUrl = node.url || node.src || node.asset?.url || node.image?.url;
      const alt = node.alt || node.caption || 'image';
      const w = node.width || 800;
      const h = node.height || 450;
      if (!rawUrl) return null;
      const src = mediaUrl(rawUrl);
      return (
        <div className="my-4">
          <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            className="h-auto w-full rounded-xl object-contain"
          />
          {node.caption ? (
            <div className="mt-1 text-center text-sm text-white/60">{node.caption}</div>
          ) : null}
        </div>
      );
    }

    default:
      // أي بلوك غير معروف: اعرض الأطفال داخل div
      return (
        <div>
          {(node.children || []).map((n, i) =>
            n?.type ? <Block key={i} node={n} /> : <Inline key={i} node={n} />
          )}
        </div>
      );
  }
}

export default function RichTextRenderer({ blocks = [], className = '' }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return (
    <div className={`prose prose-invert max-w-none prose-p:my-3 prose-headings:mt-6 prose-headings:mb-3 ${className}`}>
      {blocks.map((node, i) => (
        <Block key={i} node={node} />
      ))}
    </div>
  );
}
