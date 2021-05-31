import path from 'path'
import { Generator } from '../../../types'
import getTemplatesDirPath from '../../utils/getTemplatesDirPath'

/* istanbul ignore next */
const workspaceGenerator: Generator = {
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
    const newWorkspaceDir = path.join(process.cwd(), answers.workspaceName)
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
        files: path.join(newWorkspaceDir, '/*'),
        data: answers,
      },
      {
        type: 'rename',
        files: {
          [path.join(newWorkspaceDir, '_gitignore')]: path.join(
            newWorkspaceDir,
            '.gitignore',
          ),
          [path.join(newWorkspaceDir, '_package.json')]: path.join(
            newWorkspaceDir,
            'package.json',
          ),
          [path.join(newWorkspaceDir, '_tsconfig.json')]: path.join(
            newWorkspaceDir,
            'tsconfig.json',
          ),
          [path.join(newWorkspaceDir, '_lerna.json')]: path.join(
            newWorkspaceDir,
            'lerna.json',
          ),
          [path.join(newWorkspaceDir, '_github')]: path.join(
            newWorkspaceDir,
            '.github',
          ),
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

export default workspaceGenerator
