// @ts-check

import { createSecureHeaders } from 'next-secure-headers';
import { env } from './env.mjs';

const isProd = process.env.NODE_ENV === 'production';
const enableCSP = isProd;

const trueEnv = ['true', '1', 'yes'];
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_TYPECHECK ?? 'false'
);

const strapiUrl = env.NEXT_PUBLIC_STRAPI_API_URL;
const { hostname: strapiHostname } = new URL(strapiUrl);

// @link https://github.com/jagaapple/next-secure-headers
const secureHeaders = createSecureHeaders({
  contentSecurityPolicy: {
    directives: enableCSP
      ? {
          defaultSrc: "'self'",
          // 'unsafe-inline' for emotion... possible to add a hash too
          styleSrc: ["'self'", "'unsafe-inline'"],
          // 'unsafe-inline' for react-markdown
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

  transpilePackages: isProd
    ? [
        // dist make usage of nullish ?.
        'tailwind-merge',
      ]
    : [],

  // @link https://nextjs.org/docs/basic-features/image-optimization
  images: {
    deviceSizes: [750, 828, 1080, 1200], // default: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96], // default: [16, 32, 48, 64, 96, 128, 256, 384]
    minimumCacheTTL: 86_400,
    formats: ['image/webp'],
    loader: 'default',
    dangerouslyAllowSVG: false,
    disableStaticImages: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'mindfulness.reflective-resonance.be',
      },
      {
        protocol: 'http',
        hostname: strapiHostname,
      },
      {
        protocol: 'https',
        hostname: strapiHostname,
      },
    ],
    unoptimized: false,
  },

  async redirects() {
    return [
      {
        source: '/admin123',
        destination: `${strapiUrl}/admin`,
        permanent: false,
      },
    ];
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
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    esmExternals: true,
  },

  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
  },
};

export default nextConfig;
