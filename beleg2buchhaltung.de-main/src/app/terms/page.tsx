import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AGB | Beleg2Buchhaltung',
  description: 'Allgemeine Geschäftsbedingungen für die Nutzung von beleg2buchhaltung.de',
};

export default function AGBPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-gray-800 leading-relaxed">
      <div className="mb-8">
        <Link href="/" className="text-sm font-semibold text-zinc-600 hover:text-black inline-flex items-center gap-1">
          ← Zurück zur Startseite
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-10">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">§ 1 Geltungsbereich und Vertragsgegenstand</h2>
          <p className="mb-2">(1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über die Nutzung der Software-as-a-Service-Lösung &quot;beleg2buchhaltung.de&quot;, die zwischen <strong>Igor Kazazic</strong>, <strong>Segeparksgatan 18, 212 50 Malmö, Sverige</strong>, <strong>igorkazazic1989@gmail.com</strong> (im Folgenden &quot;Anbieter&quot;) und dem Kunden geschlossen werden.</p>
          <p className="mb-2">(2) Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB, juristische Personen des öffentlichen Rechts oder öffentlich-rechtliche Sondervermögen. Verbraucher im Sinne des § 13 BGB sind von der Nutzung ausgeschlossen. Ein gesetzliches Widerrufsrecht besteht daher nicht.</p>
          <p className="mb-2">(3) Gegenstand des Vertrages ist die Bereitstellung der Software zur Konvertierung von Belegen in DATEV-kompatible CSV-Dateien (EXTF 700) über das Internet.</p>
          <p className="mb-2">(4) <strong>Nutzungsumfang und Fair-Use-Policy:</strong> Das Pro-Abonnement ist für den regulären betrieblichen Eigenbedarf eines Unternehmens oder Freiberuflers bestimmt. Zur Gewährleistung der Serverstabilität und zum Schutz vor automatisierter Überlastung oder Missbrauch gilt eine Fair-Use-Grenze von <strong>maximal 500 verarbeiteten Belegen pro Kalendermonat</strong>. Die Weitergabe des Zugangs an unberechtigte Dritte oder die gemeinschaftliche Nutzung durch mehrere eigenständige Kanzleien/Unternehmen über ein einzelnes Abonnement ist untersagt. Bei Erreichen dieses Kontingents wird die Belegverarbeitung bis zum Beginn des folgenden Abrechnungsmonats pausiert, sofern keine individuelle Erweiterung vereinbart wurde.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">§ 2 Vertragsschluss</h2>
          <p className="mb-2">(1) Die Präsentation der Dienstleistung auf der Website stellt kein rechtlich bindendes Angebot dar.</p>
          <p>(2) Durch den Abschluss des Bezahlvorgangs über unseren Zahlungsdienstleister (Stripe) gibt der Kunde ein verbindliches Angebot zum Abschluss eines kostenpflichtigen Abonnementvertrages ab. Der Vertrag kommt mit der Freischaltung des Zugangs durch den Anbieter zustande.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">§ 3 Preise und Zahlungsbedingungen</h2>
          <p className="mb-2">(1) Die Nutzung der Software im Rahmen des monatlichen Abonnements kostet 19,00 EUR pro Monat (nach Aufbrauch der kostenlosen Testversion).</p>
          <p className="mb-2">(2) Alle angegebenen Preise verstehen sich, sofern nicht anders angegeben, als Netto-Preise zuzüglich der jeweils gültigen gesetzlichen Umsatzsteuer (Reverse-Charge-Verfahren bei grenzüberschreitenden B2B-Leistungen innerhalb der EU, sofern eine gültige USt-IdNr. vorliegt).</p>
          <p className="mb-2">(3) Die Zahlung erfolgt wiederkehrend im Voraus über den Zahlungsdienstleister Stripe. Schlägt eine Zahlung fehl, ist der Anbieter berechtigt, den Zugang zur Software sofort bis zur erfolgreichen Zahlung zu sperren.</p>
          <p>(4) <strong>Eine Rückerstattung bereits gezahlter Gebühren (für den laufenden oder vergangene Abrechnungszeiträume) ist grundsätzlich ausgeschlossen.</strong></p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">§ 4 Vertragslaufzeit und Kündigung</h2>
          <p className="mb-2">(1) Der Abonnementvertrag wird auf unbestimmte Zeit geschlossen und hat eine anfängliche Mindestlaufzeit von einem Monat.</p>
          <p className="mb-2">(2) Der Vertrag kann von beiden Parteien jederzeit zum Ende des jeweils aktuell bezahlten Abrechnungszeitraums gekündigt werden.</p>
          <p className="mb-2">
            (3) <strong>Kündigungsverfahren:</strong> Die Kündigung kann jederzeit mit einem Klick über das offizielle{' '}
            <a 
              href="https://billing.stripe.com/p/login/fZu7sN0QD9d64p6ckq7IY00" 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 underline font-semibold"
            >
              Stripe Kundenportal
            </a>{' '}
            vorgenommen werden (alternativ über den Link in jeder Rechnungs-E-Mail von Stripe oder per formloser Mitteilung an igorkazazic1989@gmail.com). Nach Wirksamwerden der Kündigung wird der Zugang des Kunden zur kostenpflichtigen Funktion zum Ende der bezahlten Periode automatisch beendet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">§ 5 Haftungsbeschränkung</h2>
          <p className="mb-2">(1) Der Anbieter stellt lediglich das technische Werkzeug zur Datenkonvertierung zur Verfügung. Eine steuerliche oder rechtliche Beratung findet ausdrücklich nicht statt.</p>
          <p className="mb-2">(2) Der Kunde ist allein dafür verantwortlich, die konvertierten Daten vor der Übergabe an das Finanzamt, den Steuerberater oder DATEV auf Richtigkeit und Vollständigkeit zu prüfen.</p>
          <p>(3) Der Anbieter haftet unbeschränkt nur für Vorsatz und grobe Fahrlässigkeit. Für einfache Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten, beschränkt auf den vertragstypischen, vorhersehbaren Schaden.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">§ 6 Schlussbestimmungen</h2>
          <p className="mb-2">(1) Es gilt das Recht Schwedens unter Ausschluss des UN-Kaufrechts.</p>
          <p>(2) Gerichtsstand für alle Streitigkeiten aus diesem Vertrag ist der Sitz des Anbieters.</p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t">
        <Link href="/" className="text-sm font-semibold text-zinc-600 hover:text-black">
          ← Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
