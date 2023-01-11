// @ts-check

import withBundleAnalyzer from '@next/bundle-analyzer';
import { createSecureHeaders } from 'next-secure-headers';
import { publicEnv } from './src/config/public-env.mjs';

const isProd = process.env.NODE_ENV === 'production';
const enableCSP = isProd;

const strapiUrl = publicEnv.NEXT_PUBLIC_STRAPI_API_URL;
const { hostname: strapiHostname } = new URL(strapiUrl);

// @link https://github.com/jagaapple/next-secure-headers
const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives: enableCSP
      ? {
          defaultSrc: "'self'",
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
          frameSrc: ["'self'"],
          connectSrc: [
            "'self'",
            'https://vitals.vercel-insights.com',
            strapiUrl,
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

  // transpilePackages: isProd ? ['ky'] : [],

  eslint: { ignoreDuringBuilds: !!process.env.CI },

  images: {
    domains: [strapiHostname, 'images.unsplash.com'],
    minimumCacheTTL: 86_400,
  },

  async redirects() {
    return [
      {
        source: '/content-admin',
        destination: `${strapiUrl}/admin`,
        permanent: false,
      },
    ]
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
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer({
    enabled: true,
  })(nextConfig);
}

export default nextConfig;
