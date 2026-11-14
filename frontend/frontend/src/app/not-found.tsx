import Link from 'next/link';
import { getT } from '@/lib/i18n';

export default async function NotFound() {
  const { t } = await getT();
  return (
    <main id="main" className="relative isolate mx-auto max-w-xl overflow-hidden px-4 py-24 text-center">
      <div aria-hidden className="absolute left-1/2 top-10 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-lagoon-300/40 blur-3xl" />
      <p className="font-display text-[8rem] font-extrabold leading-none tracking-tighter text-navy-900">4<span className="text-lagoon-500">0</span>4</p>
      <h1 className="mt-4 text-3xl">{t('error.notFound.title')}</h1>
      <p className="mt-2 text-navy-500">{t('error.notFound.text')}</p>
      <Link href="/" className="btn btn-primary mt-8 px-7">{t('error.home')}</Link>
    </main>
  );
}
