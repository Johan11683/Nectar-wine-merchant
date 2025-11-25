// app/api/contact/route.ts
import type { NextRequest } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  fullname: string
  email: string
  phone?: string
  negoce: string // le nom du négoce / caviste
  message: string
  website?: string // honeypot
}

const isEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

export async function POST(req: NextRequest) {
  const data = (await req.json().catch(() => null)) as Payload | null
  if (!data) {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { fullname, email, phone, message, negoce, website } = data

  // Honeypot : si "website" est rempli, on fait comme si tout était ok
  if (website) {
    return Response.json({ ok: true })
  }

  // Validation basique
  if (!fullname || !email || !message || !negoce) {
    return Response.json({ ok: false, error: 'Missing fields' }, { status: 400 })
  }

  if (!isEmail(email)) {
    return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 })
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
  })

  const to = process.env.CONTACT_TO || process.env.SMTP_USER!
  const from = process.env.MAIL_FROM || `"Nectar Wine Merchant" <${process.env.SMTP_USER}>`

  const subject = `Nouveau message (${negoce}) — ${fullname}`

  const text = [
    `Nom : ${fullname}`,
    `Email : ${email}`,
    phone ? `Téléphone : ${phone}` : null,
    `Négoce : ${negoce}`,
    `---`,
    message,
  ]
    .filter(Boolean)
    .join('\n')

  const safeMessage = message
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const html = `
    <h2>Nouveau message via le site</h2>
    <p><strong>Nom :</strong> ${fullname}</p>
    <p><strong>Email :</strong> ${email}</p>
    ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
    <p><strong>Négoce :</strong> ${negoce}</p>
    <hr />
    <pre style="white-space:pre-wrap;font:inherit;margin:0">${safeMessage}</pre>
  `

  try {
    await transporter.sendMail({ from, to, subject, text, html })
    return Response.json({ ok: true })
  } catch (err) {
    console.error('MAIL_ERROR', err)
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}
