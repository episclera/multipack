/* istanbul ignore file */
import { WebpackConfigPart } from '../types'

/* istanbul ignore next */
const packageWebpackConfig: WebpackConfigPart = {
  output: {
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  externals: {
    /**
     * Don't bundling these packages because these packages will be used as a peerDependencies and
     * imported from the client which should install these by himself.
     * 
     * Thats needed to avoid multiple versions of these packages in the same client bundle.
     */
    react: 'react',
    'react-dom': 'react-dom',
  },
}

/* istanbul ignore next */
export default packageWebpackConfig
