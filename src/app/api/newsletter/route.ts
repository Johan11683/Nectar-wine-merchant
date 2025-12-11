import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  email: string;
};

const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null) as Payload | null;

  if (!data || !data.email) {
    return Response.json({ ok: false, error: "Missing email" }, { status: 400 });
  }

  if (!isEmail(data.email)) {
    return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const to = "monard.johan@yahoo.fr";
  const from = process.env.MAIL_FROM || `"Nectar Newsletter" <${process.env.SMTP_USER}>`;

  const subject = "Nouvelle entrée dans la newsletter !";
  const text = `Un nouvel abonné vient de s'inscrire : ${data.email}`;
  const html = `
    <h2>Nouvelle entrée dans la newsletter !</h2>
    <p>Email inscrit : <strong>${data.email}</strong></p>
  `;

  try {
    await transporter.sendMail({ from, to, subject, text, html });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("NEWSLETTER_MAIL_ERROR", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
