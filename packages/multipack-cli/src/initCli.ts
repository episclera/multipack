import path from 'path'
import { program } from 'commander'
import { readJSONSync } from 'fs-extra'
import createCommand from './commands/create'
import { TInitCli } from '../types'

/**
 * Used as entry point to initialize multipack Command line interface
 * @param args - process argv
 * @param override - used to override program exit behavior or output target
 */
const initCli: TInitCli = (args = process.argv, override) => {
  // NOTE: this statement is needed for testing purposes to override default process.exit and output target
  if (override) {
    if ('exitOverride' in override) {
      program.exitOverride(override.exitOverride)
    }
    if (override.configureOutput) {
      program.configureOutput(override.configureOutput)
    }
  }

  // Note: reading pkg using fs because if importing it then the version will not be dynamic but one from build step but not the one after publish step
  const pkg = readJSONSync(path.join(__dirname, '../package.json')) as {
    [key: string]: any
  }

  program.version(pkg.version)

  program
    .command('create <type>')
    .description(
      'Creates a multipack workspace or a package in an existent multipack workspace',
    )
    .action(async createType => {
      await createCommand(createType)
    })

  program.parse(args)
}

export default initCli
