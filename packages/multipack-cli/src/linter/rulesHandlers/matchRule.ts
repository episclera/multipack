import { readFile } from 'fs'
import cliSpinner from '../../utils/cliSpinner'
import { TMatchRule, LinterRuleResult } from '../../../types'

/**
 * Used to run match rules
 * @param rule - represents a match rule from linter config rules
 */
const matchRule: TMatchRule = async ({
  type,
  name,
  patterns,
  files,
  description,
}) => {
  const ruleResult = (await Promise.all(
    files.map(
      fileName =>
        new Promise(resolve => {
          const spinner = cliSpinner(
            `Checking if "${fileName}" content are matching the patterns "${patterns}"`,
          ).start()

          readFile(fileName, (error, data) => {
            if (error) {
              spinner.fail()
              resolve({ error })
            } else {
              const notMatchingPatterns = patterns.filter(
                pattern => !pattern.test(data.toString()),
              )
              const ruleDescription =
                typeof description === 'function'
                  ? description({ fileName, patterns, notMatchingPatterns })
                  : description

              if (notMatchingPatterns.length > 0) {
                spinner.fail()
                resolve({
                  error: new Error(`[${type}/${name}] - ${ruleDescription}`),
                })
              } else {
                spinner.succeed()
                resolve({ error: false })
              }
            }
          })
        }),
    ),
  )) as LinterRuleResult[]

  return ruleResult
}

export default matchRule
