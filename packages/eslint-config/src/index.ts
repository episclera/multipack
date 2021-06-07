import { EslintConfig } from '../types'

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
    'react/jsx-props-no-spreading': 'off', // useless because it's not possible to get ...rest props
    'react/require-default-props': 'off', // useless because default props are deprecated for functional components
    '@typescript-eslint/no-explicit-any': 'off', // useless because sometime you need any type
    '@typescript-eslint/restrict-template-expressions': 'off', // useless because template literals can transform anything to string
  },
}

export default eslintConfig
