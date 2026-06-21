/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080c14',
        surface: '#0f1923',
        card: '#162032',
        border: '#1e3048',
        accent: '#00ff88',
        'accent-dim': '#00cc6a',
        coral: '#ff4757',
        cyan: '#00d4ff',
        orange: '#ff8c42',
        muted: '#7a8ba0',
        gold: '#fbbf24'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}
