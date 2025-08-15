import { mediaUrl } from "@/lib/strapi";

export default function About({ heading, richText, image }) {
  return (
    <section className="mb-12 grid gap-6 md:grid-cols-2" dir="rtl">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white backdrop-blur">
        {heading && <h2 className="mb-3 text-2xl font-bold">{heading}</h2>}
        {richText && (
          <div
            className="[&>p]:mb-3 leading-8 text-white/85"
            dangerouslySetInnerHTML={{ __html: richText }}
          />
        )}
      </div>
      {image?.url && (
        <img
          src={mediaUrl(image.url)}
          alt={image.alternativeText || ""}
          className="h-full w-full rounded-2xl border border-white/10 object-cover"
        />
      )}
    </section>
  );
}