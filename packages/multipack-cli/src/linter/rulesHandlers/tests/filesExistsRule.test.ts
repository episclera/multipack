import filesExistsRule from '../filesExistsRule'

describe('filesExistsRule', () => {
  it('Should return no errors if provided file exists', async () => {
    const ruleResult = await filesExistsRule({
      type: 'files-exists',
      name: 'access-file',
      description: 'test description',
      files: [__filename],
    })

    expect(ruleResult[0]).toHaveProperty('error', false)
    expect(ruleResult).toHaveLength(1)
  })

  it("Should return an error if provided file doesn't exists", async () => {
    const ruleResult = await filesExistsRule({
      type: 'files-exists',
      name: 'access-file',
      description: 'test description',
      files: ['./unknownFile.txt'],
    })

    expect(ruleResult[0]).toHaveProperty('error', expect.any(Error))
    expect(ruleResult).toHaveLength(1)
  })

  it('Should return correct error using description as a function', async () => {
    const ruleResult = await filesExistsRule({
      type: 'files-exists',
      name: 'access-file',
      description: ({ fileName }) => `Checking if ${fileName} exists`,
      files: ['./unknownFile.txt'],
    })

    expect(ruleResult[0]).toHaveProperty(
      'error',
      new Error(
        '[files-exists/access-file] - Checking if ./unknownFile.txt exists',
      ),
    )
    expect(ruleResult).toHaveLength(1)
  })
})
