import { LinterConfig } from '../../../types'

/* istanbul ignore next */
const workspaceLinterConfig: LinterConfig = {
  rules: () => {
    return [
      {
        type: 'files-exists',
        name: 'multipack-structure',
        description: ({ fileName }) =>
          `"${fileName}" file is required to be present in a Multipack workspace`,
        files: ['./lerna.json', './package.json'],
      },
      {
        type: 'match',
        name: 'npm-workspace-scripts',
        description: ({ fileName, notMatchingPatterns }) =>
          `Following npm scripts ${notMatchingPatterns.map(
            pattern => `\n"${pattern.source}"`,
          )} \nare required to be present in your ${fileName} file`,
        patterns: [/build:packages/, /test:packages/],
        files: ['./package.json'],
      },
    ]
  },
}

export default workspaceLinterConfig
