import { DefaultTheme } from "vitepress";
import engineerConfig from "./engineer";
import reactConfig from "./react";
import hcConfig from "./hc";
import fragment from "./fragment";
export const defaultSidebar: DefaultTheme.Sidebar = [
  {
    text: "Introduction",
    collapsible: true,
    items: [
      {
        text: "Getting Started",
        link: "/getting-started",
      },
    ],
  },
  {
    text: "知识碎片（部分文章转载）",
    collapsible: true,
    items: fragment,
  },
  {
    text: "前端工程化",
    collapsible: true,
    items: engineerConfig,
  },

  {
    text: `React ${reactConfig.length}篇`,
    collapsible: true,
    items: reactConfig,
  },
  {
    text: "TypeScript",
    items: [
      {
        text: "TypeScript OnePage",
        link: "/ts/TypeScript-onePage",
      },
    ],
  },
  {
    text: "前端三件套",
    collapsible: true,
    items: [
      {
        text: "异步处理",
        link: "/js/异步处理",
      },
      {
        text: "代理与反射",
        link: "/js/代理与反射",
      },
      {
        text: "迭代器和生成器",
        link: "/js/迭代器和生成器",
      },
      ...hcConfig,
    ],
  },

  {
    text: "算法",
    collapsible: true,
    items: [
      {
        text: "如何在 10 亿数中找出前 1000 大的数",
        link: "https://juejin.cn/post/6844903880208171015",
      },
      {
        text: "🔥刷题之探索最优解",
        link: "/algorithm/🔥刷题之探索最优解",
      },
    ],
  },
  {
    text: "面试系列",
    collapsible: true,
    items: [
      {
        text: "面试官：你还有问题要问我吗",
        link: "/interview/面试官：你还有问题要问我吗",
      },
      {
        text: "算法笔试",
        link: "/interview/算法笔试",
      },
    ],
  },
  {
    text: "技术之外",
    collapsible: true,
    items: [
      {
        text: "关于写作，这是我目前能想到最全的",
        link: "https://mp.weixin.qq.com/s/EAU3u7iVnyK5Gi00mgewLw",
      },
    ],
  },
];
