import { CommanderError, OutputConfiguration } from 'commander'
import Enquirer from 'enquirer'
import ora from 'ora'
import execa from 'execa'
import { ReplaceInFileConfig } from 'replace-in-file'

// commands
export type TCreateCommand = (
  createType: string,
  mock?: boolean,
) => Promise<void>

// utils
export type TIsCWDWorkspaceRootFolder = () => boolean

export type TGetTemplatesDirPath = () => string

export type TGetEndValueFromAny = (rawValue: any, ...fnArgs: any[]) => any

export interface Log {
  info: (message: string) => void
  error: (message: string | Error) => void
  warning: (message: string) => void
  success: (message: string) => void
}

export type TCLISpinner = (message?: string) => ora.Ora

// generator
export interface GeneratorAnswers {
  [key: string]: any
}

export interface GeneratorBasePrompt {
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

export interface GeneratorInputPrompt extends GeneratorBasePrompt {
  type: 'input' | (() => 'input')
}

export interface GeneratorSelectPrompt extends GeneratorBasePrompt {
  type: 'select' | (() => 'select')
  choices: string[]
}

export type GeneratorPrompt = GeneratorInputPrompt | GeneratorSelectPrompt

export interface GeneratorActionBase {
  files: {
    [key: string]: string
  }
}

export interface GeneratorCopyAction extends GeneratorActionBase {
  type: 'copy'
}

export interface GeneratorMoveAction extends GeneratorActionBase {
  type: 'move'
}

export interface GeneratorRenameAction extends GeneratorActionBase {
  type: 'rename'
}

export interface GeneratorRemoveAction {
  type: 'remove'
  files: string[]
}

export interface GeneratorModifyAction extends ReplaceInFileConfig {
  type: 'modify'
}

export interface GeneratorTransformAction extends Partial<ReplaceInFileConfig> {
  type: 'transform'
  files: ReplaceInFileConfig['files']
  data: { [key: string]: string }
}

export interface GeneratorExecAction extends execa.Options {
  type: 'exec'
  command: string
}

export type GeneratorAction =
  | GeneratorCopyAction
  | GeneratorRenameAction
  | GeneratorRemoveAction
  | GeneratorMoveAction
  | GeneratorModifyAction
  | GeneratorTransformAction
  | GeneratorExecAction

export interface ActionResult {
  error: boolean | Error
}

export interface Generator {
  prompts?: GeneratorPrompt[]
  actions:
    | GeneratorAction[]
    | ((answers: GeneratorAnswers) => GeneratorAction[])
}

// generator methods
export type TRunGenerator = (generator: Generator) => Promise<void>

export type TRunPrompts = (
  prompts: GeneratorPrompt[],
) => Promise<GeneratorAnswers>

export type TRunActions = (actions: GeneratorAction[]) => Promise<void>

// generator actions handlers
export type TCopyAction = (
  actions: GeneratorCopyAction,
) => Promise<ActionResult[]>

export type TRenameAction = (
  actions: GeneratorRenameAction,
) => Promise<ActionResult[]>

export type TMoveAction = (
  actions: GeneratorMoveAction,
) => Promise<ActionResult[]>

export type TRemoveAction = (
  actions: GeneratorRemoveAction,
) => Promise<ActionResult[]>

export type TModifyAction = (
  actions: GeneratorModifyAction,
) => Promise<ActionResult[]>

export type TTransformAction = (
  actions: GeneratorTransformAction,
) => Promise<ActionResult[]>

export type TExecAction = (
  actions: GeneratorExecAction,
) => Promise<ActionResult[]>

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
