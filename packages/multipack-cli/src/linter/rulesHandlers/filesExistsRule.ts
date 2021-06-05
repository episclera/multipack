import { access } from 'fs'
import cliSpinner from '../../utils/cliSpinner'
import { TFilesExistsRule, LinterRuleResult } from '../../../types'

/**
 * Used to run filesExists rules
 * @param rule - represents a filesExists rule from linter config rules
 */
/* istanbul ignore next */
const filesExistsRule: TFilesExistsRule = async rule => {
  const ruleResult = (await Promise.all(
    rule.files.map(
      fileName =>
        new Promise(resolve => {
          const spinner = cliSpinner(`Checking if "${fileName}" exists`).start()

          access(fileName, error => {
            if (error) {
              spinner.fail()
              resolve({ error })
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

export default filesExistsRule
