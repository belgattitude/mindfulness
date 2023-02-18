const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './node_modules/flowbite-react/**/*.js',
    './src/**/*.tsx',
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: [
        'var(--font-family-text-primary)',
        ...defaultTheme.fontFamily.sans,
      ],
    },
    extend: {
      fontFamily: {
        'family-primary': [
          'var(--font-family-montserrat)',
          ...defaultTheme.fontFamily.sans,
        ],
        'family-brand': [
          'var(--font-family-quicksand)',
          ...defaultTheme.fontFamily.sans,
        ],
        'family-menu': [
          'var(--font-family-quicksand)',
          ...defaultTheme.fontFamily.sans,
        ],
        'family-title': [
          'var(--font-family-montserrat)',
          ...defaultTheme.fontFamily.sans,
        ],
      },

      colors: {
        brightRed: 'hsl(12, 88%, 59)',
        'custom-brown': {
          DEFAULT: 'rgb(193,160,132)',
        },
        'brand-color': {
          50: 'hsl(150, 27%, 92%)',
          100: 'hsl(150, 27%, 88%)',
          200: 'hsl(150, 27%, 85%)',
          300: 'hsl(150, 27%, 82%)',
          400: 'hsl(150, 27%, 78%)',
          DEFAULT: 'hsl(150, 27%, 78%)',
          500: 'hsl(150, 27%, 74%)',
          600: 'hsl(150, 27%, 71%)',
          700: 'hsl(150, 27%, 67%)',
          800: 'hsl(150, 27%, 62%)',
          900: 'hsl(150, 27%, 45%)',
        },
      },

      typography: ({ theme }) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.pink[800]'),
            '--tw-prose-headings': theme('colors.pink[900]'),
            '--tw-prose-lead': theme('colors.pink[700]'),
            '--tw-prose-links': theme('colors.pink[900]'),
            '--tw-prose-bold': theme('colors.pink[900]'),
            '--tw-prose-counters': theme('colors.pink[600]'),
            '--tw-prose-bullets': theme('colors.pink[400]'),
            '--tw-prose-hr': theme('colors.pink[300]'),
            '--tw-prose-quotes': theme('colors.pink[900]'),
            '--tw-prose-quote-borders': theme('colors.pink[300]'),
            '--tw-prose-captions': theme('colors.pink[700]'),
            '--tw-prose-code': theme('colors.pink[900]'),
            '--tw-prose-pre-code': theme('colors.pink[100]'),
            '--tw-prose-pre-bg': theme('colors.pink[900]'),
            '--tw-prose-th-borders': theme('colors.pink[300]'),
            '--tw-prose-td-borders': theme('colors.pink[200]'),
            '--tw-prose-invert-body': theme('colors.pink[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.pink[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.pink[400]'),
            '--tw-prose-invert-bullets': theme('colors.pink[600]'),
            '--tw-prose-invert-hr': theme('colors.pink[700]'),
            '--tw-prose-invert-quotes': theme('colors.pink[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.pink[700]'),
            '--tw-prose-invert-captions': theme('colors.pink[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.pink[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.pink[600]'),
            '--tw-prose-invert-td-borders': theme('colors.pink[700]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    // require('flowbite/plugin'),
  ],
};
