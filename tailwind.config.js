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
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        islamic: {
          green: '#00A859',
          'green-light': '#4CAF50',
          'green-dark': '#388E3C',
          'green-hover': '#2E7D32',
          gold: '#D4AF37',
          'gold-light': '#FFC107',
          'gold-muted': '#FFA500',
          navy: '#1B365D',
          'navy-light': '#1E3A8A',
          cream: '#F7F3E9',
          'cream-light': '#F5F5F5',
          white: '#FFFFFF',
        },
        alert: {
          orange: '#FFA500',
          yellow: '#FFC107',
        }
      },
      fontFamily: {
        // Traditional Arabic fonts for religious content
        'arabic': ['Amiri', 'Noto Naskh Arabic', 'Scheherazade New', 'serif'],
        'arabic-modern': ['Cairo', 'Noto Sans Arabic', 'Tajawal', 'sans-serif'],
        'arabic-display': ['Scheherazade New', 'Amiri', 'Noto Naskh Arabic', 'serif'],
        'arabic-body': ['Noto Sans Arabic', 'Tajawal', 'Cairo', 'sans-serif'],
        'arabic-heading': ['Cairo', 'Amiri', 'Noto Sans Arabic', 'sans-serif'],
        // Mixed language support
        'mixed': ['Inter', 'Noto Sans Arabic', 'Cairo', 'sans-serif'],
      },
      fontSize: {
        // Arabic-optimized font sizes
        'arabic-xs': ['0.75rem', { lineHeight: '1.6' }],
        'arabic-sm': ['0.875rem', { lineHeight: '1.7' }],
        'arabic-base': ['1rem', { lineHeight: '1.8' }],
        'arabic-lg': ['1.125rem', { lineHeight: '1.8' }],
        'arabic-xl': ['1.25rem', { lineHeight: '1.9' }],
        'arabic-2xl': ['1.5rem', { lineHeight: '2' }],
        'arabic-3xl': ['1.875rem', { lineHeight: '2.1' }],
        'arabic-4xl': ['2.25rem', { lineHeight: '2.2' }],
      },
      letterSpacing: {
        'arabic': '0.025em',
        'arabic-wide': '0.05em',
      },
      textShadow: {
        'arabic': '1px 1px 2px rgba(0, 0, 0, 0.1)',
        'arabic-lg': '2px 2px 4px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'mosque-pattern': "url('/patterns/islamic-pattern.svg')",
        'gradient-islamic': 'linear-gradient(135deg, #1B365D 0%, #00A859 100%)',
      },
    },
  },
  plugins: [
    // Custom plugin for Arabic text utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.text-rtl': {
          direction: 'rtl',
          'unicode-bidi': 'bidi-override',
        },
        '.text-ltr': {
          direction: 'ltr',
          'unicode-bidi': 'bidi-override',
        },
        '.text-arabic-shadow': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.1)',
        },
        '.text-arabic-shadow-lg': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.15)',
        },
        '.text-optimize': {
          'text-rendering': 'optimizeLegibility',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        '.arabic-features': {
          'font-feature-settings': '"liga" 1, "calt" 1, "kern" 1',
        },
        '.arabic-features-fancy': {
          'font-feature-settings': '"liga" 1, "calt" 1, "kern" 1, "swsh" 1, "cswh" 1',
        },
        '.btn-islamic': {
          '@apply px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2': {},
          'padding': '12px 24px',
        },
        '.btn-islamic-primary': {
          '@apply bg-islamic-green-light hover:bg-islamic-green-dark text-white focus:ring-islamic-green-light': {},
          'color': 'white',
          'background-color': 'var(--islamic-green-light)',
          'transition': 'all 0.2s ease-in-out',
          '&:hover': {
            'background-color': 'var(--islamic-green-hover)',
            'transform': 'translateY(-1px)',
            'box-shadow': '0 4px 12px rgba(46, 125, 50, 0.3)',
          },
        },
        '.btn-islamic-secondary': {
          '@apply bg-islamic-gold-light hover:bg-islamic-gold text-islamic-navy focus:ring-islamic-gold-light': {},
        },
        '.text-readable': {
          'font-size': '16px',
          'font-weight': '600',
          'line-height': '1.6',
        },
        '.spacing-comfortable': {
          'margin-bottom': '20px',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}