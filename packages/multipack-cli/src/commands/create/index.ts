/* eslint-disable consistent-return */
import packageGeneratorConfig from './packageGeneratorConfig'
import workspaceGeneratorConfig from './workspaceGeneratorConfig'
import generator from '../../generator'
import log from '../../utils/log'
import isCWDWorkspaceRootFolder from '../../utils/isCWDWorkspaceRootFolder'
import { TCreateCommand, GeneratorConfig } from '../../../types'

/**
 * Commander action used to generate a multipack "workspace" or "package"
 * @param createType - defines what you want to create "workspace" or "package"
 */
const createCommand: TCreateCommand = async createType => {
  if (!['workspace', 'package'].includes(createType)) {
    log.error(
      `You can only use this command to create a new "${[
        'workspace',
        'package',
      ].join('" or "')}" but not "${createType}"`,
    )
    return
  }

  if (createType === 'package' && !isCWDWorkspaceRootFolder()) {
    log.error(
      'Current working directory is not a multipack workspace. Please run this command only in root folder of a multipack workspace.',
    )
    return
  }

  const generatorConfigs: { [key: string]: GeneratorConfig } = {
    package: packageGeneratorConfig,
    workspace: workspaceGeneratorConfig,
  }

  await generator(generatorConfigs[createType])
}

export default createCommand
