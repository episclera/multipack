import runRules from './runRules'
import { TLinter } from '../../types'

/**
 *  Used to run linterConfigs
 * @param linterConfig - linterConfig
 */
/* istanbul ignore next */
const linter: TLinter = async linterConfig => {
  await runRules(linterConfig.rules)
}

export default linter
