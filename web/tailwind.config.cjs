// eslint-disable-next-line @typescript-eslint/no-require-imports
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
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
          'var(--font-family-inter)',
          ...defaultTheme.fontFamily.sans,
        ],
        'family-button': [
          'var(--font-family-inter)',
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
        'title-color': {
          50: 'hsl(159, 30%, 92%)',
          100: 'hsl(159, 30%, 85%)',
          200: 'hsl(159, 30%, 80%)',
          300: 'hsl(159, 30%, 65%)',
          400: 'hsl(159, 30%, 60%)',
          DEFAULT: 'hsl(159, 30%, 55%)',
          500: 'hsl(159, 30%, 50%)',
          600: 'hsl(159, 30%, 40%)',
          700: 'hsl(159, 30%, 30%)',
          800: 'hsl(159, 30%, 30%)',
          900: 'hsl(159, 30%, 20%)',
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
          900: 'hsl(150, 27%, 40%)',
        },
      },

      typography: ({ theme }) => ({
        brand: {
          css: {
            '--tw-prose-body': theme('colors.pink[800]'),
            '--tw-prose-headings': theme('colors.title-color[500]'),
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
  ],
};
