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
    lastUpdatedText: "Last Updated",
  },
});
