export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { kv } from '@vercel/kv';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const RESTORE_TOKEN_TTL_SECONDS = 15 * 60; // 15 Minuten
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60; // 1 Stunde
const RATE_LIMIT_MAX_REQUESTS = 3;

// Immer identische Antwort, unabhängig davon, ob die E-Mail einem Kunden
// gehört, ob das Abo aktiv ist, oder ob überhaupt kein Kunde existiert.
// Das verhindert, dass dieser Endpunkt zum Durchprobieren fremder
// E-Mail-Adressen (User Enumeration) missbraucht werden kann.
const GENERIC_RESPONSE = {
  success: true,
  message: 'Falls für diese E-Mail-Adresse ein aktives Pro-Abonnement existiert, haben wir Ihnen soeben einen Bestätigungslink geschickt.',
};

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

async function sendRestoreEmail(to: string, restoreUrl: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    // Kein E-Mail-Anbieter konfiguriert (z.B. lokale Entwicklung) — Link
    // wird geloggt, damit er zum Testen trotzdem nutzbar ist.
    console.log('[restore - kein E-Mail-Anbieter konfiguriert] Link:', restoreUrl);
    return;
  }
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject: 'Ihr beleg2buchhaltung Bestätigungslink',
      text: `Klicken Sie auf den folgenden Link, um Ihren Pro-Zugang auf diesem Gerät zu aktivieren. Der Link ist 15 Minuten gültig und funktioniert nur einmal.\n\n${restoreUrl}\n\nFalls Sie das nicht angefordert haben, können Sie diese E-Mail ignorieren.`,
    }),
  });
  if (!emailRes.ok) throw new Error('Resend API error: ' + emailRes.status);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || email.indexOf('@') === -1) {
      return NextResponse.json({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' }, { status: 400 });
    }
    const cleanEmail = email.trim().toLowerCase();

    // Einfacher Rate-Limit pro IP, damit dieser (jetzt E-Mail versendende)
    // Endpunkt nicht zum Spammen fremder Postfächer missbraucht werden kann.
    const ipHash = crypto.createHash('sha256').update(getIp(req)).digest('hex').slice(0, 16);
    const rateLimitKey = `b2d:restore:ratelimit:${ipHash}`;
    const attempts = (await kv.get<number>(rateLimitKey)) || 0;
    if (attempts >= RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(GENERIC_RESPONSE);
    }
    await kv.set(rateLimitKey, attempts + 1, { ex: RATE_LIMIT_WINDOW_SECONDS });

    const customers = await stripe.customers.list({ email: cleanEmail, limit: 1 });
    if (customers.data.length === 0) {
      return NextResponse.json(GENERIC_RESPONSE);
    }
    const customerId = customers.data[0].id;

    const subscriptions = await stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 1 });
    if (subscriptions.data.length === 0) {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    const sessions = await stripe.checkout.sessions.list({ customer: customerId, limit: 1 });
    const sessionId = sessions.data[0]?.id;
    if (!sessionId) {
      console.error('[restore] Kein Checkout-Session-ID für Kunde:', customerId);
      return NextResponse.json(GENERIC_RESPONSE);
    }

    // Statt die echte Stripe-Session-ID (die als dauerhaftes Pro-Zugangstoken
    // dient) direkt zurückzugeben, wird ein kurzlebiger Einmal-Token
    // erzeugt. Nur wer Zugriff auf das E-Mail-Postfach hat und den Link
    // tatsächlich anklickt, bekommt die echte Session-ID über
    // /api/restore/verify ausgehändigt.
    const restoreToken = crypto.randomBytes(24).toString('hex');
    await kv.set(`b2d:restoretoken:${restoreToken}`, { sessionId }, { ex: RESTORE_TOKEN_TTL_SECONDS });

    const origin = req.headers.get('origin') || 'https://beleg2buchhaltung.de';
    const restoreUrl = `${origin}/?restore_token=${restoreToken}`;
    await sendRestoreEmail(cleanEmail, restoreUrl);

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error: any) {
    console.error('RESTORE ERROR:', error.message);
    // Auch im Fehlerfall keine Details preisgeben.
    return NextResponse.json(GENERIC_RESPONSE);
  }
}
