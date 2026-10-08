import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-themes",
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/nextjs-vite",
    options: {
      useSwc: true,
    },
  },

  staticDirs: ["../public"],

  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  webpackFinal: (webpackConfig) => {
    webpackConfig.module ||= {};
    webpackConfig.module.rules ||= [];

    // This modifies the existing image rule to exclude .svg files
    // since you want to handle those files with @svgr/webpack
    const imageRule = webpackConfig.module.rules.find((rule) =>
      rule?.["test"]?.test(".svg")
    );
    if (imageRule) {
      imageRule["exclude"] = /\.svg$/u;
    }

    // Configure .svg files to be loaded with @svgr/webpack
    webpackConfig.module.rules.push({
      test: /\.svg$/u,
      use: ["@svgr/webpack"],
    });

    return webpackConfig;
  },
};
export default config;
