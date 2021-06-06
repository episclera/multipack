import runRules from '../runRules'

describe('runRules', () => {
  it('Should return no errors if provided rules passed', async () => {
    const ruleResult = await runRules([
      {
        type: 'files-exists',
        name: 'access-file',
        description: 'test description',
        files: [__filename],
      },
      {
        type: 'match',
        name: 'match-pattern',
        description: 'test description',
        patterns: [/describe/],
        files: [__filename],
      },
    ])

    expect(ruleResult[0]).toHaveProperty('error', false)
    expect(ruleResult[1]).toHaveProperty('error', false)
    expect(ruleResult).toHaveLength(2)
  })

  it('Should return only errors if provided rules failed', async () => {
    const ruleResult = await runRules([
      {
        type: 'files-exists',
        name: 'access-file',
        description: 'test description',
        files: ['./unknownFile.txt'],
      },
      {
        type: 'match',
        name: 'match-pattern',
        description: 'test description',
        patterns: [/^[0-9]anytimeNotMatchingPattern[0-9]$/],
        files: [__filename],
      },
    ])

    expect(ruleResult[0]).toHaveProperty('error', expect.any(Error))
    expect(ruleResult[1]).toHaveProperty('error', expect.any(Error))
    expect(ruleResult).toHaveLength(2)
  })
})
