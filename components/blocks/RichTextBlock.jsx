export default function RichTextBlock({ content }) {
  return (
    <section className="mb-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white backdrop-blur" dir="rtl">
      <div className="[&>p]:mb-3 leading-8 text-white/85" dangerouslySetInnerHTML={{ __html: content || "" }} />
    </section>
  );
}