// app/api/contact/route.js
import nodemailer from "nodemailer";

// تشغيل على Node.js (مطلوب لنودميلر)
export const runtime = "nodejs";
// لا كاش للمسار
export const dynamic = "force-dynamic";

function envOrThrow(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

export async function POST(req) {
  try {
    const { name, email, message, subject, phone } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "الحقول مطلوبة." }), { status: 400 });
    }

    // ENV
    const host   = envOrThrow("SMTP_HOST");            // مثال: smtp.zoho.com
    const port   = Number(process.env.SMTP_PORT ?? 465);
    const secure = (process.env.SMTP_SECURE ?? "true") === "true"; // 465=true, 587=false
    const user   = envOrThrow("SMTP_USER");
    const pass   = envOrThrow("SMTP_PASS");
    const to     = process.env.MAIL_TO || user;
    const from   = process.env.MAIL_FROM || user;

    const site   = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/,"");
    const logoUrl = `${site}/logo.png`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    const safe = (v) => String(v ?? "").replace(/\n/g, "<br/>");

    // قالب RTL
    const htmlBody = `
      <div style="font-family:Tahoma, Arial, sans-serif; direction:rtl; text-align:right; line-height:1.8; background:#f9fafb; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <!-- الشعار -->
          <div style="text-align:center; padding:20px; background:#f3f4f6;">
            <img src="${logoUrl}" alt="Logo" style="max-height:60px;" />
          </div>

          <!-- التفاصيل -->
          <div style="padding:20px;">
            <h2 style="margin:0 0 15px; color:#111827;">📩 تفاصيل الرسالة</h2>
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px; direction:rtl; text-align:right;">
              <tr>
                <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">الاسم</td>
                <td style="padding:10px; border:1px solid #e5e7eb;">${safe(name)}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">البريد</td>
                <td style="padding:10px; border:1px solid #e5e7eb;">${safe(email)}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">الجوال</td>
                <td style="padding:10px; border:1px solid #e5e7eb;">${safe(phone || "-")}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">الموضوع</td>
                <td style="padding:10px; border:1px solid #e5e7eb;">${safe(subject || "-")}</td>
              </tr>
            </table>

            <h3 style="margin:0 0 10px; color:#111827;">💬 نص الرسالة</h3>
            <div style="white-space:pre-line; padding:15px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;">
              ${safe(message)}
            </div>
          </div>

          <!-- تذييل -->
          <div style="text-align:center; font-size:12px; color:#6b7280; padding:15px; background:#f3f4f6;">
            تم إرسال هذه الرسالة من نموذج "تواصل معنا" في موقعك.
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: subject ? `(${subject}) رسالة جديدة من: ${name}` : `رسالة جديدة من: ${name}`,
      text: `الاسم: ${name}\nالبريد: ${email}\nالجوال: ${phone || "-"}\nالموضوع: ${subject || "-"}\n\n${message}`,
      html: htmlBody,
    });

    return Response.json({ ok: true });
  } catch (err) {
    // نسجّل داخليًا فقط، ونرجّع رسالة عامة
    console.error("Contact API error:", err);
    return new Response(JSON.stringify({ ok: false, error: "تعذّر الإرسال حالياً. حاول لاحقاً." }), { status: 500 });
  }
}
