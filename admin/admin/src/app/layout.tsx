import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/figtree';
import '@fontsource-variable/bricolage-grotesque';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Administration · Fonds de soutien outre-mer', template: '%s · Administration' },
  description: 'Interface d’administration (projet universitaire, données fictives uniquement).',
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { themeColor: '#072438', width: 'device-width', initialScale: 1 };

// Rendu dynamique volontaire : CSP avec nonce par requête et pages lisant la session.
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
        <div className="bg-navy-950 px-4 py-2 text-center text-xs font-medium text-navy-100">
          Projet universitaire — données fictives uniquement. Aucune décision de financement réelle.
        </div>
        {children}
      </body>
    </html>
  );
}
