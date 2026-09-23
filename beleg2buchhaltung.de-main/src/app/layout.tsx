import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beleg2buchhaltung.de"),
  title: {
    default: "Beleg2Buchhaltung | OBI, BAUHAUS, Hornbach Beleg in 5 Sekunden zu DATEV-CSV",
    template: "%s | Beleg2Buchhaltung",
  },
  description:
    "Schluss mit Abtippen. Unsere KI liest Datum, Brutto, 19% USt, Lieferant - fertig für DATEV Unternehmen Online & Belegtransfer. SKR03/04 Konto 3400 automatisch, BU 9. 5000+ Belege trainiert, GoBD-konform.",
  keywords: [
    "OBI Rechnung DATEV",
    "BAUHAUS Beleg DATEV",
    "Hornbach Rechnung DATEV",
    "Toom Beleg DATEV",
    "Baumarkt Beleg DATEV CSV",
    "SKR03 3400",
    "DATEV Belegtransfer",
    "DATEV Unternehmen Online",
  ],
  authors: [{ name: "Beleg2Buchhaltung" }],
  creator: "Beleg2Buchhaltung",
  // 1. CANONICAL URL (Skyddar mot duplicerat innehåll)
  alternates: {
    canonical: "https://beleg2buchhaltung.de",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://beleg2buchhaltung.de",
    title: "Beleg2Buchhaltung - Baumarkt Beleg zu DATEV in 5 Sekunden",
    description:
      "KI für OBI, BAUHAUS, Hornbach, Toom, Globus - direkt zu DATEV-CSV mit 3400 & BU 9. 5000+ Belege trainiert.",
    siteName: "Beleg2Buchhaltung",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 2. SCHEMA.ORG STRUKTURERAD DATA (Hjälper Google förstå att det är en mjukvara/SaaS)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Beleg2Buchhaltung",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://beleg2buchhaltung.de",
  description:
    "KI-gestützte Konvertierung von Baumarkt-Belegen (OBI, Bauhaus, Hornbach) in DATEV-konforme CSV-Buchungsstapel.",
  offers: {
    "@type": "Offer",
    price: "19.00",
    priceCurrency: "EUR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
