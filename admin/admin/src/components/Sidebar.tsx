'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Building2, ClipboardList, LayoutDashboard, LogOut, ScrollText, Settings, ShieldCheck, Users, Lightbulb } from 'lucide-react';
import { logoutAction } from '@/lib/actions';

const LINKS = [
  { href: '/', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/requests', label: 'Demandes de prêt', icon: ClipboardList },
  { href: '/suggestions', label: 'Suggestions de banques', icon: Lightbulb },
  { href: '/banks', label: 'Banques', icon: Building2 },
  { href: '/users', label: 'Utilisateurs', icon: Users },
  { href: '/audit', label: 'Journal d’audit', icon: ScrollText },
  { href: '/settings', label: 'Réglages', icon: Settings },
];

export function Sidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));
  return (
    <aside className="relative isolate flex w-full shrink-0 flex-col overflow-hidden bg-navy-950 text-white md:sticky md:top-0 md:h-screen md:w-72">
      <div aria-hidden className="absolute -left-16 -top-16 -z-10 h-56 w-56 rounded-full bg-lagoon-500/25 blur-3xl" />
      <div className="flex items-center gap-3 px-5 py-5 md:px-6 md:py-7">
        <Image src="/images/logo-icon.png" alt="" width={40} height={40} className="rounded-full ring-2 ring-white/70" />
        <div className="leading-tight">
          <p className="font-display text-[15px] font-bold">Fonds de soutien outre-mer</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-sun-400"><ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Administration</p>
        </div>
      </div>
      <nav aria-label="Navigation admin" className="flex gap-1.5 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:overflow-y-auto md:overflow-x-visible md:px-4">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`group flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition ${active ? 'bg-white text-navy-900 shadow-lift' : 'text-navy-100 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon className={`h-[18px] w-[18px] ${active ? 'text-lagoon-600' : 'text-navy-300 group-hover:text-lagoon-300'}`} aria-hidden /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 px-5 py-4 md:px-6">
        <p className="mb-2 truncate text-xs text-navy-200">{adminName}</p>
        <form action={logoutAction}>
          <button type="submit" className="flex items-center gap-2 rounded-lg text-sm font-semibold text-navy-100 transition hover:text-white">
            <LogOut className="h-4 w-4" aria-hidden /> Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  );
}
