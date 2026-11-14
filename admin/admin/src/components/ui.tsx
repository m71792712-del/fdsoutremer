'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { STATUS_LABELS, type ActionState } from '@/lib/types';

export function SubmitButton({ children, className = 'btn btn-primary', pendingText = 'Patientez…' }: { children: React.ReactNode; className?: string; pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function FormMessage({ state }: { state: ActionState }) {
  if (!state) return null;
  if (state.error) return <p role="alert" className="rounded-xl border border-hibiscus-500/30 bg-hibiscus-500/10 px-3.5 py-2.5 text-sm font-medium text-hibiscus-600">{state.error}</p>;
  if (state.ok) return <p role="status" className="rounded-xl border border-lagoon-200 bg-lagoon-50 px-3.5 py-2.5 text-sm font-medium text-lagoon-700">{state.ok}</p>;
  return null;
}

const STATUS_STYLES: Record<string, { box: string; dot: string }> = {
  pending: { box: 'bg-sun-300/30 text-[#7a5600]', dot: 'bg-sun-500' },
  under_review: { box: 'bg-ocean-500/10 text-ocean-600', dot: 'bg-ocean-500' },
  approved: { box: 'bg-lagoon-100 text-lagoon-700', dot: 'bg-lagoon-500' },
  rejected: { box: 'bg-hibiscus-500/10 text-hibiscus-600', dot: 'bg-hibiscus-500' },
  merged: { box: 'bg-violet-100 text-violet-800', dot: 'bg-violet-500' },
};
const EXTRA_LABELS: Record<string, string> = { merged: 'Fusionnée' };

export function StatusBadge({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? EXTRA_LABELS[status] ?? status;
  const st = STATUS_STYLES[status] ?? { box: 'bg-navy-50 text-navy-600', dot: 'bg-navy-300' };
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${st.box}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} aria-hidden />
      {label}
    </span>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-3xl tracking-[-0.03em] sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1.5 text-navy-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <p className="rounded-3xl border-2 border-dashed border-navy-200 bg-white/60 px-6 py-14 text-center text-sm font-medium text-navy-500">{text}</p>;
}

export function Pagination({ page, total, pageSize, basePath, params }: { page: number; total: number; pageSize: number; basePath: string; params: Record<string, string | undefined> }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  const href = (p: number) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
    if (p > 1) sp.set('page', String(p));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };
  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between text-sm">
      {page > 1 ? <Link className="btn btn-outline btn-sm" href={href(page - 1)}>← Précédent</Link> : <span />}
      <span className="text-navy-600">Page {page} / {pages} · {total} résultat{total > 1 ? 's' : ''}</span>
      {page < pages ? <Link className="btn btn-outline btn-sm" href={href(page + 1)}>Suivant →</Link> : <span />}
    </nav>
  );
}
