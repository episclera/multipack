import path from 'path'
import { readFileSync, existsSync } from 'fs'
import get from 'lodash.get'
import { parse } from 'dotenv'
import { KnexConfig } from '../types'

/**
 * Using lodash.get because webpack for some reason replace process.env properties with values at build time even if wp mode is node
 */
const developmentEnvFilePath = path.join(process.cwd(), './.env.development')
const testEnvFilePath = path.join(process.cwd(), './.env.test')
/**
 * Using parse from dotenv instead of config because we don't want to override something from process.env
 */
const parsedDevelopmentEnvs = parse(
  existsSync(developmentEnvFilePath)
    ? readFileSync(developmentEnvFilePath)
    : '',
)
const parsedTestEnvs = parse(
  existsSync(testEnvFilePath) ? readFileSync(testEnvFilePath) : '',
)
/**
 * Migrations and seeds paths and conditions are the same for all envs
 */
const migrationsAndSeedsOptions = {
  migrations: {
    directory: path.join(process.cwd(), './db/migrations'),
  },
  seeds: {
    directory: path.join(process.cwd(), './db/seeds'),
  },
}

const knexConfig: KnexConfig = {
  /**
   * Default connection for development node_env using pg connection from .env.development file
   */
  client: 'pg',
  connection: {
    host: parsedDevelopmentEnvs.DATABASE_HOST,
    port: parsedDevelopmentEnvs.DATABASE_PORT,
    user: parsedDevelopmentEnvs.DATABASE_USERNAME,
    password: parsedDevelopmentEnvs.DATABASE_PASSWORD,
    database: parsedDevelopmentEnvs.DATABASE_NAME,
  },
  /**
   * Connection for production node_env using pg connection from higher level env vars exported globally
   */
  production: {
    client: 'pg',
    connection: {
      host: get(process, 'env.DATABASE_HOST') as string,
      port: get(process, 'env.DATABASE_PORT') as string,
      user: get(process, 'env.DATABASE_USERNAME') as string,
      password: get(process, 'env.DATABASE_PASSWORD') as string,
      database: get(process, 'env.DATABASE_NAME') as string,
    },
    ...migrationsAndSeedsOptions,
  },
  /**
   * Connection for test node_env using sqlite3 connection from .env.test file
   */
  test: {
    client: 'sqlite3',
    connection: {
      filename: parsedTestEnvs.DATABASE_FILENAME,
    },
    ...migrationsAndSeedsOptions,
  },
  ...migrationsAndSeedsOptions,
}

export default knexConfig
