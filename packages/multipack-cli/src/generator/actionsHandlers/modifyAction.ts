import { replaceInFile } from 'replace-in-file'
import cliSpinner from '../../utils/cliSpinner'
import { TModifyAction, GeneratorActionResult } from '../../../types'

/**
 * Used to run modify actions
 * @param action - represents a modify action from generator config actions
 */
/* istanbul ignore next */
const modifyAction: TModifyAction = async ({ type, ...modifyOptions }) => {
  const actionResult: GeneratorActionResult = await new Promise(resolve => {
    const spinner = cliSpinner(
      `Modifying files "${modifyOptions.files}" using this pattern "${modifyOptions.from}"`,
    ).start()

    replaceInFile(modifyOptions, error => {
      if (error) {
        spinner.fail()
        resolve({ error })
      } else {
        spinner.succeed()
        resolve({ error: false })
      }
    })
  })

  return [actionResult]
}

export default modifyAction
