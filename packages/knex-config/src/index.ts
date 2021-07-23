import path from 'path'
import { readFileSync, existsSync } from 'fs'
import get from 'lodash.get'
import { parse } from 'dotenv'
import { KnexConfig } from '../types'

/**
 * Using lodash.get because webpack for some reason replace process.env properties with values at build time even if wp mode is node
 *
 * Default fallback to development .env
 */
const processNodeEnv = get(process, 'env.NODE_ENV', 'development') as string
const envFilePath = path.join(process.cwd(), `./.env.${processNodeEnv}`)
/**
 * Using parse from dotenv instead of config because we don't want to override something from process.env
 */
const parsedEnvs = parse(
  existsSync(envFilePath) ? readFileSync(envFilePath) : '',
)

const knexConfig: KnexConfig = {
  /**
   * In development and production mode are used pg connection
   * In test mode are used sqlite 3 to be possible to create and delete db on each test run
   */
  client: processNodeEnv !== 'test' ? 'pg' : 'sqlite3',
  connection:
    processNodeEnv !== 'test'
      ? {
          host: get(
            process,
            'env.DATABASE_HOST',
            parsedEnvs.DATABASE_HOST,
          ) as string,
          port: get(
            process,
            'env.DATABASE_PORT',
            parsedEnvs.DATABASE_PORT,
          ) as string,
          user: get(
            process,
            'env.DATABASE_USERNAME',
            parsedEnvs.DATABASE_USERNAME,
          ) as string,
          password: get(
            process,
            'env.DATABASE_PASSWORD',
            parsedEnvs.DATABASE_PASSWORD,
          ) as string,
          database: get(
            process,
            'env.DATABASE_NAME',
            parsedEnvs.DATABASE_NAME,
          ) as string,
          /**
           * Needed because some DB providers like Heroku Postgresql doesn't allow non SSL connection
           */
          ssl: { rejectUnauthorized: false },
        }
      : {
          /**
           * If is needed a custom DB name then DATABASE_FILENAME env var should be used
           * otherwise it will generate each time a new DB name
           * that's needed because sqlite connection is used only in tests and there exists a
           * possibility that one test can DROP the DB and another will fail due to this fact
           *
           * Note: Knex only can create DB files in existing directories
           */
          filename: path.join(
            process.cwd(),
            parsedEnvs.DATABASE_FILENAME || `./${+new Date()}_test_db.sql`,
          ),
        },
  /**
   * Basically needed for sqlite because it can't insert values as defaults
   */
  ...(processNodeEnv === 'test' ? { useNullAsDefault: true } : {}),
}

export default knexConfig
