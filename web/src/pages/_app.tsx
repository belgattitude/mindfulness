import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat, Quicksand, Inter } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import { MainLayout } from '@/components/Layout';
import { defaultSeoConfig } from '@/config/seo.config';
import { ReactQueryClientProvider } from '../providers/ReactQueryClientProvider';

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState: unknown;
  };
}

const fontInter = Inter({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-family-inter',
  style: ['normal'],
  preload: true,
  display: 'block',
});

const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-family-montserrat',
  style: ['normal', 'italic'],
  preload: true,
  display: 'block',
});

const fontQuicksand = Quicksand({
  subsets: ['latin'],
  weight: 'variable',
  // weight: ['100', '300', '400'],
  style: ['normal'],
  variable: '--font-family-quicksand',
});

/*
const fontBrand = localFont({
  src: [
    {
      // path: 'fonts/agrandir/PPAgrandir-Regular.woff2',
      path: './PPAgrandir-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Roboto-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Roboto-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});
*/
const MyApp = (appProps: MyAppProps) => {
  const { Component, pageProps } = appProps;
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-montserrat: ${fontMontserrat.style.fontFamily};
            --font-family-quicksand: ${fontQuicksand.style.fontFamily};
            --font-family-inter: ${fontInter.style.fontFamily};
          }
        `}
      </style>
      <ReactQueryClientProvider>
        <div
          className={`${fontMontserrat.variable} ${fontQuicksand.variable} font-sans`}
        >
          <DefaultSeo {...defaultSeoConfig} />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </div>
      </ReactQueryClientProvider>
    </>
  );
};

export default MyApp;
