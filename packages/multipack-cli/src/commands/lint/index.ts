/* eslint-disable consistent-return */
import workspaceLinterConfig from './workspaceLinterConfig'
import linter from '../../linter'
import log from '../../utils/log'
import isCWDWorkspaceRootFolder from '../../utils/isCWDWorkspaceRootFolder'
import { TLintCommand } from '../../../types'

/**
 * Commander action used to lint a multipack "workspace"
 */
const lintCommand: TLintCommand = async () => {
  if (!isCWDWorkspaceRootFolder()) {
    log.error(
      'Current working directory is not a multipack workspace. Please run this command only in root folder of a multipack workspace.',
    )
    return
  }

  await linter(workspaceLinterConfig)
}

export default lintCommand
