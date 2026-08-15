import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        petrol: { DEFAULT: '#16242C', deep: '#101B21', raised: '#1B2C35' },
        slate: { DEFAULT: '#3A5563', light: '#6B8695', line: '#2C4049' },
        mantle: { DEFAULT: '#8A4412', light: '#C4762A', text: '#7A3C10' },
        ember: { DEFAULT: '#D25A10', light: '#F79A38', text: '#A84E0B' },
        core: '#FFDD80',
        ink: { DEFAULT: '#241C15', secondary: '#5C4E40', muted: '#8B7A67' },
        paper: { DEFAULT: '#F5F1EA', sunken: '#FAF7F2', line: '#E2D9CB', strong: '#CFC3B0' },
        status: { normal: '#1F7A4D', notice: '#B87400', alert: '#C2410C', alarm: '#9B1C1C' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '1240px' },
      transitionTimingFunction: {
        // the easing every reveal uses — slow out, no bounce
        core: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
