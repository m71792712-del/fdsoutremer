'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { TriangleAlert } from 'lucide-react';
import { useI18n } from '@/lib/i18n/provider';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useI18n();
  useEffect(() => {
    console.error('[error-boundary]', error.message, error.digest);
  }, [error]);
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sun-300/40 text-[#7a5600]"><TriangleAlert className="h-8 w-8" aria-hidden /></span>
      <h1 className="mt-5 text-3xl">{t('error.title')}</h1>
      <p className="mt-2 text-navy-500">{t('err.generic')}</p>
      {/* Détails techniques pour le diagnostic (le digest se retrouve dans les logs Vercel). */}
      <details className="mx-auto mt-5 max-w-md text-left text-xs text-navy-500">
        <summary className="cursor-pointer text-center">Détails techniques</summary>
        <p className="mt-2 break-words font-mono">{error.message}</p>
        {error.digest && <p className="mt-1 font-mono">digest : {error.digest}</p>}
      </details>
      <div className="mt-8 flex justify-center gap-3">
        <button onClick={reset} className="btn btn-primary">{t('error.retry')}</button>
        <Link href="/" className="btn btn-outline">{t('error.home')}</Link>
      </div>
    </div>
  );
}
