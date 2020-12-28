const pkg = require('../package.json')

module.exports = {
  title: pkg.name,
  tagline: pkg.description,
  url: `https://episclera.github.io`,
  baseUrl: `/${pkg.name}/`,
  favicon: 'img/logo.png',
  organizationName: 'episclera', // Usually your GitHub org/user name.
  projectName: pkg.name, // Usually your repo name.
  themeConfig: {
    navbar: {
      title: pkg.name,
      logo: {
        alt: pkg.name,
        src: 'img/logo.png',
      },
      items: [
        { to: 'docs/doc-introduction', label: 'Docs', position: 'left' },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: pkg.repository.url,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting started',
              to: 'docs/doc-introduction',
            },
            {
              label: 'API Reference',
              to: 'docs/doc-api-introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'User Showcase',
              to: 'users',
            },
            {
              label: 'Stack Overflow',
              href: `https://stackoverflow.com/questions/tagged/${pkg.name}`,
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: pkg.repository.url,
            },
          ],
        },
      ],
      logo: {
        href: pkg.author.url,
        alt: `${pkg.author.name} Open Source Logo`,
        src:
          'https://raw.githubusercontent.com/episclera/.github/master/outlined-logo.png',
      },
      copyright: `Copyright © ${new Date().getFullYear()}. ${pkg.author.name}`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: `${pkg.repository.url}/edit/master/docs/`,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
