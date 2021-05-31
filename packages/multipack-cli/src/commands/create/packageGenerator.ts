import { Generator } from '../../../types'

/* istanbul ignore next */
const packageGenerator: Generator = {
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
      message: 'Package name',
      initial: 'my-package',
    },
    {
      type: 'input',
      name: 'packageDescription',
      required: true,
      message: 'Package description (e.g, Enjoyable library)',
      initial: 'Enjoyable tool for programmers',
    },
  ],
  actions: [],
}

export default packageGenerator
