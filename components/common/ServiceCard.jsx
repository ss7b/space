'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import RichTextRenderer from "./RichTextRenderer";
// import { Button } from "@/components/ui/button"; // اختياري

export default function ServiceCard({ title, desc, icon: Icon }) {
  return (
    <Card className="group relative h-full overflow-hidden rounded-2xl border-white/10 bg-white/[0.03] p-0 backdrop-blur transition hover:shadow-xl">
      {/* هالة الهوفر */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100"
        style={{ background: `linear-gradient(120deg, rgba(40,171,226,0.25), transparent 30%, transparent 70%, rgba(255,255,255,0.2))` }}
      />
      <CardContent className="relative z-10 flex h-full flex-col items-center justify-start p-6 text-center">
        {/* الأيقونة */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10">
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* العنوان */}
        <h3 className="text-lg font-bold text-white">{title}</h3>

        <RichTextRenderer
          className="mt-2 text-sm text-white/70 min-h-[3.5rem]"
          blocks={desc}  
        />

        {/* زر اختياري مع push لأسفل لو احتجت */}
        {/* <div className="mt-4">
          <Button className="rounded-xl bg-white/10 text-white hover:bg-white/20">اطلب الخدمة</Button>
        </div> */}
      </CardContent>
    </Card>
  );
}
