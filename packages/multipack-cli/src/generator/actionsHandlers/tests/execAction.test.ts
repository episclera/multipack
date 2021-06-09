import execAction from '../execAction'

describe('execAction', () => {
  it('Should output the command result', async () => {
    const spy = jest.spyOn(console, 'log')

    await execAction({
      type: 'exec',
      command: 'exit 0',
    })

    expect(spy.mock.calls[0][0]).toMatch(
      'Output after running command "exit 0"',
    )
  })

  it('Should return an error if provided command failed', async () => {
    const actionResult = await execAction({
      type: 'exec',
      command: 'exit 1',
    })

    expect(actionResult[0]).toHaveProperty('error', expect.any(Error))
    expect(actionResult).toHaveLength(1)
  })

  it('Should return no error if provided command passed', async () => {
    const actionResult = await execAction({
      type: 'exec',
      command: 'exit 0',
    })

    expect(actionResult[0]).toHaveProperty('error', false)
    expect(actionResult).toHaveLength(1)
  })
})
