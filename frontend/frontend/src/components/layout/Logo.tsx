import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/config';

export function Logo({ light = false, size = 40, href = '/' }: { light?: boolean; size?: number; href?: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3 rounded-xl">
      <Image src="/images/logo-icon.png" alt="" width={size} height={size} className="rounded-full ring-2 ring-white/80 transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105" />
      <span className={`max-w-[11.5rem] font-display text-[15px] font-bold leading-[1.15] tracking-tight sm:text-base ${light ? 'text-white' : 'text-navy-900'}`}>{APP_NAME}</span>
    </Link>
  );
}
