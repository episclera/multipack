import matchRule from '../matchRule'

describe('matchRule', () => {
  it('Should return no errors if provided patterns match file content', async () => {
    const ruleResult = await matchRule({
      type: 'match',
      name: 'match-pattern',
      description: 'test description',
      patterns: [/describe/],
      files: [__filename],
    })

    expect(ruleResult[0]).toHaveProperty('error', false)
    expect(ruleResult).toHaveLength(1)
  })

  it("Should return an error if provided patterns doesn't match file content", async () => {
    const ruleResult = await matchRule({
      type: 'match',
      name: 'match-pattern',
      description: 'test description',
      patterns: [/^[0-9]anytimeNotMatchingPattern[0-9]$/],
      files: [__filename],
    })

    expect(ruleResult[0]).toHaveProperty('error', expect.any(Error))
    expect(ruleResult).toHaveLength(1)
  })

  it('Should return correct error using description as a function', async () => {
    const ruleResult = await matchRule({
      type: 'match',
      name: 'match-pattern',
      description: ({ notMatchingPatterns, fileName, patterns }) =>
        `Checking if ${fileName} matches ${patterns.map(
          pattern => pattern.source,
        )}. Found un-matching patterns ${notMatchingPatterns.map(
          pattern => pattern.source,
        )}`,
      patterns: [/^[0-9]anytimeNotMatchingPattern[0-9]$/],
      files: [__filename],
    })

    expect(ruleResult[0]).toHaveProperty(
      'error',
      new Error(
        `[match/match-pattern] - Checking if ${__filename} matches ^[0-9]anytimeNotMatchingPattern[0-9]$. Found un-matching patterns ^[0-9]anytimeNotMatchingPattern[0-9]$`,
      ),
    )
    expect(ruleResult).toHaveLength(1)
  })

  it("Should return an error if provided files doesn't exists and can not read content from it", async () => {
    const ruleResult = await matchRule({
      type: 'match',
      name: 'match-pattern',
      description: 'test description',
      patterns: [/^[0-9]anytimeNotMatchingPattern[0-9]$/],
      files: ['./unknownFile.txt'],
    })

    expect(ruleResult[0]).toHaveProperty('error')
    expect(ruleResult).toHaveLength(1)
  })
})
