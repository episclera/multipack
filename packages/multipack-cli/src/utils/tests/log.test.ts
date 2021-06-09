import log from '../log'

describe('log', () => {
  it('Should log correct all message types', () => {
    const spy = jest.spyOn(console, 'log')
    const message = 'test message from multipack-cli'
    log.info(message)
    log.error(message)
    log.warning(message)
    log.success(message)

    // Using regexp due to chalk characters in the received string
    expect(spy.mock.calls[0][0]).toMatch(new RegExp(`Info:.* ${message}`))
    expect(spy.mock.calls[1][0]).toMatch(new RegExp(`Error:.* ${message}`))
    expect(spy.mock.calls[2][0]).toMatch(new RegExp(`Warning:.* ${message}`))
    expect(spy.mock.calls[3][0]).toMatch(new RegExp(`Success:.* ${message}`))
  })

  it('Should log correct message when message type is Error and not to duplicate the Error word', () => {
    const spy = jest.spyOn(console, 'log')
    const message = 'test message from multipack-cli'
    log.error(new Error(message))

    // Using regexp due to chalk characters in the received string
    expect(spy.mock.calls[0][0]).toMatch(new RegExp(`Error:.* ${message}`))
    // Check Error word duplication
    expect(spy.mock.calls[0][0]).not.toMatch(
      new RegExp(`Error:.*Error: ${message}`),
    )
  })
})
