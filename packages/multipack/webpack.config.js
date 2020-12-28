const {
  commonWebpackConfig,
  packageWebpackConfig,
} = require('@episclera/webpack-config')
const { mergeConfigs } = require('@episclera/configkit-utils')

module.exports = mergeConfigs(commonWebpackConfig, packageWebpackConfig, {
  output: {
    library: 'multipack',
  },
})
