const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  plugins: [
    // require('@tailwindcss/forms'),
  ],
  theme: {
    extend: {
      colors: {
        "brand-color": {
          100: "hsl(150, 27%, 88%)",
          200: "hsl(150, 27%, 85%)",
          300: "hsl(150, 27%, 82%)",
          400: "hsl(150, 27%, 78%)",
          50: "hsl(150, 27%, 92%)",
          500: "hsl(150, 27%, 74%)",
          600: "hsl(150, 27%, 71%)",
          700: "hsl(150, 27%, 67%)",
          800: "hsl(150, 27%, 62%)",
          900: "hsl(150, 27%, 40%)",
          DEFAULT: "hsl(150, 27%, 78%)",
        },
        brightRed: "hsl(12, 88%, 59)",
        // Site name in the navigation header
        "nav-title": "#34695d",
        "custom-brown": {
          DEFAULT: "rgb(193,160,132)",
        },
        "title-color": {
          100: "hsl(159, 30%, 85%)",
          200: "hsl(159, 30%, 80%)",
          300: "hsl(159, 30%, 65%)",
          400: "hsl(159, 30%, 60%)",
          50: "hsl(159, 30%, 92%)",
          500: "hsl(159, 30%, 50%)",
          600: "hsl(159, 30%, 40%)",
          700: "hsl(159, 30%, 30%)",
          800: "hsl(159, 30%, 30%)",
          900: "hsl(159, 30%, 20%)",
          DEFAULT: "hsl(159, 30%, 55%)",
        },
      },

      fontFamily: {
        "family-brand": ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        "family-button": ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        "family-menu": ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        "family-primary": ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        "family-title": ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      ...defaultTheme.screens,
    },
  },
};
