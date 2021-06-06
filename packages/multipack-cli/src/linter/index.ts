import runRules from './runRules'
import { TLinter } from '../../types'

/**
 *  Used to run linterConfigs
 * @param linterConfig - linterConfig
 */
const linter: TLinter = async linterConfig => {
  const linterConfigRules =
    typeof linterConfig.rules === 'function'
      ? linterConfig.rules()
      : linterConfig.rules

  const rulesRunResults = await runRules(linterConfigRules)

  if (rulesRunResults.some(({ error }) => error)) {
    process.exit(1)
  }
}

export default linter
