export interface KnexConfigDbSettings {
  client: 'pg'
  connection: {
    user: string
    host: string
    password: string
    port: string
    database: string
  }
  migrations: {
    directory: string
  }
  seeds: {
    directory: string
  }
}

export interface KnexConfig extends KnexConfigDbSettings {
  production: KnexConfigDbSettings
  test: {
    client: 'sqlite3'
    connection: {
      filename: string
    }
    migrations: KnexConfigDbSettings['migrations']
    seeds: KnexConfigDbSettings['seeds']
  }
}

// package exports
declare const knexConfig: KnexConfig

export default knexConfig
