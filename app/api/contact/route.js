// app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message, subject, phone } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ ok: false, error: "الحقول مطلوبة." }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === "true"
        : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const safe = (v) => String(v ?? "").replace(/\n/g, "<br/>");

    const logoUrl =
      process.env.MAIL_LOGO_URL;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height:1.6; background:#f9fafb; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; border:1px solid #e5e7eb;">
          
          <!-- شعار -->
          <div style="text-align:center; padding:20px; background:#f3f4f6;">
            <img src="${logoUrl}" alt="Logo" style="max-height:60px;"/>
          </div>

          <!-- التفاصيل -->
          <div style="padding:20px;">
            <h2 style="margin-bottom:15px; color:#111827;">📩 تفاصيل الرسالة</h2>
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
              <tr>
                <td style="padding:8px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">الاسم</td>
                <td style="padding:8px; border:1px solid #e5e7eb;">${safe(name)}</td>
              </tr>
              <tr>
                <td style="padding:8px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">البريد</td>
                <td style="padding:8px; border:1px solid #e5e7eb;">${safe(email)}</td>
              </tr>
              <tr>
                <td style="padding:8px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">الجوال</td>
                <td style="padding:8px; border:1px solid #e5e7eb;">${safe(phone || "-")}</td>
              </tr>
              <tr>
                <td style="padding:8px; border:1px solid #e5e7eb; background:#f9fafb; font-weight:bold;">الموضوع</td>
                <td style="padding:8px; border:1px solid #e5e7eb;">${safe(subject || "-")}</td>
              </tr>
            </table>

            <h3 style="margin-bottom:10px; color:#111827;">💬 نص الرسالة:</h3>
            <div style="white-space:pre-line; padding:15px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:6px;">
              ${safe(message)}
            </div>
          </div>

          <div style="text-align:center; font-size:12px; color:#6b7280; padding:15px; background:#f3f4f6;">
            تم إرسال هذه الرسالة من مؤسسة سدن القمة للتقنية .
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: subject
        ? `(${subject}) رسالة جديدة من: ${name}`
        : `رسالة جديدة من: ${name}`,
      text: `الاسم: ${name}\nالبريد: ${email}\nالجوال: ${
        phone || "-"
      }\nالموضوع: ${subject || "-"}\n\n${message}`,
      html: htmlBody,
    });

    return Response.json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500 }
    );
  }
}
