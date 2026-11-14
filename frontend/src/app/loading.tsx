import { getT } from '@/lib/i18n';

export default async function Loading() {
  const { t } = await getT();
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-4 py-28 text-navy-500">
      <span aria-hidden className="h-10 w-10 animate-spin rounded-full border-[3px] border-lagoon-200 border-t-lagoon-500" />
      <span className="text-sm font-semibold">{t('common.loading')}</span>
    </div>
  );
}
