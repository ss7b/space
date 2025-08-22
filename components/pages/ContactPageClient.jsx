// components/pages/ContactPageClient.jsx
"use client";

import React, { useState, useMemo } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { brand } from "@/constants/brand";
import useLang from "@/components/utils/useLang";

function MapEmbed({ iframeOrUrl }) {
  const hasIframe = typeof iframeOrUrl === "string" && iframeOrUrl.includes("<iframe");
  if (hasIframe) {
    return (
      <div
        className="h-[420px] w-full overflow-hidden rounded-xl"
        dangerouslySetInnerHTML={{ __html: iframeOrUrl }}
      />
    );
  }
  const src =
    iframeOrUrl && iframeOrUrl.startsWith("http")
      ? iframeOrUrl
      : "https://maps.google.com/maps?q=Saudi%20Arabia&t=&z=5&ie=UTF8&iwloc=&output=embed";
  return (
    <iframe
      title="map"
      src={src}
      className="h-[420px] w-full rounded-xl"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export default function ContactPageClient({ contact = {} }) {
  const { lang, dir, isRTL } = useLang();
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  const t = useMemo(() => {
    if (lang === "en") {
      return {
        pageTitle: "Contact us",
        pageSubtitle: "We’d love to hear from you",
        phone: "Phone",
        email: "Email",
        address: "Address",
        sendMsg: "Send a message",
        fullName: "Full name",
        fullNamePh: "Enter your name",
        emailPh: "name@email.com",
        mobile: "Mobile number",
        mobilePh: "+9665xxxxxxx",
        subject: "Subject",
        subjectPh: "Message subject",
        message: "Message",
        messagePh: "Write your message here…",
        sending: "Sending...",
        send: "Send",
        ok: "Sent successfully ✅",
        fail: "Failed to send, try again ❌",
        ariaSend: "Send message",
      };
    }
    return {
      pageTitle: "تواصل معنا",
      pageSubtitle: "يسعدنا تواصلك",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      address: "العنوان",
      sendMsg: "أرسل رسالة",
      fullName: "الاسم الكامل",
      fullNamePh: "اكتب اسمك",
      emailPh: "name@email.com",
      mobile: "رقم الجوال",
      mobilePh: "+9665xxxxxxx",
      subject: "الموضوع",
      subjectPh: "موضوع الرسالة",
      message: "الرسالة",
      messagePh: "اكتب رسالتك هنا...",
      sending: "جاري الإرسال...",
      send: "إرسال",
      ok: "تم الإرسال بنجاح ✅",
      fail: "تعذّر الإرسال، جرّب لاحقًا ❌",
      ariaSend: "إرسال الرسالة",
    };
  }, [lang]);

  const phoneHref = useMemo(
    () => (contact.phone ? `tel:${String(contact.phone).replace(/\s+/g, "")}` : "#"),
    [contact.phone]
  );
  const emailHref = useMemo(
    () => (contact.email ? `mailto:${contact.email}` : "#"),
    [contact.email]
  );

  async function onSubmit(e) {
    e.preventDefault();
    setOk(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      subject: formData.get("subject") || "",
      message: formData.get("message"),
    };

    // honeypot اختياري
    if (formData.get("_honey")) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setOk(Boolean(json.ok));
      if (json.ok) form.reset();
    } catch {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] py-16 pt-30" style={{ backgroundColor: brand.navy }} dir={dir}>
      <div className="mx-auto w-[92%] max-w-7xl">
        <SectionTitle title={t.pageTitle} subtitle={t.pageSubtitle} />

        {/* بطاقات معلومات التواصل */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-white/70">{t.phone}</p>
                <p className="font-bold">
                  {contact.phone ? <a href={phoneHref}>{contact.phone}</a> : "—"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-white/70">{t.email}</p>
                <p className="font-bold">
                  {contact.email ? <a href={emailHref}>{contact.email}</a> : "—"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-white/70">{t.address}</p>
                <p className="font-bold">{contact.address || "—"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* نموذج + خريطة */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* النموذج */}
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-extrabold">{t.sendMsg}</h3>
              <form onSubmit={onSubmit} className="space-y-4">
                {/* honeypot (اختياري) */}
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-white/80">{t.fullName}</label>
                    <Input
                      name="name"
                      required
                      placeholder={t.fullNamePh}
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/80">{t.email}</label>
                    <Input
                      type="email"
                      name="email"
                      required
                      placeholder={t.emailPh}
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-white/80">{t.mobile}</label>
                    <Input
                      name="phone"
                      placeholder={t.mobilePh}
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/80">{t.subject}</label>
                    <Input
                      name="subject"
                      required
                      placeholder={t.subjectPh}
                      className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-white/80">{t.message}</label>
                  <Textarea
                    name="message"
                    required
                    rows={6}
                    placeholder={t.messagePh}
                    className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-2xl px-6"
                    style={{ backgroundColor: brand.sky, color: brand.navy }}
                    aria-label={t.ariaSend}
                  >
                    <Send className={`${isRTL ? "mr-2" : "ml-2"} h-4 w-4`} />
                    {loading ? t.sending : t.send}
                  </Button>

                  {ok === true && <span className="text-sm text-emerald-400">{t.ok}</span>}
                  {ok === false && <span className="text-sm text-rose-400">{t.fail}</span>}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* الخريطة */}
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="p-0">
              <MapEmbed iframeOrUrl={contact.map} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
