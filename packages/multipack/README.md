<div align="center">
  <a href="https://episclera.github.io/multipack/">
  <img style="max-width:100%;" height="200"
    src="https://raw.githubusercontent.com/episclera/multipack/master/logo.png">
  </a>
  <h1>
      multipack
  </h1>
  <p> 🔱 All in one tool for monorepos.</p>
  <p>
    <a href="https://episclera.github.io/multipack/">Site</a>
    | <a href="https://episclera.github.io/multipack/docs/doc-introduction">Getting Started</a>
    | <a href="https://episclera.github.io/multipack/docs/doc-api-introduction">API</a>
    | <a href="https://episclera.github.io/multipack/blog/">Blog</a>
  </p>
</div>

[![GitHub](https://img.shields.io/github/license/episclera/multipack)](https://github.com/episclera/multipack/blob/master/LICENSE)
[![Multipack](https://img.shields.io/badge/Generated%20from-episclera%2Fmultipack-green)](https://github.com/episclera/multipack)

## Features

- Manage, Configure and Create monorepo projects which follows Multipack standarts.
- Manage and configure code style linters.
- Manage and configure test and linting processes for monorepos.
- Manage and configure `Github workflow actions` for monorepos.

## Getting started.

Install: `npm i -g @episclera/multipack`

## Usage

#### `multipack new workspace` - Create a new monorepo following Multipack standarts

```sh
? Workspace name (e.g., name)     happyworkspace
? Workspace organisation name (e.g., org name)     happyorg
```

#### `multipack new package` - Create a new package in the current workspace following Multipack standarts

```sh
? What to create in the workspace (Use arrow keys)
❯  module           [UMD package]
   cli              [CLI package]
   react            [React package]
   web              [Next.js app]
   api              [Strapi api]
```

## Multipack shared configs usage

#### With Prettier

In your `.prettierrc.js` file just put this content.

```js
const { prettierConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const prettierConfig = require('@episclera/prettier-config')

module.exports = prettierConfig
```

#### With Commitlint

In your `commitlint.config.js` file just put this content.

```js
const { commitlintConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const commitlintConfig = require('@episclera/commitlint-config')

module.exports = commitlintConfig
```

#### With Renovate

In your `renovate.json` file just put this content. (Do not forgot to connect/install renovate app on GitHub)

```json
{
  "extends": ["@episclera"]
}
```

#### With Jest

In your `jest.config.js` file just put this content.

```js
const { jestConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const jestConfig = require('@episclera/jest-config')

module.exports = jestConfig
```

#### With Eslint

In your `.eslintrc.js` file just put this content.

```js
const { eslintConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const eslintConfig = require('@episclera/eslint-config')

module.exports = eslintConfig
```

#### With Stylelint

In your `.stylelintrc.js` file just put this content.

```js
const { stylelintConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const stylelintConfig = require('@episclera/stylelint-config')

module.exports = stylelintConfig
```

#### With Babel

In your `.babelrc.js` file just put this content.

```js
const { commonBabelConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const { commonBabelConfig } = require('@episclera/babel-config')

module.exports = commonBabelConfig

// OR you can mix multiple configs with "mergeConfigs" util
const {
  commonBabelConfig,
  nextBabelConfig,
  mergeConfigs,
} = require('@episclera/multipack')
// OR install and import just what you need separately: const { commonBabelConfig, nextBabelConfig } = require('@episclera/babel-config')
// const { mergeConfigs } = require('@episclera/multipack-utils')

module.exports = mergeConfigs(commonBabelConfig, nextBabelConfig)
```

#### With Webpack

In your `webpack.config.js` file just put this content.

```js
const { commonWebpackConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const { commonWebpackConfig } = require('@episclera/webpack-config')

module.exports = commonWebpackConfig

// OR you can mix multiple configs with "mergeConfigs" util
const {
  commonWebpackConfig,
  packageWebpackConfig,
  mergeConfigs,
} = require('@episclera/multipack')
// OR install and import just what you need separately: const { commonWebpackConfig, packageWebpackConfig } = require('@episclera/webpack-config')
// const { mergeConfigs } = require('@episclera/multipack-utils')

module.exports = mergeConfigs(commonWebpackConfig, packageWebpackConfig)
```

#### With Postcss

In your `postcss.config.js` file just put this content.

```js
const { postcssConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const postcssConfig = require('@episclera/postcss-config')

module.exports = postcssConfig
```

#### With Tailwindcss

In your `tailwind.config.js` file just put this content.

```js
const { tailwindConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const tailwindConfig = require('@episclera/tailwind-config')

module.exports = tailwindConfig
```

#### With Next

Usage is similar to next-compose-plugins

In your `next.config.js` file just put this content.

```js
const { nextConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const nextConfig = require('@episclera/next-config')

module.exports = nextConfig()
```

OR if you want to provide custom plugins or next options or webpack options

```js
const { nextConfig } = require('@episclera/multipack')
const { mergeConfigs } = require('@episclera/multipack-utils')

module.exports = nextConfig([myPlugin], {
  publicRuntimeConfig: {
    HOME_ROUTE_PATH: '/welcome',
  },
  webpack: config =>
    mergeConfigs(config, {
      resolve: {
        alias: {
          myAlias: './myPath',
        },
      },
    }),
})
```

#### With NextI18Next

In your `next-i18next.config.js` file just put this content.

```js
const { nextI18NextConfig } = require('@episclera/multipack')
// OR install and import just what you need separately: const nextI18NextConfig = require('@episclera/next-i18next-config')

module.exports = nextI18NextConfig
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

#### Or you can sponsor via [Open Collective](https://opencollective.com/episclera/)

[![Open Collective](https://opencollective.com/episclera/tiers/sponsor.svg?avatarHeight=60)](https://opencollective.com/episclera/)

## Author

**[@episclera/multipack](https://github.com/episclera/multipack)** © [Episclera](https://github.com/episclera), Released under the [MIT](https://github.com/episclera/multipack/blob/master/LICENSE) License.<br>
Authored and maintained by Episclera with help from contributors ([list](https://github.com/episclera/multipack/contributors)).

#### If you like this repository star⭐ and watch👀 on [GitHub](https://github.com/episclera/multipack)
