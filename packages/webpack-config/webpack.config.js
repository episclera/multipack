/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/**
 * Unfortunately here I can't use @multipack/webpack-config due to dependencies cycle
 */
module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    library: 'webpackConfig',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this',
  },
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
