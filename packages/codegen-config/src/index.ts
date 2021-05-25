import { CodeGenConfig } from '../types'

const codeGenConfig: CodeGenConfig = {
  schema: 'https://countries.trevorblades.com',
  generates: {
    './api-types.d.ts': {
      plugins: [
        {
          add: {
            content: '/* ---- Auto generated file by GraphQL CodeGen ---- */',
          },
        },
        { add: { content: '/* eslint-disable */' } },
        'typescript',
      ],
    },
  },
}

export default codeGenConfig
