export interface CodeGenConfig {
  schema: string
  generates: {
    './api-types.d.ts': { [key: string]: any }
  }
}

// package exports
declare const codeGenConfig: CodeGenConfig

export default codeGenConfig
