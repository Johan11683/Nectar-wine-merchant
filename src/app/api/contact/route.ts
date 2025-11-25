// app/api/contact/route.ts
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  fullname: string;
  email: string;
  phone?: string;
  message: string;
};

const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// --- Rate limit très simple en mémoire ---
// Fenêtre de temps : 10 minutes
const WINDOW_MS = 10 * 60 * 1000;
// Max de requêtes par IP sur la fenêtre
const MAX_REQUESTS = 5;

type HitInfo = {
  count: number;
  firstHit: number;
};

const hits = new Map<string, HitInfo>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry) {
    // première requête
    hits.set(ip, { count: 1, firstHit: now });
    return false;
  }

  // fenêtre expirée → on reset
  if (now - entry.firstHit > WINDOW_MS) {
    hits.set(ip, { count: 1, firstHit: now });
    return false;
  }

  // encore dans la fenêtre
  entry.count += 1;
  if (entry.count > MAX_REQUESTS) {
    return true;
  }

  hits.set(ip, entry);
  return false;
}

export async function POST(req: NextRequest) {
  // Rate limit par IP (best effort derrière proxy)
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: 'Too many requests' },
      { status: 429 }
    );
  }

  const data = (await req.json().catch(() => null)) as Payload | null;
  if (!data) {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { fullname, email, phone, message } = data;

  // Validation basique (tous obligatoires)
  if (!fullname || !email || !message || !phone) {
    return Response.json({ ok: false, error: 'Missing fields' }, { status: 400 });
  }

  if (!isEmail(email)) {
    return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  // Transport SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true pour 465, sinon false
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
  const from =
    process.env.MAIL_FROM ||
    `"Nectar Wine Merchant" <${process.env.SMTP_USER}>`;

  const subject = `Nouveau message de ${fullname}`;

  const text = [
    `Nom : ${fullname}`,
    `Email : ${email}`,
    phone ? `Téléphone : ${phone}` : null,
    `---`,
    message,
  ]
    .filter(Boolean)
    .join('\n');

  const safeMessage = message
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const html = `
    <h2>Nouveau message via le site</h2>
    <p><strong>Nom :</strong> ${fullname}</p>
    <p><strong>Email :</strong> ${email}</p>
    ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
    <hr />
    <pre style="white-space:pre-wrap;font:inherit;margin:0">${safeMessage}</pre>
  `;

  try {
    await transporter.sendMail({ from, to, subject, text, html });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('MAIL_ERROR', err);
    return Response.json(
      { ok: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
