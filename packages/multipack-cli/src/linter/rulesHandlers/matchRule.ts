import { readFile } from 'fs'
import cliSpinner from '../../utils/cliSpinner'
import { TMatchRule, LinterRuleResult } from '../../../types'

/**
 * Used to run match rules
 * @param rule - represents a match rule from linter config rules
 */
/* istanbul ignore next */
const matchRule: TMatchRule = async rule => {
  const ruleResult = (await Promise.all(
    rule.files.map(
      fileName =>
        new Promise(resolve => {
          const spinner = cliSpinner(
            `Checking if "${fileName}" content are matching the pattern "${rule.pattern}"`,
          ).start()

          readFile(fileName, (error, data) => {
            if (error) {
              spinner.fail()
              resolve({ error })
            } else if (!rule.pattern.test(data.toString())) {
              spinner.fail()
              resolve({
                error: new Error(
                  `[${rule.type}/${rule.name}] - ${rule.description}`,
                ),
              })
            } else {
              spinner.succeed()
              resolve({ error: false })
            }
          })
        }),
    ),
  )) as LinterRuleResult[]

  return ruleResult
}

export default matchRule
