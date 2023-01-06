import { resolve } from 'path'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { generateFileSidebar } from './file-sidebar'

const r = (p: string) => resolve(__dirname, p)

// generateFileSidebar(r('../useForm'))

const defaultSidebar: DefaultTheme.Sidebar = [
  {
    text: 'Introduction',
    collapsible: true,
    items: [
      {
        text: 'Getting Started',
        link: '/getting-started',
      },
    ],
  },
  {
    text: 'vue',
    collapsible: true,
    items: [
      {
        text: 'vue',
        link: '/vue/index'
      },
    ],
  },
  {
    text: 'React',
    items: [
      {
        text: 'React',
        link: '/react/',
      },
    ],
  },
]

export default defineConfig({
  base: '/blog/',
  title: 'blog',
  description: 'composition api form validator for vue',
  // appearance: false,
  lastUpdated: true,
  themeConfig: {
    sidebar: defaultSidebar,
    nav: [
      {
        text: 'Playground',
        link: 'https://mini-anything-play.netlify.app/',
      },
      ...defaultSidebar,
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sunny-117/mini-anything' },
    ],
    footer: {
      copyright: 'Copyright © 2022-present sunny-117',
    },
    editLink: {
      pattern: 'https://github.com/sunny-117/mini-anything',
      text: 'Edit this page on Gitlab',
    },
    lastUpdatedText: 'Last Updated',
    localeLinks: {
      text: 'English',
      items: [
        { text: '简体中文', link: 'https://netlify.app' },
      ],
    },
  },
})
