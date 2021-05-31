/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const {
  commonWebpackConfig,
  packageWebpackConfig,
} = require('@episclera/webpack-config')
const { mergeConfigs } = require('@episclera/multipack-utils')

module.exports = mergeConfigs(commonWebpackConfig, packageWebpackConfig, {
  output: {
    library: 'multipackCli',
  },
})
