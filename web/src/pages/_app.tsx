import '../styles/globals.scss';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import {
  Parisienne,
  Inter,
  Crimson_Pro,
  Yanone_Kaffeesatz,
  Bad_Script,
  Dancing_Script,
  Marck_Script,
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

const primaryFont = Montserrat({
  // subsets: ['latin'],
  weight: 'variable',
  // weight: ['200', '300', '400', '600', '700'],
  style: ['normal', 'italic'],
});

const yanone = Yanone_Kaffeesatz({
  weight: 'variable',
  variable: '--font-yanone',
});

const handwritten = Dancing_Script({
  weight: ['400'],
  variable: '--font-handwritten',
});

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
            --font-family-text-primary: ${primaryFont.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <div
              className={`${inter.variable} ${crimson.variable} ${yanone.variable} ${handwritten.variable} font-sans`}
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
