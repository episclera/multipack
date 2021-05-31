import isCWDWorkspaceRootFolder from '../isCWDWorkspaceRootFolder'

describe('isCWDWorkspaceRootFolder', () => {
  it('Should return true because current script is running in a workspace cwd', () => {
    expect(isCWDWorkspaceRootFolder()).toBeTruthy()
  })

  it('Should return false if current script is running outside a workspace cwd', () => {
    const spyCWD = jest.spyOn(process, 'cwd')
    spyCWD.mockReturnValue('./unknownPath')

    expect(isCWDWorkspaceRootFolder()).toBeFalsy()
    spyCWD.mockClear()
  })
})
