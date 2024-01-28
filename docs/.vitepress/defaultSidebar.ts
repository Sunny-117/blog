import { DefaultTheme } from "vitepress";
import vueConfig from "./vue";
import engineerConfig from "./engineer";
import reactConfig from "./react";
import hcConfig from "./hc";
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
    text: "前端工程化",
    collapsible: true,
    items: engineerConfig,
  },

  {
    text: `Vuejs ${vueConfig.length}篇`,
    collapsible: true,
    items: vueConfig,
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
      ...hcConfig
    ],
  },
  {
    text: "前端工具",
    items: [
      {
        text: "Git",
        link: "/fe-utils/git",
      },
      {
        text: "前端 JavaScript 必会工具库合集",
        link: "/fe-utils/js工具库",
      }
    ],
  },

  {
    text: "算法",
    collapsible: true,
    items: [
      {
        text: "🔥刷题之探索最优解",
        link: "/algorithm/🔥刷题之探索最优解",
      }
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
  }
];
