import { resolve } from "path";
import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import { defaultSidebar } from "./defaultSidebar";

const r = (p: string) => resolve(__dirname, p);

// generateFileSidebar(r('../useForm'))
export default defineConfig({
  base: "/blog/",
  title: "Sunny-117",
  description: "深入前端技术栈，探索工程化实践，记录成长历程",
  // appearance: false,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/blog/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:title', content: "Sunny's blog - 前端历险记" }],
    ['meta', { property: 'og:description', content: '深入前端技术栈，探索工程化实践' }],
  ],
  markdown: {
    anchor: {},
    toc: { level: [1, 2, 3, 4] },
    theme: {
      light: 'dracula',
      dark: 'vitesse-black',
    },
    lineNumbers: true,
  },
  themeConfig: {
    // 使用 Logo 替代文字标题
    logo: '/logo.svg',
    siteTitle: 'Sunny-117',
    search: {
      provider: 'local',
      options: {
        // 优化搜索 - 减少索引内容
        miniSearch: {
          searchOptions: {
            fuzzy: 0.1,
            prefix: true,
            boost: {
              title: 4,
              text: 1,
            },
          },
        },
      },
    },
    outline: [1, 3],
    sidebar: defaultSidebar,
    nav: [
      ...defaultSidebar.slice(1, 10),
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/Sunny-117/blog" },
    ],
    footer: {
      copyright: "Copyright © 2022-present sunny-117",
    },
    editLink: {
      pattern: "https://github.com/Sunny-117/blog",
      text: "Edit this page on Gitlab",
    },
    lastUpdatedText: "Last Updated"
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          // 简化分包策略，避免循环依赖
          manualChunks(id) {
            // 只对 node_modules 中的依赖进行分包
            if (id.includes('node_modules')) {
              // @vueuse 工具库
              if (id.includes('@vueuse/')) {
                return 'vendor-vueuse';
              }

              // 搜索功能 - minisearch
              if (id.includes('minisearch')) {
                return 'vendor-search';
              }

              // oh-my-live2d
              if (id.includes('oh-my-live2d')) {
                return 'vendor-live2d';
              }

              // VitePress 和 Vue 相关的不单独分包，让 Vite 自动处理
              // 其他依赖也让 Vite 自动处理
            }
          },
        },
      },
    },
  },
});
