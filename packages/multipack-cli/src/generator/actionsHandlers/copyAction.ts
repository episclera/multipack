import { copy } from 'fs-extra'
import cliSpinner from '../../utils/cliSpinner'
import { TCopyAction, GeneratorActionResult } from '../../../types'

/**
 * Used to run copy actions
 * @param action - represents a copy action from generator config actions
 */
/* istanbul ignore next */
const copyAction: TCopyAction = async action => {
  const actionResult = (await Promise.all(
    Object.entries(action.files).map(
      ([from, to]) =>
        new Promise(resolve => {
          const spinner = cliSpinner(
            `Copying files from "${from}" to "${to}"`,
          ).start()

          copy(from, to, error => {
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
  )) as GeneratorActionResult[]

  return actionResult
}

export default copyAction
