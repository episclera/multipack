import {
  prettierConfig,
  stylelintConfig,
  commitlintConfig,
  jestConfig,
  eslintConfig,
  postcssConfig,
  tailwindConfig,
  commonWebpackConfig,
  packageWebpackConfig,
  nextConfig,
  nextI18NextConfig,
  mergeConfigs,
  lintStagedConfig,
  codeGenConfig,
} from '../index'

// NOTE: all utils/configs are tested separately in theirs folders so no need to test here other logical things
describe('multipack', () => {
  it.each([
    prettierConfig,
    stylelintConfig,
    commitlintConfig,
    jestConfig,
    eslintConfig,
    postcssConfig,
    tailwindConfig,
    commonWebpackConfig,
    packageWebpackConfig,
    nextConfig,
    nextI18NextConfig,
    lintStagedConfig,
    codeGenConfig,
    mergeConfigs,
  ])('Should correctly re-export package: %s', pkg => {
    expect(pkg).toBeDefined()
  })
})
