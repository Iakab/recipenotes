module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript', 'prettier'],

  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js, cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'array-callback-return': 1,
    'arrow-body-style': 1,
    'consistent-return': 1,
    'eqeqeq': 1,
    'import/prefer-default-export': 1,
    'no-unused-vars': 1,
    'no-plusplus': 0,
  },
};
