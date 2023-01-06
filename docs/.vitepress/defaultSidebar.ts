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