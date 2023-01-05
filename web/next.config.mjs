// @ts-check

import withBundleAnalyzer from '@next/bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';

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
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.failwell.be',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
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
