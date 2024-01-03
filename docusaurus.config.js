// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yukai1023', // Usually your GitHub org/user name.
  projectName: 'Docusaurus-Tect-Notes', // Usually your repo name.

  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/yukai1023/Docusaurus-Tect-Notes/tree/main/',
          showLastUpdateTime: true
        },
        pages: {
          remarkPlugins: [require('@docusaurus/remark-plugin-npm2yarn')],
        },
        blog: {
          remarkPlugins: [
            [
              require('@docusaurus/remark-plugin-npm2yarn'),
              {converters: ['pnpm']},
            ],
          ],
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/yukai1023/Docusaurus-Tect-Notes/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      algolia: {
        apiKey: "18ee75f082ac2e7dd529c53e4efaad05",
        indexName: "prod_blog",
        appId: "5KMZD9DMO3",
      },
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'YUKAI',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            href: 'https://github.com/yukai1023',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true
        },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Intro',
                to: '/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/yukai1023',
              },
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/in/yu-kai-wu-85714022a',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} YUKAI. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['JSON', 'Bash', 'Git'],
      },
    }),
};

export default config;
