import { mediaUrl } from "@/lib/strapi";

export default function Hero({ title, subtitle, backgroundImage, ctaText, ctaLink }) {
  const bg = backgroundImage?.url ? mediaUrl(backgroundImage.url) : undefined;
  return (
    <section
      dir="rtl"
      className="relative mb-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-white backdrop-blur"
      style={bg ? { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
    >
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 text-white/85">{subtitle}</p>}
        {ctaText && ctaLink && (
          <a href={ctaLink} className="mt-6 inline-block rounded-xl border border-white/20 bg-white/10 px-6 py-3">
            {ctaText}
          </a>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
    </section>
  );
}