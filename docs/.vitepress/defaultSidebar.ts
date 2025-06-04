import hcConfig from "./hc";
import fragment from "./fragment";
export const defaultSidebar = [
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
];
