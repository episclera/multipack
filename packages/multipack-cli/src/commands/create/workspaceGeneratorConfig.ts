import path from 'path'
import { GeneratorConfig } from '../../../types'
import getTemplatesDirPath from '../../utils/getTemplatesDirPath'

/* istanbul ignore next */
const workspaceGeneratorConfig: GeneratorConfig = {
  prompts: [
    {
      type: 'input',
      name: 'workspaceName',
      required: true,
      message: 'Workspace name',
      initial: 'my-workspace',
    },
    {
      type: 'input',
      name: 'organizationName',
      required: true,
      message: 'Organization name',
      initial: 'my-organization',
    },
    {
      type: 'input',
      name: 'workspaceDescription',
      required: true,
      message: 'Workspace description',
      initial: 'Enjoyable tool for programmers',
    },
  ],
  actions: answers => {
    const newWorkspaceDir = `./${answers.workspaceName}`
    return [
      {
        type: 'copy',
        files: {
          [path.join(getTemplatesDirPath(), '/create/workspace/')]:
            newWorkspaceDir,
        },
      },
      {
        type: 'transform',
        files: `${newWorkspaceDir}/*`,
        data: answers,
      },
      {
        type: 'rename',
        files: {
          [`${newWorkspaceDir}/.husky/_gitignore`]: `${newWorkspaceDir}/.husky/.gitignore`,
          [`${newWorkspaceDir}/_gitignore`]: `${newWorkspaceDir}/.gitignore`,
          [`${newWorkspaceDir}/_package.json`]: `${newWorkspaceDir}/package.json`,
          [`${newWorkspaceDir}/_tsconfig.json`]: `${newWorkspaceDir}/tsconfig.json`,
          [`${newWorkspaceDir}/_lerna.json`]: `${newWorkspaceDir}/lerna.json`,
          [`${newWorkspaceDir}/_github`]: `${newWorkspaceDir}/.github`,
        },
      },
      {
        type: 'exec',
        command: 'git init',
        cwd: newWorkspaceDir,
      },
      {
        type: 'exec',
        command: 'npm i',
        cwd: newWorkspaceDir,
      },
    ]
  },
}

export default workspaceGeneratorConfig
