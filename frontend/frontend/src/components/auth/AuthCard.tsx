import type { ReactNode } from 'react';

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-3xl tracking-[-0.03em] sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-navy-500">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}
