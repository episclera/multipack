export interface LintStagedConfig {
  '*': string[]
  '*.(ts|tsx|d.ts)': string[]
  '*.(less)': string[]
}

// package exports
declare const lintStagedConfig: LintStagedConfig

export default lintStagedConfig
