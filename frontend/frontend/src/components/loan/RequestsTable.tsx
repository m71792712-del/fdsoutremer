import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { LoanWithPurpose } from '@/lib/data';
import { purposeLabel, type Locale, type TFunction } from '@/lib/i18n/shared';
import { formatDate, formatMoney } from '@/lib/utils';

export function RequestsTable({ loans, t, locale }: { loans: LoanWithPurpose[]; t: TFunction; locale: Locale }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-navy-100 bg-white shadow-soft">
      <table className="min-w-full">
        <caption className="sr-only">{t('req.title')}</caption>
        <thead className="border-b border-navy-100 bg-navy-50/60">
          <tr>
            <th className="th" scope="col">{t('req.date')}</th>
            <th className="th" scope="col">{t('req.amount')}</th>
            <th className="th" scope="col">{t('req.purpose')}</th>
            <th className="th" scope="col">{t('req.status')}</th>
            <th className="th" scope="col"><span className="sr-only">{t('req.actions')}</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {loans.map((l) => (
            <tr key={l.id} className="group transition hover:bg-lagoon-50/50">
              <td className="td whitespace-nowrap text-navy-500">{formatDate(l.created_at, locale)}</td>
              <td className="td whitespace-nowrap font-display text-base font-semibold text-navy-900">{formatMoney(Number(l.amount), l.currency, locale)}</td>
              <td className="td">{l.loan_purposes ? purposeLabel(l.loan_purposes, locale) : l.purpose_code}</td>
              <td className="td"><StatusBadge status={l.status} /></td>
              <td className="td text-right">
                <Link href={`/dashboard/requests/${l.id}`} className="inline-flex rounded-full p-2 text-navy-400 transition group-hover:bg-lagoon-500 group-hover:text-white" aria-label={`${t('common.view')} — ${formatDate(l.created_at, locale)}`}>
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
