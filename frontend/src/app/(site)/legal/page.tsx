import type { Metadata } from 'next';
import { getT } from '@/lib/i18n';

export const metadata: Metadata = { title: 'Mentions légales' };

export default async function LegalPage() {
  const { t } = await getT();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl tracking-[-0.03em] sm:text-5xl">{t('legal.title')}</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy-700">
        {[1, 2, 3, 4, 5].map((n) => (
          <p key={n}>{t(`legal.p${n}`)}</p>
        ))}
      </div>
    </div>
  );
}
