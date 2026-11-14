'use client';

import { useI18n } from '@/lib/i18n/provider';

const STYLES: Record<string, { box: string; dot: string }> = {
  pending: { box: 'bg-sun-300/30 text-[#7a5600]', dot: 'bg-sun-500' },
  under_review: { box: 'bg-ocean-500/10 text-ocean-600', dot: 'bg-ocean-500' },
  approved: { box: 'bg-lagoon-100 text-lagoon-700', dot: 'bg-lagoon-500' },
  rejected: { box: 'bg-hibiscus-500/10 text-hibiscus-600', dot: 'bg-hibiscus-500' },
};

export function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  const s = STYLES[status] ?? { box: 'bg-navy-50 text-navy-600', dot: 'bg-navy-300' };
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${s.box}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      {t(`status.${status}`)}
    </span>
  );
}
