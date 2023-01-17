const path = require('path');
const { VanillaExtractPlugin } = require("@vanilla-extract/webpack-plugin");
const { merge } = require("webpack-merge");

module.exports = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  babel: (config) => {
    config.presets.push(require.resolve('@emotion/babel-preset-css-prop'));
    return config;
  },
  webpackFinal: async (config) =>
    merge(config, {
      plugins: [new VanillaExtractPlugin()],
    }),
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs
  "framework": {
    "name": "@storybook/nextjs",
    "options": {
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    }
  },
  // https://github.com/storybookjs/storybook/tree/next/code/frameworks/nextjs#custom-webpack-config
  webpackFinal: async (config) => {
    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const imageRule = config.module.rules.find((rule) => rule.test.test('.svg'));
    imageRule.exclude = /\.svg$/;

    // Configure .svg files to be loaded with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  "docs": {
    "autodocs": "tag"
  }
}