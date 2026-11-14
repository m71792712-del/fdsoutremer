import type { ReactNode } from 'react';
import { LogOut } from 'lucide-react';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Logo } from '@/components/layout/Logo';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { logout } from '@/lib/actions/auth';
import { getProfile, requireUser } from '@/lib/auth';
import { getT } from '@/lib/i18n';
import { initials } from '@/lib/utils';

// Espace connecté : l'utilisateur est revérifié ici ET dans chaque page (le middleware n'est qu'une première barrière).
export default async function AppLayout({ children }: { children: ReactNode }) {
  const { t } = await getT();
  const user = await requireUser();
  const profile = await getProfile();
  const fullName = profile ? `${profile.first_name} ${profile.last_name}`.trim() : (user.email ?? '');
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="relative isolate overflow-hidden bg-navy-950 p-3 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-72 lg:shrink-0 lg:flex-col lg:p-6">
        <div aria-hidden className="absolute -left-20 -top-20 -z-10 h-64 w-64 rounded-full bg-lagoon-500/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -right-24 -z-10 h-64 w-64 rounded-full bg-ocean-500/25 blur-3xl" />
        <div className="mb-3 lg:mb-10"><Logo light size={44} href="/dashboard" /></div>
        <SidebarNav />
        <div className="mt-3 lg:mt-auto">
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 lg:flex">
            <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun-400 text-sm font-bold text-navy-950">
              {profile ? initials(profile.first_name, profile.last_name) : '?'}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold">{fullName}</p>
              <p className="text-xs text-navy-200">{t('shell.role')}</p>
            </div>
          </div>
          <form action={logout} className="lg:mt-3">
            <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-navy-100 transition hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4" aria-hidden /> {t('shell.logout')}
            </button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-navy-100/80 bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-8">
          <p className="font-display text-lg font-semibold text-navy-900">{t('shell.title')}</p>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-sun-400 text-xs font-bold text-navy-950 lg:hidden">
              {profile ? initials(profile.first_name, profile.last_name) : '?'}
            </span>
          </div>
        </header>
        <main id="main" className="px-4 py-8 sm:px-8 sm:py-10">{children}</main>
      </div>
    </div>
  );
}
