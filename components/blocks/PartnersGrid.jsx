import { mediaUrl } from "@/lib/strapi";

export default function PartnersGrid({ heading, partners = [] }) {
  return (
    <section className="mb-12" dir="rtl">
      {heading && <h2 className="mb-6 text-2xl font-bold text-white">{heading}</h2>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {partners.map((p) => (
          <a
            key={p.id}
            href={p.website || "#"}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:bg-white/[0.06]"
            title={p.name}
          >
            {p.logo?.url ? (
              <img src={mediaUrl(p.logo.url)} alt={p.name} className="max-h-12 opacity-80 transition group-hover:opacity-100" />
            ) : (
              <span className="text-white/70">{p.name}</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}