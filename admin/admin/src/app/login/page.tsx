import Image from 'next/image';
import { redirect } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
import { LoginForm } from '@/components/Forms';
import { getAdminProfile } from '@/lib/auth';
import { one } from '@/lib/utils';

export const metadata = { title: 'Connexion' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (await getAdminProfile()) redirect('/');
  const sp = await searchParams;
  return (
    <main id="main" className="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden bg-navy-950 px-4 py-12">
      <div aria-hidden className="absolute -left-32 top-0 -z-10 h-[460px] w-[460px] rounded-full bg-lagoon-500/25 blur-[110px]" />
      <div aria-hidden className="absolute -right-24 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-ocean-500/30 blur-[110px]" />
      <div className="w-full max-w-md">
        <div className="mb-7 flex flex-col items-center text-center">
          <Image src="/images/logo-icon.png" alt="" width={68} height={68} className="rounded-full ring-4 ring-white/20" priority />
          <h1 className="mt-4 text-4xl tracking-[-0.03em] text-white">Administration</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-navy-100"><ShieldCheck className="h-4 w-4 text-lagoon-300" aria-hidden /> Accès réservé à l’administrateur</p>
        </div>
        <div className="card shadow-lift">
          <LoginForm denied={one(sp.erreur) === 'acces'} />
        </div>
      </div>
    </main>
  );
}
