import { TriangleAlert } from 'lucide-react';
import { getT } from '@/lib/i18n';

export async function DemoBanner() {
  const { t } = await getT();
  return (
    <div role="note" className="bg-navy-950 px-4 py-2 text-center text-xs font-medium text-navy-100 sm:text-[13px]">
      <TriangleAlert className="mr-1.5 inline h-3.5 w-3.5 align-text-bottom text-sun-400" aria-hidden />
      {t('demo.warning')}
    </div>
  );
}
