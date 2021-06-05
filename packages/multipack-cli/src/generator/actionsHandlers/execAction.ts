import execa from 'execa'
import cliSpinner from '../../utils/cliSpinner'
import log from '../../utils/log'
import { TExecAction } from '../../../types'

/**
 * Used to run exec actions
 * @param action - represents a exec action from generator config actions
 */
/* istanbul ignore next */
const execAction: TExecAction = async ({ type, command, ...execaOptions }) => {
  let actionResult
  const spinner = cliSpinner(`Executing command "${command}"`).start()

  try {
    const { stdout } = await execa(command, {
      /*
       * If shell=true (default false), runs command inside of a shell. Uses /bin/sh on UNIX and cmd.exe on Windows.
       * A different shell can be specified as a string.
       */
      shell: true,
      ...execaOptions,
    })
    actionResult = { error: false }
    spinner.succeed()
    log.info(
      `Output after running command "${command}":
      ${stdout}
    `,
    )
  } catch (error) {
    actionResult = { error: error as Error }
    spinner.fail()
  }
  return [actionResult]
}

export default execAction
