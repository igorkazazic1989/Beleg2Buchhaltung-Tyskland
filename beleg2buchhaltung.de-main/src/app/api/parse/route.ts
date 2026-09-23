export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { kv } from "@vercel/kv";
import crypto from "crypto";

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}
function getDeviceHash(req: NextRequest) {
  const fp = req.headers.get("x-fingerprint") || req.headers.get("user-agent") || "no-fp";
  return crypto.createHash("sha256").update(fp).digest("hex").slice(0, 12);
}

function toAscii(s: string) { 
  return (s || "")
    .replace(/Ä/g, "AE").replace(/Ö/g, "OE").replace(/Ü/g, "UE")
    .replace(/ä/g, "AE").replace(/ö/g, "OE").replace(/ü/g, "UE")
    .replace(/ß/g, "SS")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 &.,\-\/%]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase(); 
}

function formatDatumDATEV(raw: string) { 
  if (!raw) return new Date().toLocaleDateString("de-DE").replace(/\./g, ""); 
  const m = raw.match(/(\d{2})\.(\d{2})\.(\d{4})/); 
  if (m) return `${m[1]}${m[2]}${m[3]}`; 
  return raw.replace(/\./g, "").slice(0, 8); 
}

function parseBruttoToNumber(s: any): number { 
  if (typeof s === "number") return Number(s.toFixed(2)); 
  if (!s) return 0; 
  let clean = String(s).replace(/€/g, "").trim();
  if (clean.includes(",") && clean.includes(".")) {
    if (clean.lastIndexOf(",") > clean.lastIndexOf(".")) {
      clean = clean.replace(/\./g, "").replace(",", ".");
    } else {
      clean = clean.replace(/,/g, "");
    }
  } else if (clean.includes(",")) {
    clean = clean.replace(/\./g, "").replace(",", ".");
  }
  const val = parseFloat(clean);
  return isNaN(val) ? 0 : Number(val.toFixed(2)); 
}

type Position = { beschreibung: string; brutto: number; mwstSatz: number; konto?: string };
type OpusResult = {
  datum: string;
  lieferant: string;
  belegfeld1: string;
  gegenkonto: string;
  positionen: Position[];
};

const EXTRACTION_PROMPT = `Du bist ein präzises KI-Buchhaltungssystem für deutsche Belege (SKR03 Kontoplan). Analysiere den Beleg intelligent und gib AUSSCHLIESSLICH gültiges JSON zurück, keine Markdown-Zäune, kein Kommentar davor oder danach.

Extrahiere:
- datum: Belegdatum als DD.MM.YYYY
- lieferant: Name des Händlers
- belegfeld1: Bon-Nr / Beleg-Nr / Kassen-ID, maximal 20 Zeichen
- gegenkonto: "1600" wenn bar/Rückgeld auf dem Beleg steht, sonst "1200" (Girocard/EC/Kreditkarte)
- positionen: Erstelle IMMER einen separaten Eintrag für JEDE einzelne Artikelzeile auf dem Beleg. Fasse niemals Artikel zusammen! Jeder Eintrag hat:
  - beschreibung: die exakte Artikelbezeichnung vom Bon
  - brutto: der genaue Bruttopreis dieser Zeile als Zahl mit Dezimalpunkt (z.B. 12.99)
  - mwstSatz: 19, 7 oder 0 – der MwSt-Satz DIESER Zeile
  - konto: Wähle basierend auf dem Artikel das passendste SKR03-Standardkonto aus:
    * 3400: Wareneingang / Baumarkt / Material / Standardprodukte (19%) bzw. 3300 für 7%
    * 4980: Betriebsbedarf (Apotheke, Drogerie, Reinigung, Hygieneartikel, Werkstattbedarf)
    * 4930: Bürobedarf (Papier, Stifte, Druckerpatronen, Ordner)
    * 4650: Bewirtungskosten (Gastronomie, Restaurant, Bewirtung von Geschäftspartnern)
    * 4530: Kraftstoffe / Tankstelle / Kfz-Betriebskosten
    * 4920: Telekommunikation / Internet / Telefon / Portokosten
    * 4855: Geringwertige Wirtschaftsgüter (GWG - Werkzeuge, Geräte, Kleincomputer, Elektronik)
    * 4900: Sonstige betriebliche Aufwendungen (falls keine andere Kategorie passt)

Gib exakt diese JSON-Struktur zurück:
{"datum":"01.12.2025","lieferant":"TECHWORLD ELECTRONICS","belegfeld1":"2025-99812-04","gegenkonto":"1200","positionen":[{"beschreibung":"USB-C Ladekabel 2m","brutto":12.99,"mwstSatz":19,"konto":"4855"}]}`;

async function extractWithOpus5(buffer: Buffer, fileName: string, mime: string): Promise<OpusResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY missing");
  const anthropic = new Anthropic({ apiKey });
  const base64 = buffer.toString("base64");
  const isImage = mime.startsWith("image/") || [".png", ".jpg", ".jpeg", ".webp"].some(e => fileName.toLowerCase().endsWith(e));

  const content: any[] = [{ type: "text", text: EXTRACTION_PROMPT }];
  if (isImage) {
    content.push({ type: "image", source: { type: "base64", media_type: fileName.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg", data: base64 } });
  } else {
    content.push({ type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } });
  }

  const msg = await anthropic.messages.create({ model: "claude-opus-5", max_tokens: 2048, messages: [{ role: "user", content }] });
  const tb: any = msg.content.find((b: any) => b.type === "text");
  if (!tb) throw new Error("Opus 5 gab keine Textantwort");

  let text = tb.text.replace(/```json|```/g, "").trim();
  const start = text.indexOf("{");
  if (start === -1) throw new Error("Opus 5 keine JSON gefunden: " + text.slice(0, 200));
  let open = 0, end = -1;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "{") open++;
    if (text[i] === "}") { open--; if (open === 0) { end = i; break; } }
  }
  if (end === -1) throw new Error("Opus 5 JSON nicht geschlossen");
  const parsed = JSON.parse(text.slice(start, end + 1));

  const positionen: Position[] = Array.isArray(parsed.positionen) && parsed.positionen.length
    ? parsed.positionen.map((p: any) => ({
        beschreibung: String(p.beschreibung || p.text || "Position"),
        brutto: parseBruttoToNumber(p.brutto),
        mwstSatz: [19, 7, 0].includes(Number(p.mwstSatz)) ? Number(p.mwstSatz) : 19,
        konto: String(p.konto || "3400"),
      })).filter((p: Position) => p.brutto > 0)
    : [];

  return {
    datum: parsed.datum || "",
    lieferant: parsed.lieferant || "",
    belegfeld1: parsed.belegfeld1 || "",
    gegenkonto: parsed.gegenkonto === "1600" ? "1600" : "1200",
    positionen,
  };
}

async function parseOneFile(file: File) {
  const fileName = file.name || "unknown";
  const mime = file.type || "";
  const buffer = Buffer.from(await file.arrayBuffer());

  const opusData = await extractWithOpus5(buffer, fileName, mime);
  if (!opusData.positionen.length) {
    return { fileName, ok: false, error: "Keine Position erkannt" };
  }

  const lieferantName = toAscii(opusData.lieferant) || "UNBEKANNT";

  return {
    fileName,
    ok: true,
    belegNr: (opusData.belegfeld1 || fileName).slice(0, 20),
    belegdatum: formatDatumDATEV(opusData.datum),
    lieferant: lieferantName,
    gegenkonto: opusData.gegenkonto,
    positionen: opusData.positionen,
  };
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const device = getDeviceHash(req);
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
  const freeKey = `b2d:free:${ipHash}:${device}`;
  const proKey = `b2d:pro:${ipHash}`;

  // 1. Läs av session_id från antingen HTTP-header eller URL query param
  const sessionId = req.headers.get("x-session-id") || req.nextUrl.searchParams.get("session_id");

  try {
    let isPro = false;

    // 2. Kontrollera om session_id är aktiv i Vercel KV
    if (sessionId) {
      const sessionStatus = await kv.get<string>(`b2d:session:${sessionId}`);
      if (sessionStatus === "active") {
        isPro = true;
      }
    }

    // 3. Reservkontroll: kolla om enhetens ipHash är flaggad som Pro
    if (!isPro) {
      isPro = Boolean(await kv.get(proKey));
    }

    // 4. Gratisbegränsning (om användaren inte är Pro)
    if (!isPro) {
      const used = (await kv.get<number>(freeKey)) || 0;
      if (used >= 3) {
        return NextResponse.json({
          error: "FREE_LIMIT_REACHED",
          usage: { count: 3, limit: 3, remaining: 0, used },
          rows: [],
          totalRows: 0
        }, { status: 402 });
      }
    }

    const form = await req.formData();
    const files = [...(form.getAll("file") as File[]), ...(form.getAll("files") as File[])].filter(Boolean) as File[];
    const allFiles = files.length ? files : (form.get("file") ? [form.get("file") as File] : []);
    if (allFiles.length === 0) return NextResponse.json({ error: "no file", results: [], rows: [], usage: { count: 0, limit: 3, remaining: 3 } }, { status: 400 });

    const maxFiles = isPro ? 20 : 3;
    const results = [];
    for (const f of allFiles.slice(0, maxFiles)) {
      try {
        results.push(await parseOneFile(f));
      } catch (e: any) {
        results.push({ fileName: f.name || "unknown", ok: false, error: e.message });
      }
    }

    const allRows = [];
    for (const r of results) {
      if (r.ok && r.positionen) {
        for (const p of r.positionen) {
          const netto = Number((p.brutto / (1 + p.mwstSatz / 100)).toFixed(2));
          let bu = "9"; 
          let konto = p.konto || "3400";

          if (p.mwstSatz === 7) {
            bu = "8"; 
            if (konto === "3400") konto = "3300";
          } else if (p.mwstSatz === 0) {
            bu = "0";
          }

          const isEquipment = /schrauber|bohrer|säge|hammer|computer|drucker|maschine|gerät|adapter|maus|kabel/i.test(p.beschreibung);
          let suffix = "";
          if (isEquipment && konto === "4855" || (isEquipment && konto === "3400")) {
            if (netto <= 800) {
              konto = "4855"; 
              suffix = " GWG bis 800E EStG 4855";
            } else {
              konto = "0400"; 
              suffix = " ANLAGE AfA";
            }
          }

          allRows.push({
            Belegfeld1: r.belegNr,
            Belegdatum: r.belegdatum,
            Konto: konto,
            Gegenkonto: r.gegenkonto,
            BU: bu,
            Brutto: Number(p.brutto).toFixed(2).replace(".", ","),
            Belegtext: toAscii(`${r.lieferant} - ${p.beschreibung}${suffix}`).slice(0, 60),
            fileName: r.fileName
          });
        }
      }
    }

    let newUsage = { count: 0, limit: 3, remaining: 3 };
    if (!isPro) {
      const newCount = await kv.incrby(freeKey, allFiles.length);
      await kv.expire(freeKey, 60 * 60 * 24 * 365);
      newUsage = { count: newCount as number, limit: 3, remaining: Math.max(0, 3 - (newCount as number)) };
    } else {
      newUsage = { count: 0, limit: 99999, remaining: 99999 };
    }

    return NextResponse.json({
      totalFiles: results.length,
      totalRows: allRows.length,
      results,
      rows: allRows,
      usage: newUsage
    });

  } catch (e: any) {
    console.error("analyze error", e);
    return NextResponse.json({ error: e.message, results: [], rows: [], usage: { count: 0, limit: 3, remaining: 3 } }, { status: 500 });
  }
}
