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
        'text-primary': [
          'var(--font-family-text-primary)',
          ...defaultTheme.fontFamily.sans,
        ],
        brand: ['var(--font-family-brand)', ...defaultTheme.fontFamily.sans],
        title: [
          'var(--font-family-text-primary)',
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
      /**
      spacing: {
        128: '32rem',
      },
      */
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
    // require('@tailwindcss/forms'),
    // require('flowbite/plugin'),
  ],
};
