import { DefaultTheme } from "vitepress";
import vueConfig from "./vue";
import engineerConfig from "./engineer";
import reactConfig from "./react";
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
    text: "HTML-CSS",
    collapsible: true,
    items: [
      {
        text: "HTML5 OnePage",
        link: "/html-css/HTML",
      },
      {
        text: "CSS3 OnePage",
        link: "/html-css/CSS",
      },
      {
        text: "Canvas 和 svg",
        link: "/html-css/canvas-svg",
      },
      {
        text: "CSS3动画",
        link: "/html-css/animation",
      },

      {
        text: "CSS3选择器",
        link: "/html-css/selector",
      },

      {
        text: "显示器的成像原理",
        link: "/html-css/principle",
      },
      {
        text: "拖拽 API",
        link: "/html-css/drag",
      },
    ],
  },
  {
    text: "JavaScript",
    collapsible: true,
    items: [
      {
        text: "JavaScript",
        link: "/js/",
      },
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
    ],
  },

  {
    text: "前端工程化",
    collapsible: true,
    items: engineerConfig,
  },

  {
    text: `Vuejs ${vueConfig.length}篇`,
    collapsed: true,
    collapsible: true,
    items: vueConfig,
  },
  {
    text: `React ${reactConfig.length}篇`,
    collapsible: true,
    collapsed: true,
    items: reactConfig,
  },
  {
    text: "前端工具",
    items: [
      {
        text: "前端 JavaScript 必会工具库合集",
        link: "/fe-utils/js工具库",
      },
      {
        text: "你的前端开发小助手",
        link: "/fe-utils/你的前端开发小助手",
      },
      {
        text: "专业前端工程师的浏览器收藏夹",
        link: "/fe-utils/专业前端工程师的浏览器收藏夹",
      },
    ],
  },

  {
    text: "algorithm",
    collapsible: true,
    items: [
      {
        text: "🔥刷题之探索最优解",
        link: "/algorithm/🔥刷题之探索最优解",
      },
    ],
  },
  {
    text: "interview",
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
];
