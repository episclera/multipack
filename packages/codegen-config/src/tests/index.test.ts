import path from 'path'
import { writeFile, unlink } from 'fs/promises'

describe('codeGenConfig', () => {
  it('Should load .env file depending on NODE_ENV and read from there necessary properties to build in the end correct schema url if is a Next like project', async () => {
    const envFilePath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`)
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeFile(
      envFilePath,
      'NEXT_PUBLIC_API_URL = https://api.example.com',
    )

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const codeGenConfig = await import('../index')

    expect(codeGenConfig.default.schema).toBe('https://api.example.com/graphql')
    await unlink(envFilePath)
  })

  it('Should load .env file depending on NODE_ENV and read from there necessary properties to build in the end correct schema url if is a Strapi like project', async () => {
    const envFilePath = path.join(__dirname, `./.env.${process.env.NODE_ENV}`)
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue(__dirname)

    await writeFile(envFilePath, 'HOST = 0.0.0.0\nPORT = 3005')

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const codeGenConfig = await import('../index')

    expect(codeGenConfig.default.schema).toBe('0.0.0.0:3005/graphql')
    await unlink(envFilePath)
  })

  it('Should not throw errors if .env file are not found and also should return a default schema url using Strapi defaults', async () => {
    const spyCwd = jest.spyOn(process, 'cwd')
    spyCwd.mockReturnValue('./unknownPath')

    // Importing it dynamically because .env file also is created dynamically in this test and it can't read it initially
    const codeGenConfig = await import('../index')

    expect(codeGenConfig.default.schema).toBe('0.0.0.0:3001/graphql')
  })
})
