import { resolve } from "path";
import type { DefaultTheme } from "vitepress";
import { defineConfig } from "vitepress";
import { defaultSidebar } from "./defaultSidebar";
import { generateFileSidebar } from "./file-sidebar";

const r = (p: string) => resolve(__dirname, p);

// generateFileSidebar(r('../useForm'))
export default defineConfig({
  base: "/blog/",
  title: "Sunny's blog",
  description: "composition api form validator for vue",
  // appearance: false,
  lastUpdated: true,
  markdown: {
    anchor: {},
    toc: { level: [1, 2, 3, 4] },
    theme: {
      light: "min-dark",
      dark: "vitesse-light",
    },
    lineNumbers: true,
  },
  themeConfig: {
    // 隐藏导航栏标题
    siteTitle: false,
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
          // 细粒度分包策略
          manualChunks(id) {
            // 只对 node_modules 中的依赖进行分包
            if (id.includes('node_modules')) {
              // Vue 核心 - 单独分包
              if (id.includes('/vue/dist/')) {
                return 'vendor-vue';
              }

              // @vue 生态系统 - 单独分包
              if (id.includes('@vue/')) {
                return 'vendor-vue-eco';
              }

              // @vueuse 工具库 - 单独分包
              if (id.includes('@vueuse/')) {
                return 'vendor-vueuse';
              }

              // VitePress 主题 - 单独分包
              if (id.includes('vitepress') && id.includes('theme-default')) {
                return 'vendor-vp-theme';
              }

              // VitePress 核心 - 单独分包
              if (id.includes('vitepress')) {
                return 'vendor-vp-core';
              }

              // 搜索功能 - minisearch
              if (id.includes('minisearch')) {
                return 'vendor-search-mini';
              }

              // 搜索功能 - mark.js
              if (id.includes('mark.js')) {
                return 'vendor-search-mark';
              }

              // focus-trap 相关
              if (id.includes('focus-trap') || id.includes('tabbable')) {
                return 'vendor-focus';
              }

              // oh-my-live2d
              if (id.includes('oh-my-live2d')) {
                return 'vendor-live2d';
              }

              // 其他小型依赖统一打包
              return 'vendor-other';
            }
          },
        },
      },
    },
  },
});
