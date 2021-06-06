import linter from '../index'

describe('linter', () => {
  it('Should exit with error code 1 if some rule failed', async () => {
    const spy = jest.spyOn(process, 'exit').mockImplementation()

    await linter({
      rules: [
        {
          type: 'match',
          name: 'match-pattern',
          description: 'test description',
          patterns: [/^[0-9]anytimeNotMatchingPattern[0-9]$/],
          files: [__filename],
        },
      ],
    })

    expect(spy).toHaveBeenCalledWith(1)
    spy.mockClear()
  })

  it('Should call rules argument as a function to get end rules', async () => {
    const mockRulesFn = jest.fn().mockReturnValue([])

    await linter({ rules: mockRulesFn })

    expect(mockRulesFn).toHaveBeenCalled()
  })
})
