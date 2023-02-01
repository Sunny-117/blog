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
    text: "前端工程化",
    collapsible: true,
    items: [
      {
        text: "这一定是你见过最全的性能优化方法论",
        link: "/front-end-engineering/performance",
      },
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
    text: "vue",
    collapsible: true,
    items: [
      {
        text: "vue",
        link: "/vue/index",
      },
      {
        text: "那些年，被问烂了的 Vuejs 面试题",
        link: "/vue/vue-interview",
      },
      {
        text: "虚拟DOM详解",
        link: "/vue/vdom",
      },
      {
        text: "Vuejs 组件通信概览",
        link: "/vue/component-communication",
      },
      {
        text: "探索 v-model 原理",
        link: "/vue/v-model",
      },
      {
        text: "Vue2 数据响应原理",
        link: "/vue/reactive",
      },
      {
        text: "Vue3 数据响应原理",
        link: "/vue/reactive-v3",
      },

      {
        text: "Vue2 diff算法原理",
        link: "/vue/diff",
      },
      {
        text: "Vue 生命周期",
        link: "/vue/lifecycle",
      },
      {
        text: "你不知道的 computed Vue2",
        link: "/vue/computed",
      },
      {
        text: "keep-alive 与 LRU 算法",
        link: "/vue/keep-alive-LRU",
      },
      {
        text: "Vue3 onePage",
        link: "/vue/vue3-onepage",
      },
      {
        text: "vue-cli 到底帮我们做了什么",
        link: "/vue/vue-cli",
      },
      { text: "Vue 编译器为什么如此强大", link: "/vue/vue-compile" },
      { text: "$nextTick 工作原理", link: "/vue/nextTick" },
      { text: "Vue 和 React 的核心区别", link: "/vue/vs" },
      { text: "一篇精通 slot", link: "/vue/slot" },
      { text: "Vue SSR 服务端渲染", link: "/vue/SSR" },
      { text: "Vue 指令篇", link: "/vue/directive" },
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
