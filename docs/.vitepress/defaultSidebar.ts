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
    text: "知识碎片（部分文章转载）",
    items: [
      {
        text: "前端录制回放系统初体验",
        link: "/fragment/video",
      },
      {
        text: "面试官问我JS中forEach能不能跳出循环",
        link: "/fragment/forEach",
      },
      {
        text: "请设计一个不能操作DOM和调接口的环境",
        link: "/fragment/沙盒",
      },
      {
        text: "如何取消 Fetch 请求",
        link: "/fragment/fetch",
      },
      {
        text: "react函数组件中使用useState改变值后立刻获取最新值 ",
        link: "/fragment/react-useState",
      },
      {
        text: "一行代码，让网页变为黑白配色",
        link: "/fragment/黑白",
      },
      {
        text: "手撕babel插件-消灭console！",
        link: "/fragment/babel-console",
      },
      {
        text: "Monorepo",
        link: "/fragment/Monorepo",
      },
      {
        text: "🔥 微内核架构在前端的实现及其应用",
        link: "/fragment/微内核架构",
      },
      {
        text: "如何实现准时的setTimeout",
        link: "/fragment/setTimeout",
      },
      {
        text: "Git",
        link: "/fe-utils/git",
      },
      {
        text: "前端 JavaScript 必会工具库合集",
        link: "/fe-utils/js工具库",
      },
      {
        text: "一站式-后台前端解决方案",
        link: "/article/cms",
      },
      {
        text: "涌现出来的新tools",
        link: "/fe-utils/tool",
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
      ...hcConfig,
    ],
  },

  {
    text: "算法",
    collapsible: true,
    items: [
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
];
