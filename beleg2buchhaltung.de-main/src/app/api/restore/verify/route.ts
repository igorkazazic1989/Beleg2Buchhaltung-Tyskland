export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Fehlender Token.' }, { status: 400 });
    }

    const record = await kv.get<{ sessionId: string }>(`b2d:restoretoken:${token}`);
    if (!record || !record.sessionId) {
      return NextResponse.json({ error: 'Dieser Link ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen an.' }, { status: 400 });
    }

    // Einmal-Nutzung — sofort löschen, damit derselbe Link nicht zweimal
    // verwendet werden kann (z.B. falls er versehentlich weitergeleitet wird).
    await kv.del(`b2d:restoretoken:${token}`);

    return NextResponse.json({ success: true, sessionId: record.sessionId });
  } catch (error: any) {
    console.error('RESTORE VERIFY ERROR:', error.message);
    return NextResponse.json({ error: 'Ein Fehler ist aufgetreten.' }, { status: 500 });
  }
}
