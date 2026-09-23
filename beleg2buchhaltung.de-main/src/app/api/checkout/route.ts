export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20"
});

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function getDeviceHash(req: NextRequest) {
  const fp = req.headers.get("x-fingerprint") || req.headers.get("user-agent") || "no-fp";
  return crypto.createHash("sha256").update(fp).digest("hex").slice(0, 12);
}

export async function POST(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || "https://beleg2buchhaltung.de";

    if (!process.env.STRIPE_PRICE_ID) {
      throw new Error("STRIPE_PRICE_ID saknas i Vercel env");
    }

    const ip = getIp(req);
    const device = getDeviceHash(req);
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      mode: "subscription",
      client_reference_id: ipHash,
      // 1. Tillåter momsnummer (USt-IdNr)
      tax_id_collection: {
        enabled: true,
      },
      // 2. Tvingar fram ett tydligt fält för Företagsnamn direkt i kassan:
      custom_fields: [
        {
          key: "company_name",
          label: {
            type: "custom",
            custom: "Firmenname / Kanzlei (B2B)",
          },
          type: "text",
          optional: false, // Kräver att kunden fyller i sitt företagsnamn
        },
      ],
      success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });

  } catch (e: any) {
    console.error("STRIPE CHECKOUT ERROR:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
