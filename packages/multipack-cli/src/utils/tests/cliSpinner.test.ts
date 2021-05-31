import cliSpinner from '../cliSpinner'

describe('cliSpinner', () => {
  it('Should show an cli spinner with default loading message and yellow color', async () => {
    const spin = cliSpinner()
    spin.start()

    expect(spin.text).toBe('Loading...')
    expect(spin.color).toBe('yellow')

    await new Promise(resolve => {
      setTimeout(() => {
        spin.stop()
        resolve(true)
      }, 500)
    })

    expect(spin.isSpinning).toBeFalsy()
  })
})
