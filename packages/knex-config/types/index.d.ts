export interface PGConnection {
  user: string
  host: string
  password: string
  port: string
  database: string
  ssl: { rejectUnauthorized: boolean }
}

export interface SQLiteConnection {
  filename: string
}

export interface KnexConfig {
  client: 'pg' | 'sqlite3'
  connection: PGConnection | SQLiteConnection
  /**
   * Basically needed for sqlite because it can't insert values as defaults
   */
  useNullAsDefault?: boolean
}

// package exports
declare const knexConfig: KnexConfig

export default knexConfig
