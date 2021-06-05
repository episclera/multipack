import { move } from 'fs-extra'
import cliSpinner from '../../utils/cliSpinner'
import { TMoveAction, GeneratorActionResult } from '../../../types'

/**
 * Used to run move actions
 * @param action - represents a move action from generator config actions
 */
/* istanbul ignore next */
const moveAction: TMoveAction = async action => {
  const actionResult = (await Promise.all(
    Object.entries(action.files).map(
      ([from, to]) =>
        new Promise(resolve => {
          const spinner = cliSpinner(
            `Moving files from "${from}" to "${to}"`,
          ).start()

          move(from, to, error => {
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

export default moveAction
