import createCommand from '../index'

describe('createCommand', () => {
  it('Should log an error if createType is incorrect', async () => {
    const spy = jest.spyOn(console, 'log')

    await createCommand('test')

    expect(spy.mock.calls[0][0]).toMatch('Error')
  })

  it('Should log an error if createType is package and cwd is not workspace root folder', async () => {
    const spy = jest.spyOn(console, 'log')
    const spyCWD = jest.spyOn(process, 'cwd')
    spyCWD.mockReturnValue('./unknownPath')

    await createCommand('package')

    expect(spy.mock.calls[0][0]).toMatch('Error')
  })
})
