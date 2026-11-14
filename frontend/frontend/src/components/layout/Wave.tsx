/** Vague décorative (SVG). `fill` = couleur de la section qui suit. */
export function Wave({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden className={`block h-[44px] w-full sm:h-[70px] ${flip ? 'rotate-180' : ''} ${className}`}>
      <path fill="currentColor" d="M0 52c120 28 240 36 360 22 160-18 280-64 480-56 200 8 320 54 600 34V90H0Z" />
    </svg>
  );
}
