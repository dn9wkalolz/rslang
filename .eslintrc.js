module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/prop-types": "off",
    "import/prefer-default-export": "off",
    "no-nested-ternary": "off",
    "no-else-return": "off",
    'import/no-cycle': 'off',
    "react/no-danger": "off",
    "linebreak-style": "off",
  },
};
