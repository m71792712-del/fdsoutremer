import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({ title, text, children }: { title: string; text?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-navy-200 bg-white/60 px-6 py-14 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-lagoon-100 text-lagoon-700"><Inbox className="h-7 w-7" aria-hidden /></span>
      <h2 className="text-xl">{title}</h2>
      {text && <p className="max-w-md text-sm text-navy-500">{text}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}
