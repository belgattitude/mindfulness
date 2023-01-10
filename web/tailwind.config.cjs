const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['var(--font-crimson)', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59)',
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
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
