import '../styles/globals.scss';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { Montserrat, Quicksand } from '@next/font/google';
// import localFont from '@next/font/local';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { createEmotionCache } from '@/lib/emotion/createEmotionCache';
import { queryClientConfig } from '../config/query-client.config';
import { defaultSeoConfig } from '../config/seo.config';

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const fontMontserrat = Montserrat({
  weight: 'variable',
  variable: '--font-family-montserrat',
  style: ['normal', 'italic'],
  preload: true,
  display: 'block',
});

const fontQuicksand = Quicksand({
  subsets: ['latin'],
  weight: 'variable',
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
  const {
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache,
  } = appProps;
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-montserrat: ${fontMontserrat.style.fontFamily};
            --font-family-quicksand: ${fontQuicksand.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <div
              className={`${fontMontserrat.variable} ${fontQuicksand.variable} font-sans`}
            >
              <DefaultSeo {...defaultSeoConfig} />
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </div>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
