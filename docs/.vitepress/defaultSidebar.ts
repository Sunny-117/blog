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