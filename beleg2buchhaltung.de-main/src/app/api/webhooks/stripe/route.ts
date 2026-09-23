export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { kv } from '@vercel/kv';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionId = session.id;
        const subId =
          (session.subscription as string | null) ||
          (session as any).parent?.subscription_details?.subscription;
        const ipHash = session.client_reference_id;

        // 1. Spara sessions-ID som aktiv nyckel i KV
        if (sessionId) {
          await kv.set(`b2d:session:${sessionId}`, 'active');
          console.log(`✅ Pro unlocked for session: ${sessionId}`);
        }

        // 2. Spara koppling så vi vet vilken session som tillhör abonnemanget vid uppsägning
        if (subId && sessionId) {
          await kv.set(`b2d:sub_to_session:${subId}`, sessionId);
        }

        // 3. Behåll IP/enhetslåsningen som extra backup om det finns
        if (ipHash) {
          await kv.set(`b2d:pro:${ipHash}`, true);
          if (subId) {
            await kv.set(`b2d:sub_to_ip:${subId}`, ipHash);
          }
          console.log(`✅ Pro unlocked for ipHash: ${ipHash}`);
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as any;

        // Hämtar subId både från 2026-08-26.dahlia (parent) och äldre versioner
        const subId =
          invoice.subscription ||
          invoice.parent?.subscription_details?.subscription ||
          invoice.lines?.data?.[0]?.parent?.subscription_item_details?.subscription;

        console.log(`ℹ️ invoice.paid mottaget. funnet subId: ${subId}`);

        if (subId) {
          let sessions = await stripe.checkout.sessions.list({
            subscription: subId,
            limit: 1,
          });

          // Fallback: sök på customer om subscription-sökningen är tom
          if (sessions.data.length === 0 && invoice.customer) {
            sessions = await stripe.checkout.sessions.list({
              customer: invoice.customer as string,
              limit: 1,
            });
          }

          if (sessions.data.length > 0) {
            const session = sessions.data[0];
            const sessionId = session.id;
            const ipHash = session.client_reference_id;

            if (sessionId) {
              await kv.set(`b2d:session:${sessionId}`, 'active');
              await kv.set(`b2d:sub_to_session:${subId}`, sessionId);
              console.log(`✅ Pro unlocked via invoice.paid for session: ${sessionId}`);
            }

            if (ipHash) {
              await kv.set(`b2d:pro:${ipHash}`, true);
              await kv.set(`b2d:sub_to_ip:${subId}`, ipHash);
              console.log(`✅ Pro unlocked via invoice.paid for ipHash: ${ipHash}`);
            }
          } else {
            console.warn(`⚠️ Ingen checkout-session hittades för subId: ${subId}`);
          }
        } else {
          console.warn('⚠️ Kunde inte hitta något subId på fakturan.');
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const subId = subscription.id;

        const sessionId = await kv.get<string>(`b2d:sub_to_session:${subId}`);
        if (sessionId) {
          await kv.del(`b2d:session:${sessionId}`);
          await kv.del(`b2d:sub_to_session:${subId}`);
          console.log(`🚫 Pro access revoked for session: ${sessionId}`);
        }

        const ipHash = await kv.get<string>(`b2d:sub_to_ip:${subId}`);
        if (ipHash) {
          await kv.del(`b2d:pro:${ipHash}`);
          await kv.del(`b2d:sub_to_ip:${subId}`);
          console.log(`🚫 Pro access revoked for ipHash: ${ipHash}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any;
        const subId =
          invoice.subscription ||
          invoice.parent?.subscription_details?.subscription;

        if (subId) {
          const sessionId = await kv.get<string>(`b2d:sub_to_session:${subId}`);
          if (sessionId) {
            await kv.set(`b2d:session:${sessionId}`, 'past_due');
            console.log(`⚠️ Pro access suspended (payment failed) for session: ${sessionId}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (e: any) {
    console.error('WEBHOOK ERROR:', e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
