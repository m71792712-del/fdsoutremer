import Link from 'next/link';
import Image from 'next/image';
import { Accessibility, Compass, ShieldCheck, Zap } from 'lucide-react';
import { getT } from '@/lib/i18n';
import { Logo } from './Logo';
import { Wave } from './Wave';

export async function Footer() {
  const { t } = await getT();
  const items = [
    { icon: Zap, label: t('footer.fast') },
    { icon: ShieldCheck, label: t('footer.secure') },
    { icon: Accessibility, label: t('footer.accessible') },
    { icon: Compass, label: t('footer.support') },
  ];
  return (
    <footer className="mt-20 text-navy-100">
      <Wave className="-mb-px text-navy-950" />
      <div className="bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Logo light size={52} />
              <p className="mt-5 flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {t('brand.slogan')}
                <Image src="/images/logo-icon.png" alt="" width={34} height={34} className="rounded-full opacity-90" />
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3">
              {items.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-lagoon-500/20 text-lagoon-300"><Icon className="h-4 w-4" aria-hidden /></span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 space-y-2 border-t border-white/10 pt-6 text-xs leading-relaxed text-navy-200">
            <p>{t('footer.banksNote')}</p>
            <p>{t('footer.legal')}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span>{t('footer.rights', { year: new Date().getFullYear() })}</span>
              <Link href="/legal" className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{t('footer.legalLink')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
