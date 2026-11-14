'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { setLocale } from '@/lib/actions/locale';
import { useI18n } from '@/lib/i18n/provider';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n/shared';

export function LanguageSwitcher({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const skin = tone === 'dark' ? 'border-white/25 bg-white/10 text-white' : 'border-navy-200 bg-white text-navy-800 hover:border-navy-300';
  return (
    <label className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${skin}`}>
      <Globe className="h-3.5 w-3.5 opacity-70" aria-hidden />
      <span className="sr-only">{t('lang.label')}</span>
      <select
        value={locale}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.value;
          startTransition(async () => {
            await setLocale(next);
            router.refresh();
          });
        }}
        className="cursor-pointer bg-transparent py-0.5 focus:outline-none [&>option]:text-navy-900"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>{LOCALE_LABELS[l]}</option>
        ))}
      </select>
    </label>
  );
}
