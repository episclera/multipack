import log from '../utils/log'
import { TRunRules, LinterRuleResult } from '../../types'
import filesExistsRule from './rulesHandlers/filesExistsRule'
import matchRule from './rulesHandlers/matchRule'

/**
 * Used to run linter config rules
 * @param rules - rules to run
 */
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

  if (rulesRunResults.some(({ error }) => error)) {
    const rulesWithErrors = rulesRunResults.filter(({ error }) => error)

    rulesWithErrors.forEach(({ error }) => log.error(error as Error))
    log.error(
      `${rulesWithErrors.length} of ${rulesRunResults.length} multipack linter rules failed due to these errors above!`,
    )
  } else {
    log.success('All multipack linter rules passed with success')
  }

  return rulesRunResults
}

export default runRules
