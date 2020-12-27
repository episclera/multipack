const {
  commonWebpackConfig,
  packageWebpackConfig,
} = require('@episclera/webpack-config')
const { mergeConfigs } = require('@episclera/toolkit-utils')

module.exports = mergeConfigs(commonWebpackConfig, packageWebpackConfig, {
  output: {
    library: 'multipackWithReact',
  },
})
