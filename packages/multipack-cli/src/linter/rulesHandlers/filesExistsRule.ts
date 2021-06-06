import { access } from 'fs'
import cliSpinner from '../../utils/cliSpinner'
import { TFilesExistsRule, LinterRuleResult } from '../../../types'

/**
 * Used to run filesExists rules
 * @param rule - represents a filesExists rule from linter config rules
 */
const filesExistsRule: TFilesExistsRule = async ({
  type,
  name,
  description,
  files,
}) => {
  const ruleResult = (await Promise.all(
    files.map(
      fileName =>
        new Promise(resolve => {
          const spinner = cliSpinner(`Checking if "${fileName}" exists`).start()

          access(fileName, error => {
            if (error) {
              const ruleDescription =
                typeof description === 'function'
                  ? description({ fileName })
                  : description

              spinner.fail()
              resolve({
                error: new Error(`[${type}/${name}] - ${ruleDescription}`),
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

export default filesExistsRule
