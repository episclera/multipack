/* istanbul ignore file */
import path from 'path'
import { WebpackConfigPart } from '../types'

/* istanbul ignore next */
const commonWebpackConfig: WebpackConfigPart = {
  entry: {
    index: path.resolve(process.cwd(), './src/index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), './build'),
  },
  mode: process.env.NODE_ENV,
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'], // [js and jsx] are added just to resolve correct non TS (files, libraries etc.)
  },
}

/* istanbul ignore next */
export default commonWebpackConfig
