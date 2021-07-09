/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const { lintStagedConfig } = require('@episclera/multipack')

module.exports = {
  ...lintStagedConfig,
  '*.(ts|tsx|d.ts)': [
    'npm run lint:packages:types',
    'npm run lint:packages:scripts',
  ],
}
