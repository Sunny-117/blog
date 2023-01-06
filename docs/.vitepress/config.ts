import { resolve } from 'path'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { defaultSidebar } from './defaultSidebar'
import { generateFileSidebar } from './file-sidebar'

const r = (p: string) => resolve(__dirname, p)

// generateFileSidebar(r('../useForm'))


export default defineConfig({
  base: '/blog/',
  title: 'blog',
  description: 'composition api form validator for vue',
  // appearance: false,
  lastUpdated: true,

  markdown: {
    // TODO
    anchor: {
    },
    toc: { level: [1, 2, 3] },
  },
  themeConfig: {
    outline: [1, 3],
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
