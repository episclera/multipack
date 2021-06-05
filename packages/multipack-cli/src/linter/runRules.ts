import log from '../utils/log'
import { TRunRules, LinterRuleResult } from '../../types'
import filesExistsRule from './rulesHandlers/filesExistsRule'
import matchRule from './rulesHandlers/matchRule'

/**
 * Used to run linter config rules
 * @param rules - rules to run
 */
/* istanbul ignore next */
const runRules: TRunRules = async rules => {
  const rulesRunResults: LinterRuleResult[] = []

  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rules) {
    let ruleResult

    if (rule.type === 'files-exists') {
      // eslint-disable-next-line no-await-in-loop
      ruleResult = await filesExistsRule(rule)
    }

    if (rule.type === 'match') {
      // eslint-disable-next-line no-await-in-loop
      ruleResult = await matchRule(rule)
    }

    rulesRunResults.push(...(ruleResult || []))
  }

  if (rulesRunResults.every(({ error }) => !error)) {
    log.success('All linter rules passed with success')
  } else if (rulesRunResults.every(({ error }) => error)) {
    rulesRunResults
      .filter(({ error }) => error)
      .forEach(({ error }) => log.error(error as Error))
    log.error(`All linter rules failed due to these errors above!`)
  } else {
    rulesRunResults
      .filter(({ error }) => error)
      .forEach(({ error }) => log.error(error as Error))
    log.warning(`Some linter rules failed due to these errors above!`)
  }
}

export default runRules
