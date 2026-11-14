import Image from 'next/image';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { getT } from '@/lib/i18n';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const { t } = await getT();
  return (
    <>
      <PublicNavbar />
      <main id="main" className="relative flex-1 px-4 py-8 sm:px-6 lg:py-14">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-lift ring-1 ring-navy-100 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="relative hidden min-h-[560px] lg:block" aria-hidden>
            <Image src="/images/panel.webp" alt="" fill sizes="440px" quality={70} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/15 to-navy-950/10" />
            <div className="absolute inset-x-8 bottom-8">
              <Image src="/images/logo-icon.png" alt="" width={52} height={52} className="mb-4 rounded-full ring-2 ring-white/70" />
              <p className="font-display text-3xl font-bold leading-tight tracking-tight text-white">{t('brand.slogan')}</p>
              <p className="mt-2 text-sm text-navy-100">{t('band.text')}</p>
            </div>
          </aside>
          <div className="px-6 py-8 sm:px-10 sm:py-12">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
