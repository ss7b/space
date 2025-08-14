'use client';

import React, { useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { brand } from "@/constants/brand";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setOk(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setOk(res.ok);
      if (res.ok) e.currentTarget.reset();
    } catch (err) {
      setOk(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] py-16  pt-30" style={{ backgroundColor: brand.navy }} dir="rtl">
      <div className="mx-auto w-[92%] max-w-7xl">
        <SectionTitle title="تواصل معنا" subtitle="يسعدنا تواصلك" />

        {/* أعلى: بطاقات معلومات التواصل */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/70 text-sm">الهاتف</p>
                <p className="font-bold">+966 55 000 0000</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/70 text-sm">البريد الإلكتروني</p>
                <p className="font-bold">contact@example.com</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="rounded-xl border border-white/15 bg-white/10 p-3">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/70 text-sm">العنوان</p>
                <p className="font-bold">المملكة العربية السعودية</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* محتوى: نموذج + خريطة */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* النموذج */}
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-extrabold">أرسل رسالة</h3>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-white/80">الاسم الكامل</label>
                    <Input name="name" required placeholder="اكتب اسمك" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/80">البريد الإلكتروني</label>
                    <Input type="email" name="email" required placeholder="name@email.com" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm text-white/80">رقم الجوال</label>
                    <Input name="phone" placeholder="+9665xxxxxxx" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-white/80">الموضوع</label>
                    <Input name="subject" required placeholder="موضوع الرسالة" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-white/80">الرسالة</label>
                  <Textarea name="message" required rows={6} placeholder="اكتب رسالتك هنا..." className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" disabled={loading} className="rounded-2xl px-6" style={{ backgroundColor: brand.sky, color: brand.navy }}>
                    <Send className="ml-2 h-4 w-4" />
                    {loading ? "جاري الإرسال..." : "إرسال"}
                  </Button>

                  {ok === true && <span className="text-sm text-emerald-400">تم الإرسال بنجاح ✅</span>}
                  {ok === false && <span className="text-sm text-rose-400">تعذّر الإرسال، جرّب لاحقًا ❌</span>}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* خريطة / صورة توضيحية */}
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardContent className="p-0">
              {/* استبدل src بإطار خرائط حقيقي لو رغبت */}
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Saudi%20Arabia&t=&z=5&ie=UTF8&iwloc=&output=embed"
                className="h-[420px] w-full rounded-xl"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
