import { prompt } from 'enquirer'
import { TRunPrompts } from '../../types'

/**
 * Used to run generator config prompts
 * @param prompts - prompts to run
 */
const runPrompts: TRunPrompts = async prompts => {
  const answers = await prompt(prompts)

  return answers
}

export default runPrompts
