/* eslint-disable import/no-extraneous-dependencies */
const {
  commonEslintConfig,
  monorepoEslintConfig,
  mergeConfigs,
} = require('@episclera/configkit')

module.exports = mergeConfigs(commonEslintConfig, monorepoEslintConfig)
