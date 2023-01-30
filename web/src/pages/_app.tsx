import '../styles/globals.scss';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import {
  Inter,
  Crimson_Pro,
  Yanone_Kaffeesatz,
  Montserrat,
} from '@next/font/google';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { createEmotionCache } from '@/lib/emotion/createEmotionCache';
import { queryClientConfig } from '../config/query-client.config';
import { defaultSeoConfig } from '../config/seo.config';

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const fontTextPrimary = Montserrat({
  weight: 'variable',
  variable: '--font-text-primary',
  style: ['normal', 'italic'],
  preload: true,
  display: 'block',
  // weight: ['200', '300', '400', '600', '700'],
  // subsets: ['latin'],
});

/*
const yanone = Yanone_Kaffeesatz({
  weight: 'variable',
  variable: '--font-yanone',
}); */

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
});

const inter = Inter({
  subsets: ['latin'],
  // weight: ['400', '600', '700', '800', '900'],
  weight: 'variable',
  // weight: ['400', '700'],
  // style: ['normal'],
  variable: '--font-inter',
});

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
            --font-family-text-primary: ${fontTextPrimary.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <div
              className={`${fontTextPrimary.variable} ${inter.variable} ${crimson.variable}  font-sans`}
            >
              <DefaultSeo {...defaultSeoConfig} />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </div>
          </CacheProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
