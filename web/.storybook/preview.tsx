import '../src/styles/globals.css';
import type { Preview } from "@storybook/nextjs";

import { Montserrat, Inter } from 'next/font/google';

const fontInter = Inter({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-family-inter',
  style: ['normal'],
  //preload: true,
  display: 'block',
});

const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-family-montserrat',
  style: ['normal', 'italic'],
  //preload: true,
  display: 'block',
});

const decorators = [
  (Story, context) => {
    return (
      <div className={`${fontInter.variable} ${fontMontserrat.variable} font-sans`}>
        <Story />
      </div>
    )
  }
] as const satisfies Preview['decorators']


const preview: Preview = {
  decorators: decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};


export default preview;
