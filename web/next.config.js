// @ts-check

const withBundleAnalyzer = require('@next/bundle-analyzer');
// @ts-ignore
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { createSecureHeaders } = require('next-secure-headers');
const { publicEnv } = require('./src/config/public-env');

const isProd = process.env.NODE_ENV === 'production';
const enableCSP = isProd;

const trueEnv = ['true', '1', 'yes'];
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_TYPECHECK ?? 'false'
);

const strapiUrl = publicEnv.NEXT_PUBLIC_STRAPI_API_URL;
const { hostname: strapiHostname } = new URL(strapiUrl);

const withVanillaExtract = createVanillaExtractPlugin();

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
    // https://nextjs.org/docs/messages/google-fonts-missing-subsets
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    esmExternals: true,
  },

  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
  },

  webpack: (config, { webpack, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/webpack/#passing-options
          options: {
            svgo: true,
            // @link https://github.com/svg/svgo#configuration
            svgoConfig: {
              multipass: false,
              datauri: 'base64',
              js2svg: {
                indent: 2,
                pretty: false,
              },
            },
          },
        },
      ],
    });

    return config;
  },
};

nextConfig = withVanillaExtract(nextConfig, {
  debug: !isProd,
});

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer({
    enabled: true,
  })(nextConfig);
}

module.exports = nextConfig;