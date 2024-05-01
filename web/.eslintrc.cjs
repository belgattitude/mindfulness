const {
  getDefaultIgnorePatterns,
} = require('@belgattitude/eslint-config-bases/helpers');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [
    ...getDefaultIgnorePatterns(),
    'storybook-static',
    '.yarn',
    'src/gql',
  ],
  extends: [
    '@belgattitude/eslint-config-bases/typescript',
    '@belgattitude/eslint-config-bases/import-x',
    '@belgattitude/eslint-config-bases/react',
    '@belgattitude/eslint-config-bases/react-query',
    '@belgattitude/eslint-config-bases/tailwind',
    '@belgattitude/eslint-config-bases/storybook',
    'next/core-web-vitals',
    '@belgattitude/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
  overrides: [
    {
      files: ['next.config.mjs'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['src/gql/**/*.ts'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        'prettier/prettier': 'off',
      },
    },
  ],
};
