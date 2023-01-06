// @ts-check

import withBundleAnalyzer from '@next/bundle-analyzer';
import { createSecureHeaders } from 'next-secure-headers';

const isProd = process.env.NODE_ENV === 'production';
const enableCSP = isProd;

// @link https://github.com/jagaapple/next-secure-headers
const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives: enableCSP
      ? {
        defaultSrc: "'self'",
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
        ],
        frameSrc: [
          "'self'",
        ],
        connectSrc: [
          "'self'",
          'https://vitals.vercel-insights.com',
          'https://mindfulness.failwell.be',
        ],
        imgSrc: ["'self'", 'https:', 'http:', 'data:'],
        workerSrc: ['blob:'],
      }
      : {},
  },
  ...(enableCSP
    ? {
      forceHTTPSRedirect: [
        true,
        { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true },
      ],
    }
    : {}),
  referrerPolicy: 'same-origin',
});


/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  /**
   webpack(config, context) {
    if (context.buildId !== "development") {
      // In monorepo example when the locales live in a separate package
      // there's still issues regarding fast-refresh... To investigate
      config.cache = false;
    }

    return config;
  }, */

  // transpilePackages: isProd ? ['ky'] : [],

  images: {
    domains: ['mindfulness.failwell.be'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.failwell.be',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },

  async headers() {
    return [
      {
        // All page routes, not the api ones
        source: '/:path((?!api).*)*',
        headers: [
          ...secureHeaders,
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
        ],
      },
    ];
  },


  experimental: {
    // https://nextjs.org/docs/messages/google-fonts-missing-subsets
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    esmExternals: true,
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer({
    enabled: true,
  })(nextConfig);
}

export default nextConfig;
