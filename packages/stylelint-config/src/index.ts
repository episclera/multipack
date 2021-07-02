import { StylelintConfig } from '../types'

const stylelintConfig: StylelintConfig = {
  extends: ['stylelint-config-recommended', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-prettier'],
  rules: {
    'at-rule-no-unknown': null,
    /**
     * Enabling prettier for style files also
     */
    'prettier/prettier': true,
  },
}

export default stylelintConfig
