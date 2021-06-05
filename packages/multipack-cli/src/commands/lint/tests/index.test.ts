import lintCommand from '../index'

describe('lintCommand', () => {
  it('Should log an error if cwd is not workspace root folder', async () => {
    const spy = jest.spyOn(console, 'log')
    const spyCWD = jest.spyOn(process, 'cwd')
    spyCWD.mockReturnValue('./unknownPath')

    await lintCommand()

    expect(spy.mock.calls[0][0]).toMatch('Error')
    spy.mockClear()
    spyCWD.mockClear()
  })
})
