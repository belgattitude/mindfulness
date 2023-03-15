const path = require('path');
// const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
// const { merge } = require('webpack-merge');

module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  babel: (config) => {
    config.presets.push(require.resolve('@emotion/babel-preset-css-prop'));
    return config;
  },

  webpackFinal: (webpackConfig) => {
    // This modifies the existing image rule to exclude `.svg` files
    // since we handle those with `@svgr/webpack`.
    const imageRule = webpackConfig.module.rules.find((rule) => {
      if (typeof rule !== 'string' && rule.test instanceof RegExp) {
        return rule.test.test('.svg')
      }
    })
    if (typeof imageRule !== 'string') {
      imageRule.exclude = /\.svg$/
    }

    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return webpackConfig
  },

  // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs#custom-webpack-config
  /*
  webpackFinal: async (config) => {
    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const imageRule = config.module.rules.find((rule) =>
      rule.test.test('.svg')
    );
    imageRule.exclude = /\.svg$/;

    // Configure .svg files to be loaded with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return merge(config, {
      plugins: [new VanillaExtractPlugin()],
    });
  },*/
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs
  framework: {
    name: '@storybook/nextjs',
    options: {
      nextConfigPath: path.resolve(__dirname, '../next.config.mjs'),
    },
  },
  docs: {
    autodocs: 'tag',
  },
};
