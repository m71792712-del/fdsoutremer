import { CircleAlert, CircleCheck } from 'lucide-react';
import type { ActionState } from '@/lib/actions/types';

export function FormMessage({ state }: { state: ActionState }) {
  if (!state?.message) return null;
  return (
    <div
      role={state.ok ? 'status' : 'alert'}
      className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-sm font-medium ${state.ok ? 'border-lagoon-200 bg-lagoon-50 text-lagoon-700' : 'border-hibiscus-500/30 bg-hibiscus-500/10 text-hibiscus-600'}`}
    >
      {state.ok ? <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> : <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
      <span>{state.message}</span>
    </div>
  );
}
