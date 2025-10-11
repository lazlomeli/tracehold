/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Tracehold Brand Colors
        'tracehold': {
          'light-gray': '#F4F4F4',
          'purple': '#7B36FF',
          'navy': '#020E2D',
          'sky-blue': '#529DFF',
        },
        // Grayscale Colors
        'gray': {
          'cloud': '#EDEFF7',
          'smoke': '#D3D6E0',
          'steel': '#BCBFCC',
          'space': '#9DA2B3',
          'graphite': '#6E7180',
          'arsenic': '#40424D',
          'phantom': '#1E1E24',
          'black': '#000000',
        }
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
