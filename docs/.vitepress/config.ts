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
      dark: "one-dark-pro",
    },
    lineNumbers: true,
  },
  themeConfig: {
    outline: [1, 3],
    sidebar: defaultSidebar,
    nav: defaultSidebar,
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
});
