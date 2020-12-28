const {
  commonJestConfig,
  monorepoJestConfig,
  mergeConfigs,
} = require('@episclera/configkit')

module.exports = mergeConfigs(commonJestConfig, monorepoJestConfig)
