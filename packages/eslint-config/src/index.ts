/* istanbul ignore file */
import { EslintConfig } from '../types'

/* istanbul ignore next */
const eslintConfig: EslintConfig = {
  extends: [
    'eslint:recommended', // add eslint recommended rules
    'airbnb-typescript', // extends from airbnb and override few airbnb rules to TS rules and sets ("extends": "eslint-config-airbnb" AND "parser": @typescript-eslint/parser AND "plugins": @typescript-eslint AND "import/extensions": ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'])
    'airbnb/hooks', // sets rules for react/hooks and sets ("plugins": react-hooks AND "parserOptions.ecmaFeatures.jsx:": true)
    'plugin:prettier/recommended', // add prettier rules and sets ("extends": ["prettier"] AND "plugins": ["prettier"])
    'plugin:@typescript-eslint/recommended', // recommended by @typescript-eslint
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // recommended by @typescript-eslint
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    jest: true,
    node: true,
    es6: true,
    browser: true,
  },
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
  },
}

/* istanbul ignore next */
export default eslintConfig
