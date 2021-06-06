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
    const newPackageDir = `./packages/${answers.packageName}`
    const pkg = readJSONSync('./package.json') as {
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
        files: ['./packages/.gitkeep'],
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
        files: `${newPackageDir}/*`,
        data: transformData,
      },
      {
        type: 'rename',
        files: {
          [`${newPackageDir}/_npmignore`]: `${newPackageDir}/.npmignore`,
          [`${newPackageDir}/_package.json`]: `${newPackageDir}/package.json`,
          [`${newPackageDir}/_tsconfig.json`]: `${newPackageDir}/tsconfig.json`,
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
