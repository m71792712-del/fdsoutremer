import type { Metadata } from 'next';
import { DeleteAccountForm, ProfileForm } from '@/components/profile/ProfileForms';
import { getProfile, requireUser } from '@/lib/auth';
import { getT } from '@/lib/i18n';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = { title: 'Mon profil' };

export default async function ProfilePage() {
  const { t, locale } = await getT();
  await requireUser();
  const profile = await getProfile();
  if (!profile) return null;
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl tracking-[-0.03em] sm:text-4xl">{t('profile.title')}</h1>
        <p className="mt-1.5 text-navy-500">{t('profile.subtitle')}</p>
      </div>
      <section className="card space-y-6">
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-navy-500">{t('profile.role')}</dt><dd className="font-semibold text-navy-900">{t('shell.role')}</dd></div>
          <div><dt className="text-navy-500">{t('profile.member')}</dt><dd className="font-semibold text-navy-900">{formatDate(profile.created_at, locale)}</dd></div>
        </dl>
        <ProfileForm profile={profile} />
      </section>
      <section className="card border-hibiscus-500/30">
        <h2 className="mb-4 text-xl text-hibiscus-600">{t('profile.delete.title')}</h2>
        <DeleteAccountForm />
      </section>
    </div>
  );
}
