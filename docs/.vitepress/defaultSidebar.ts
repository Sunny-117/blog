import { DefaultTheme } from "vitepress";

export const defaultSidebar: DefaultTheme.Sidebar = [
    {
        text: 'Introduction',
        collapsible: true,
        items: [
            {
                text: 'Getting Started',
                link: '/getting-started',
            },
        ],
    },
    {
        text: 'JavaScript',
        collapsible: true,
        items: [
            {
                text: 'JavaScript',
                link: '/js/',
            },
            {
                text: '异步处理',
                link: '/js/异步处理',
            },
            {
                text: '代理与反射',
                link: '/js/代理与反射',
            },
            {
                text: '迭代器和生成器',
                link: '/js/迭代器和生成器',
            }
        ],
    },
    // 
    {
        text: '前端工具',
        items: [
            {
                text: '前端 JavaScript 必会工具库合集',
                link: '/fe-utils/js工具库',
            },
            {
                text: '你的前端开发小助手',
                link: '/fe-utils/你的前端开发小助手',
            },
            {
                text: '属于专业前端工程师的浏览器收藏夹',
                link: '/fe-utils/属于专业前端工程师的浏览器收藏夹',
            }


        ],
    },
    {
        text: '前端工程化',
        collapsible: true,
        items: [
            {
                text: 'webpack常用拓展',
                link: '/front-end-engineering/webpack常用拓展'
            },
            {
                text: 'CSS工程化',
                link: '/front-end-engineering/CSS工程化'
            },
            {
                text: 'JS 兼容性',
                link: '/front-end-engineering/jscompatibility'
            },
            {
                text: 'webpack5',
                link: '/front-end-engineering/webpack5'
            },
            {
                text: 'pnpm原理',
                link: '/front-end-engineering/pnpm原理'
            }


        ]
    },
    {
        text: 'vue',
        collapsible: true,
        items: [
            {
                text: 'vue',
                link: '/vue/index'
            },
        ],
    },
    {
        text: 'React',
        items: [
            {
                text: 'React',
                link: '/react/',
            },
        ],
    },
]