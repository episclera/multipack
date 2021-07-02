/* istanbul ignore file */
import { LintStagedConfig } from '../types'

/* istanbul ignore next */
const lintStagedConfig: LintStagedConfig = {
  /**
   * Using "*" pattern for multipack lint because it should be triggered on any type file in the workspace
   * in order to have full visibility on any possible commit changes
   */
  '*': ['npm run lint:packages:structure'],
  '*.(ts|tsx)': ['npm run lint:packages:scripts'],
  '*.(less)': ['npm run lint:packages:styles'],
}

/* istanbul ignore next */
export default lintStagedConfig
