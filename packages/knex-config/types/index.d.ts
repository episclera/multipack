export interface KnexConfig {
  client: 'pg' | 'sqlite3'
  connection:
    | {
        user: string
        host: string
        password: string
        port: string
        database: string
      }
    | {
        filename: string
      }
  /**
   * Basically needed for sqlite because it can't insert values as defaults
   */
  useNullAsDefault?: boolean
}

// package exports
declare const knexConfig: KnexConfig

export default knexConfig
