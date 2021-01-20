<div align="center">
  <a href="https://episclera.github.io/multipack/">
  <img style="max-width:100%;" height="200"
    src="https://raw.githubusercontent.com/episclera/multipack/master/logo.png">
  </a>
  <h1>
      multipack
  </h1>
  <p> 🔱 A monorepo template repository. Ideal for building shareable JavaScript packages or React modules.</p>
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

- `Lerna` structure to build monorepo packages
- `ESLint` and `Prettier` to enforce code style.
- Pre-commit hooks with `husky` and `lint-staged`
- `Docusaurus` docs generator preconfigured to work well with `Github Pages`
- Preconfigured `Jest` and `react-testing-library` to test `(ts|tsx)` files and colect coverage from all packages
- Preconfigured `Github workflow actions` to run tests after each pushed commit

## Getting started.

- Clone the project: `git clone --depth=1 https://github.com/episclera/multipack.git <YOUR_PROJECT_NAME>`
- Setup project: `npm install` and `npm run link:packages`

Running `npm run link:packages` will installing all packages dependencies and linking any cross-dependencies. This command is crucial, as it allows you to use your package names in `require()` as if the packages were already existing and available in your `node_modules` folder.

## CLI Commands

`npm run build:packages` - build all packages with `webpack` in `production` mode

`npm run watch:packages` - start `webpack` in watch mode to rebuild packages on each change

`npm run watch:packages` - start in watch mode (aplications,apis docs) packages

`npm run start:packages` - build and serve (aplications,apis) packages

`npm run version:packages` - Bump package versions and Create release tags

`npm run publish:packages` - publish packages where the latest version is not present in the `NPM` registry and `GitHub` registry

`npm run link:packages` - will installing all packages dependencies and linking any cross-dependencies in each package

`npm run test:packages` - run `jest` tests in each package and colect coverage from all packages

`npm run watch:test:packages` - run and watch all tests for changes

`npm run lint:packages` - lint all packages

`npm run lint:packages:styles` - lint all packages styles

`npm run fix:packages` - lint and fix all packages

`npm run watch:docs` - start a [Docusaurus](https://docusaurus.io/) server that serve files from `/docs` folder predestinated for docs.

`npm run publish:docs` - publish generated docs with [Docusaurus](https://docusaurus.io/) to `Github Pages`

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
