/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        border: 'var(--border-color)',
        accent: 'var(--accent)',
        'accent-dim': 'var(--accent-dim)',
        coral: 'var(--coral)',
        cyan: 'var(--cyan)',
        orange: 'var(--orange)',
        muted: 'var(--muted)',
        gold: 'var(--gold)'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Space Grotesk', 'sans-serif']
      }
    },
  },
  plugins: [],
}
