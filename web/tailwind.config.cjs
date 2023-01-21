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
        'custom-style-body': [
          'var(--font-family-text-primary)',
          ...defaultTheme.fontFamily.sans,
        ],
      },

      colors: {
        brightRed: 'hsl(12, 88%, 59)',
        'custom-brown': {
          DEFAULT: 'rgb(193,160,132)',
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
