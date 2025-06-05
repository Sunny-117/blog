import { defineConfig } from "vitepress";
import { defaultSidebar } from "./defaultSidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  base: "/blog/",
  themeConfig: {
    outline: [1, 3],
    sidebar: defaultSidebar,
    nav: defaultSidebar,
  },
  markdown: {
    anchor: {},
    toc: { level: [1, 2, 3, 4] },
    theme: {
      light: "min-dark",
      dark: "one-dark-pro",
    },
    lineNumbers: true,
  },
});
