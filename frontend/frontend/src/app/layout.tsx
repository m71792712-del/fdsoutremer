import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { DemoBanner } from '@/components/layout/DemoBanner';
import { APP_NAME } from '@/lib/config';
import { getT } from '@/lib/i18n';
import { I18nProvider } from '@/lib/i18n/provider';
import '@fontsource-variable/figtree';
import '@fontsource-variable/bricolage-grotesque';
import './globals.css';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: 'Plateforme universitaire de démonstration de demande de prêt (données fictives uniquement).',
};
export const viewport: Viewport = { themeColor: '#072438', width: 'device-width', initialScale: 1 };

// Rendu dynamique volontaire : langue lue dans les cookies / en-têtes et CSP avec nonce par requête.
export default async function RootLayout({ children }: { children: ReactNode }) {
  const { locale, t } = await getT();
  return (
    <html lang={locale}>
      <body className="flex min-h-screen flex-col">
        <I18nProvider locale={locale}>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-900 focus:shadow-lift">
            {t('nav.skip')}
          </a>
          <DemoBanner />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
