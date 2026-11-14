import Image from 'next/image';
import Link from 'next/link';
import { Accessibility, ArrowRight, Check, Compass, FileText, Plus, Search, ShieldCheck, UserPlus, Zap, Eye } from 'lucide-react';
import { Wave } from '@/components/layout/Wave';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { getT } from '@/lib/i18n';

export default async function HomePage() {
  const { t } = await getT();
  // Le slogan est coupé à la virgule : « Votre projet, » / « notre priorité. » (même logique en anglais)
  const [sloganA, ...sloganRest] = t('brand.slogan').replace(/\s*[!.]\s*$/, '').split(/,\s*/);
  const sloganB = sloganRest.join(', ');
  const benefits = [
    { icon: Zap, key: 'fast' },
    { icon: ShieldCheck, key: 'secure' },
    { icon: Accessibility, key: 'accessible' },
    { icon: Compass, key: 'support' },
  ];
  const steps = [
    { icon: UserPlus, n: 1 },
    { icon: FileText, n: 2 },
    { icon: Search, n: 3 },
    { icon: Eye, n: 4 },
  ];
  return (
    <>
      {/* Hero : titre = le slogan de la marque ; la photo en arche et la carte « dossier » racontent le produit */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden className="absolute -left-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-lagoon-500/20 blur-[120px]" />
        <div aria-hidden className="absolute -right-32 bottom-0 -z-10 h-[460px] w-[460px] rounded-full bg-ocean-500/25 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:pb-16 lg:pt-20">
          <div>
            <h1 className="font-display text-[2.9rem] font-bold leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.6rem]">
              <span className="sr-only">{t('brand.name')} — </span>
              <span className="enter block" style={{ ['--d' as string]: '80ms' }}>{sloganA}{sloganB ? ',' : '.'}</span>
              <span className="enter block text-lagoon-300" style={{ ['--d' as string]: '220ms' }}>{sloganB ? `${sloganB}.` : ''}</span>
            </h1>
            <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-navy-100" style={{ ['--d' as string]: '380ms' }}>{t('home.subtitle')}</p>
            <div className="enter mt-9 flex flex-wrap items-center gap-3" style={{ ['--d' as string]: '520ms' }}>
              <Link href="/apply" className="btn btn-sun px-7 py-4 text-base">
                {t('home.cta')} <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <a href="#how" className="btn btn-ghost-light px-6 py-4 text-base">{t('how.title')}</a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full animate-reveal overflow-hidden rounded-b-[28px] rounded-t-full shadow-lift ring-1 ring-white/15">
              <Image src="/images/panel.webp" alt="" fill priority sizes="(min-width:1024px) 40vw, 90vw" quality={80} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" aria-hidden />
            </div>
            <span className="enter absolute left-2 top-10 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-navy-900 shadow-lift sm:-left-4" style={{ ['--d' as string]: '700ms' }}>
              <span className="h-2 w-2 rounded-full bg-sun-400" aria-hidden /> {t('home.badge')}
            </span>
            <div aria-hidden className="enter absolute -bottom-4 left-0 w-[250px] sm:-left-8 sm:w-[290px]" style={{ ['--d' as string]: '900ms' }}>
              <div className="animate-float rounded-3xl bg-white p-4 text-navy-900 shadow-lift">
                <div className="flex items-center gap-4">
                  <ProgressRing value={81} size={74} compact />
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-semibold leading-tight">{t('how.3.title')}</p>
                    <p className="mt-0.5 text-xs text-navy-500">{t('how.3.text')}</p>
                  </div>
                </div>
                <ul className="mt-3.5 space-y-1.5 border-t border-navy-100 pt-3 text-xs font-semibold">
                  <li className="flex items-center gap-2 text-lagoon-700"><span className="grid h-4 w-4 place-items-center rounded-full bg-lagoon-500 text-white"><Check className="h-2.5 w-2.5" /></span>{t('how.1.title')}</li>
                  <li className="flex items-center gap-2 text-lagoon-700"><span className="grid h-4 w-4 place-items-center rounded-full bg-lagoon-500 text-white"><Check className="h-2.5 w-2.5" /></span>{t('how.2.title')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Wave className="text-foam" />
      </section>

      <section id="benefits" aria-label={t('benefits.title')} className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-6 sm:px-6">
        <ul className="grid divide-navy-100 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
          {benefits.map(({ icon: Icon, key }) => (
            <li key={key} className="flex items-start gap-4 px-0 py-5 sm:px-7 sm:first:pl-0">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lagoon-100 text-lagoon-700"><Icon className="h-5 w-5" aria-hidden /></span>
              <div>
                <p className="font-display text-lg font-semibold text-navy-900">{t(`benefit.${key}.title`)}</p>
                <p className="text-sm text-navy-500">{t(`benefit.${key}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="about" className="mx-auto mt-24 grid max-w-7xl scroll-mt-24 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift lg:order-last">
          <Image src="/images/bay.webp" alt="" fill sizes="(min-width:1024px) 45vw, 92vw" quality={75} className="object-cover" />
        </div>
        <div>
          <h2 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{t('about.title')}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-600">{t('about.text')}</p>
          <Link href="/apply" className="btn btn-primary mt-8">{t('home.cta')} <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
      </section>

      <section id="how" className="mx-auto mt-28 max-w-7xl scroll-mt-24 px-4 sm:px-6">
        <h2 className="max-w-2xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">{t('how.title')}</h2>
        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-lagoon-300 via-ocean-400 to-lagoon-300 lg:block" />
          {steps.map(({ icon: Icon, n }) => (
            <li key={n} className="relative rounded-3xl border border-navy-100 bg-white p-6 shadow-soft">
              <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-navy-900 font-display text-xl font-bold text-white ring-8 ring-foam">{n}</span>
              <Icon className="mt-6 h-6 w-6 text-lagoon-600" aria-hidden />
              <h3 className="mt-3 text-xl">{t(`how.${n}.title`)}</h3>
              <p className="mt-1 text-sm text-navy-500">{t(`how.${n}.text`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-900 via-navy-800 to-lagoon-700 p-8 text-white shadow-lift sm:p-12">
          <div aria-hidden className="absolute -right-16 -top-16 -z-10 h-72 w-72 rounded-full bg-sun-400/30 blur-3xl" />
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <Image src="/images/logo-icon.png" alt="" width={72} height={72} className="rounded-full ring-4 ring-white/30" />
              <p className="max-w-md font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{t('band.text')}</p>
            </div>
            <Link href="/apply" className="btn btn-sun px-7 py-4 text-base">{t('home.cta')} <ArrowRight className="h-5 w-5" aria-hidden /></Link>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto mt-28 grid max-w-7xl scroll-mt-24 gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl lg:sticky lg:top-28 lg:self-start">{t('faq.title')}</h2>
        <div className="divide-y divide-navy-100 rounded-3xl border border-navy-100 bg-white px-6 shadow-soft sm:px-8">
          {[1, 2, 3, 4].map((n) => (
            <details key={n} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold text-navy-900 marker:hidden">
                {t(`faq.${n}.q`)}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700 transition group-open:rotate-45 group-open:bg-lagoon-500 group-open:text-white"><Plus className="h-4 w-4" aria-hidden /></span>
              </summary>
              <p className="mt-3 max-w-2xl pr-10 text-navy-600">{t(`faq.${n}.a`)}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
