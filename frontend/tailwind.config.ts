import type { Config } from 'tailwindcss';

// Système de design « Fonds de soutien outre-mer » : lagon, nuit océane, soleil et hibiscus (couleurs du logo et de la photo).
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 50: '#f0f6f9', 100: '#dbe9f0', 200: '#b6d0de', 300: '#86afc4', 400: '#5489a6', 500: '#336d8d', 600: '#1f5779', 700: '#134562', 800: '#0b3249', 900: '#072438', 950: '#04182a' },
        lagoon: { 50: '#ebfaf6', 100: '#c9f1e6', 200: '#97e2cd', 300: '#60cfb2', 400: '#2fb99a', 500: '#17a183', 600: '#0e8369', 700: '#0c6a56' },
        ocean: { 400: '#4aa3e0', 500: '#1f86d3', 600: '#166fb3' },
        sun: { 300: '#ffd978', 400: '#fbc531', 500: '#f2a900' },
        hibiscus: { 500: '#e5484d', 600: '#cc343b' },
        foam: '#f2f8f9',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(7, 36, 56, 0.05), 0 14px 34px -14px rgba(7, 36, 56, 0.16)',
        lift: '0 2px 4px rgba(7, 36, 56, 0.06), 0 24px 48px -16px rgba(7, 36, 56, 0.28)',
        ring: '0 0 0 4px rgba(23, 161, 131, 0.18)',
      },
      fontFamily: {
        sans: ['"Figtree Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['"Bricolage Grotesque Variable"', '"Figtree Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        reveal: { from: { clipPath: 'inset(100% 0 0 0 round 999px 999px 28px 28px)' }, to: { clipPath: 'inset(0 0 0 0 round 999px 999px 28px 28px)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        sheen: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
      },
      animation: {
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        reveal: 'reveal 1.1s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 6s ease-in-out infinite',
        sheen: 'sheen 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
