import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#171412',
        slate: '#e7ded4',
        brand: '#8b5e34',
        amber: '#d9b98b',
        mist: '#f8f3eb',
        sand: '#efe4d6',
        pine: '#1f4d45'
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        display: ['var(--font-display)', 'serif']
      },
      boxShadow: {
        glow: '0 24px 90px rgba(139, 94, 52, 0.18)'
      }
    }
  },
  plugins: []
};

export default config;
