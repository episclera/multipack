import template from 'lodash.template'
import templateSettings from 'lodash.templatesettings'
import { replaceInFile } from 'replace-in-file'
import cliSpinner from '../../utils/cliSpinner'
import { TTransformAction, GeneratorActionResult } from '../../../types'

/**
 * Used to run transform actions
 * @param action - represents a transform action from generator config actions
 */
/* istanbul ignore next */
const transformAction: TTransformAction = async ({
  type,
  data,
  ...modifyOptions
}) => {
  const actionResult: GeneratorActionResult = await new Promise(resolve => {
    const spinner = cliSpinner(
      `Transforming files "${modifyOptions.files}" using provided data`,
    ).start()
    const from = templateSettings.interpolate
    const to = (match: string) => template(match)(data)

    replaceInFile({ ...modifyOptions, from, to }, error => {
      if (error) {
        spinner.fail()
        resolve({ error })
      } else {
        spinner.succeed()
        resolve({ error: false })
      }
    })
  })

  return [actionResult]
}

export default transformAction
