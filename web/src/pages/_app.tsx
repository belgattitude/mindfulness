import '../styles/globals.scss';
import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import {
  Parisienne,
  Inter,
  Crimson_Pro,
  Yanone_Kaffeesatz,
  Bad_Script,
  Marck_Script,
} from '@next/font/google';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { createEmotionCache } from '@/lib/emotion/createEmotionCache';
import { defaultSeoConfig } from '../config/seo.config';

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache;
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const yanone = Yanone_Kaffeesatz({
  weight: 'variable',
  variable: '--font-yanone',
});

const handwritten = Marck_Script({
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
  const [queryClient] = useState(() => new QueryClient());
  return (
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
  );
};

export default MyApp;
