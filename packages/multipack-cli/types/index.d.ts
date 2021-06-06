import { CommanderError, OutputConfiguration } from 'commander'
import Enquirer from 'enquirer'
import ora from 'ora'
import execa from 'execa'
import { ReplaceInFileConfig } from 'replace-in-file'

// generator
export interface GeneratorPromptAnswers {
  [key: string]: any
}

export interface GeneratorConfigBasePrompt {
  name: string | (() => string)
  type: string | (() => string)
  message: string | (() => string) | (() => Promise<string>)
  initial?: any
  required?: boolean
  format?(value: string): string | Promise<string>
  result?(value: string): string | Promise<string>
  skip?:
    | ((state: { [key: string]: any }) => boolean | Promise<boolean>)
    | boolean
  validate?(
    value: string,
  ): boolean | Promise<boolean> | string | Promise<string>
  onSubmit?(
    name: string,
    value: any,
    prompt: Enquirer.Prompt,
  ): boolean | Promise<boolean>
  onCancel?(
    name: string,
    value: any,
    prompt: Enquirer.Prompt,
  ): boolean | Promise<boolean>
  stdin?: NodeJS.ReadStream
  stdout?: NodeJS.WriteStream
}

export interface GeneratorConfigInputPrompt extends GeneratorConfigBasePrompt {
  type: 'input' | (() => 'input')
}

export interface GeneratorConfigSelectPrompt extends GeneratorConfigBasePrompt {
  type: 'select' | (() => 'select')
  choices: string[]
}

export type GeneratorConfigPrompt =
  | GeneratorConfigInputPrompt
  | GeneratorConfigSelectPrompt

export interface GeneratorConfigActionBase {
  files: {
    [key: string]: string
  }
}

export interface GeneratorConfigCopyAction extends GeneratorConfigActionBase {
  type: 'copy'
}

export interface GeneratorConfigMoveAction extends GeneratorConfigActionBase {
  type: 'move'
}

export interface GeneratorConfigRenameAction extends GeneratorConfigActionBase {
  type: 'rename'
}

export interface GeneratorConfigRemoveAction {
  type: 'remove'
  files: string[]
}

export interface GeneratorConfigModifyAction extends ReplaceInFileConfig {
  type: 'modify'
}

export interface GeneratorConfigTransformAction
  extends Partial<ReplaceInFileConfig> {
  type: 'transform'
  files: ReplaceInFileConfig['files']
  data: { [key: string]: string }
}

export interface GeneratorConfigExecAction extends execa.Options {
  type: 'exec'
  command: string
}

export type GeneratorConfigAction =
  | GeneratorConfigCopyAction
  | GeneratorConfigRenameAction
  | GeneratorConfigRemoveAction
  | GeneratorConfigMoveAction
  | GeneratorConfigModifyAction
  | GeneratorConfigTransformAction
  | GeneratorConfigExecAction

export interface GeneratorActionResult {
  error: boolean | Error
}

export interface GeneratorConfig {
  prompts?: GeneratorConfigPrompt[]
  actions:
    | GeneratorConfigAction[]
    | ((answers: GeneratorPromptAnswers) => GeneratorConfigAction[])
}

// generator actions handlers
export type TCopyAction = (
  action: GeneratorConfigCopyAction,
) => Promise<GeneratorActionResult[]>

export type TRenameAction = (
  action: GeneratorConfigRenameAction,
) => Promise<GeneratorActionResult[]>

export type TMoveAction = (
  action: GeneratorConfigMoveAction,
) => Promise<GeneratorActionResult[]>

export type TRemoveAction = (
  action: GeneratorConfigRemoveAction,
) => Promise<GeneratorActionResult[]>

export type TModifyAction = (
  action: GeneratorConfigModifyAction,
) => Promise<GeneratorActionResult[]>

export type TTransformAction = (
  action: GeneratorConfigTransformAction,
) => Promise<GeneratorActionResult[]>

export type TExecAction = (
  action: GeneratorConfigExecAction,
) => Promise<GeneratorActionResult[]>

// generator methods
export type TGenerator = (generatorConfig: GeneratorConfig) => Promise<void>

export type TRunPrompts = (
  prompts: GeneratorConfigPrompt[],
) => Promise<GeneratorPromptAnswers>

export type TRunActions = (actions: GeneratorConfigAction[]) => Promise<void>

// linter
export interface LinterConfigBaseRule {
  name: string
  files: string[]
}

export interface LinterConfigFilesExistsRule extends LinterConfigBaseRule {
  type: 'files-exists'
  description: string | ((descriptionContext: { fileName: string }) => string)
}

export interface LinterConfigMatchRule extends LinterConfigBaseRule {
  type: 'match'
  patterns: RegExp[]
  description:
    | string
    | ((descriptionContext: {
        fileName: string
        patterns: RegExp[]
        notMatchingPatterns: RegExp[]
      }) => string)
}

export type LinterConfigRule =
  | LinterConfigFilesExistsRule
  | LinterConfigMatchRule

export interface LinterRuleResult {
  error: boolean | Error
}
export interface LinterConfig {
  rules: LinterConfigRule[] | (() => LinterConfigRule[])
}

// linter rules handlers
export type TFilesExistsRule = (
  rule: LinterConfigFilesExistsRule,
) => Promise<LinterRuleResult[]>

// linter rules handlers
export type TMatchRule = (
  rule: LinterConfigMatchRule,
) => Promise<LinterRuleResult[]>

// linter methods
export type TRunRules = (rules: LinterConfigRule[]) => Promise<void>

export type TLinter = (linterConfig: LinterConfig) => Promise<void>

// commands
export type TCreateCommand = (createType: string) => Promise<void>

export type TLintCommand = () => Promise<void>

// utils
export type TIsCWDWorkspaceRootFolder = () => boolean

export type TGetTemplatesDirPath = () => string

export type TGetEndValueFromAny = (rawValue: any, ...fnArgs: any[]) => any

export interface Log {
  info: (message: string) => void
  error: (errorMessage: string | Error) => void
  warning: (message: string) => void
  success: (message: string) => void
}

export type TCLISpinner = (message?: string) => ora.Ora

// main
export type TInitCli = (
  args?: string[],
  override?: {
    exitOverride?: (err: CommanderError) => never | void
    configureOutput?: OutputConfiguration
  },
) => void

export interface MultipackCli {
  initCli: TInitCli
}

// package exports
export const initCli: TInitCli

declare const multipackCli: MultipackCli

export default multipackCli
