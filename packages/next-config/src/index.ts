/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import withPlugins from 'next-compose-plugins'
import withAntdLess from 'next-plugin-antd-less'
import { i18n } from '@episclera/next-i18next-config'
import { mergeConfigs } from '@episclera/multipack-utils'
import { NextConfig } from '../types'

const nextConfig: NextConfig = (plugins = [], config = {}) => {
  const { webpack: webpackToMerge, ...configToMerge } = config

  return (withPlugins as NextConfig)(
    [[withAntdLess], ...plugins],
    mergeConfigs(
      {
        i18n,
        eslint: {
          /**
           * By default from next 11 this property is false which try to run eslint before the build
           * which is wrong giving that builds happens only in master branch but CI in development branches
           * and this property will consume CI/CD time and resource
           * Plus in CI eslint has a separate command and we don't want to have twice runs of eslint because that doesn't make sense
           */
          ignoreDuringBuilds: true,
        },
        webpack: (nextWebpackConfig: { [key: string]: any }) => {
          const customWebpackConfig = mergeConfigs(nextWebpackConfig, {
            module: {
              rules: [
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ...(nextWebpackConfig?.module?.rules || []),
                {
                  test: /.svg$/,
                  use: [
                    {
                      loader: '@svgr/webpack',
                      options: {
                        svgoConfig: {
                          pretty: true,
                          multipass: true,
                          plugins: [
                            { removeViewBox: false },
                            { removeAttrs: { attrs: '(width|height)' } },
                          ],
                        },
                      },
                    },
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                        name: '[name]-[hash].[ext]',
                        publicPath: '/_next/static',
                        outputPath: 'static',
                      },
                    },
                  ],
                },
              ],
            },
          })

          /**
           * Merging user webpack config if is provided with the next.js webpack config
           */
          if (webpackToMerge) {
            return webpackToMerge(customWebpackConfig)
          }

          return customWebpackConfig
        },
      },
      configToMerge,
    ),
  )
}

export default nextConfig
