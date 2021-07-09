/* eslint-disable @typescript-eslint/no-var-requires */
const {
  commonWebpackConfig,
  packageWebpackConfig,
} = require('@episclera/webpack-config')
/**
 * Using the merge utils from @episclera/configkit-utils due to dependency cycle
 */
const { mergeConfigs } = require('@episclera/configkit-utils')

module.exports = mergeConfigs(commonWebpackConfig, packageWebpackConfig, {
  output: {
    library: 'multipackUtils',
  },
})
