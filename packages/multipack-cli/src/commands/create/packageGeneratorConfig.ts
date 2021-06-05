import path from 'path'
import { readJSONSync } from 'fs-extra'
import { GeneratorConfig } from '../../../types'
import getTemplatesDirPath from '../../utils/getTemplatesDirPath'

/* istanbul ignore next */
const packageGeneratorConfig: GeneratorConfig = {
  prompts: [
    {
      type: 'select',
      name: 'packageType',
      required: true,
      message: 'What to create in the workspace (Use arrow keys)',
      initial: 'module',
      choices: ['module', 'react', 'web', 'api', 'cli'],
    },
    {
      type: 'input',
      name: 'packageName',
      required: true,
      message: 'Workspace name',
      initial: 'my-package',
    },
    {
      type: 'input',
      name: 'packageDescription',
      required: true,
      message: 'Workspace description',
      initial: 'Enjoyable tool for programmers',
    },
  ],
  actions: answers => {
    const newPackageDir = path.join(
      process.cwd(),
      './packages/',
      answers.packageName,
    )
    const pkg = readJSONSync(path.join(process.cwd(), 'package.json')) as {
      name: string
      author: {
        name: string
      }
    }

    const transformData = {
      ...answers,
      workspaceName: pkg.name,
      organizationName: pkg.author.name,
    }

    return [
      {
        // Note: removing .gitkeep if the workspace is new and /package folder is empty
        type: 'remove',
        files: [path.join(process.cwd(), './packages/.gitkeep')],
      },
      {
        type: 'copy',
        files: {
          [path.join(
            getTemplatesDirPath(),
            '/create/package/',
            answers.packageType,
          )]: newPackageDir,
        },
      },
      {
        type: 'transform',
        files: path.join(newPackageDir, '/*'),
        data: transformData,
      },
      {
        type: 'rename',
        files: {
          [path.join(newPackageDir, '_npmignore')]: path.join(
            newPackageDir,
            '.npmignore',
          ),
          [path.join(newPackageDir, '_package.json')]: path.join(
            newPackageDir,
            'package.json',
          ),
          [path.join(newPackageDir, '_tsconfig.json')]: path.join(
            newPackageDir,
            'tsconfig.json',
          ),
        },
      },
      {
        type: 'exec',
        command: 'npm i',
        cwd: newPackageDir,
      },
    ]
  },
}

export default packageGeneratorConfig
