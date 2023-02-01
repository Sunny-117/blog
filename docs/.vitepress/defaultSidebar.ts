import { DefaultTheme } from "vitepress";

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
  //
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
    text: "前端工程化",
    collapsible: true,
    items: [
      {
        text: "webpack常用拓展",
        link: "/front-end-engineering/webpack常用拓展",
      },
      {
        text: "CSS工程化",
        link: "/front-end-engineering/CSS工程化",
      },
      {
        text: "JS 兼容性",
        link: "/front-end-engineering/jscompatibility",
      },
      {
        text: "webpack5",
        link: "/front-end-engineering/webpack5",
      },
      {
        text: "pnpm原理",
        link: "/front-end-engineering/pnpm原理",
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
    text: "vue",
    collapsible: true,
    items: [
      {
        text: "vue",
        link: "/vue/index",
      },
      {
        text: "虚拟DOM详解",
        link: "/vue/vdom",
      },
      {
        text: "Vuejs 组件通信概览",
        link: "/vue/component-communication",
      },
    ],
  },
  {
    text: "React",
    items: [
      {
        text: "React",
        link: "/react/",
      },
    ],
  },
];
