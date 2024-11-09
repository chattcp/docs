import {defineConfig} from 'vitepress'

import {sidebar} from "./src/sidebars/en";
import {zhSidebar} from "./src/sidebars/zh"

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "ChatTCP docs",
    description: "ChatTCP docs",
    titleTemplate: ":title | ChatTCP",
    lang: 'en-US',
    base: "/",
    head: [
        [
            'link',
            {rel: 'icon', href: '/favicon.ico'}
        ],
        [
            'script',
            {async: '', src: `https://www.googletagmanager.com/gtag/js?id=G-HWE8YD659P`}
        ],
        [
            'script',
            {},
            `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HWE8YD659P');`
        ]
    ],
    srcDir: './src',
    srcExclude: ['**/README.md'],
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                nav: [
                    {text: 'Home', link: 'https://chattcp.com/en'},
                    {text: 'Download', link: 'https://apps.apple.com/us/app/chattcp/id6560112653'}
                ],
                sidebar: sidebar
            }
        },
        zh: {
            label: '简体中文',
            lang: 'zh', // 可选，将作为 `lang` 属性添加到 `html` 标签中
            themeConfig: {
                nav: [
                    {text: '官网', link: 'https://chattcp.com/zh'},
                    {text: '下载', link: 'https://apps.apple.com/cn/app/chattcp/id6560112653'}
                ],
                sidebar: zhSidebar
            }
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.png",
        socialLinks: [
            {icon: 'github', link: 'https://github.com/chattcp/docs'},
            {icon: 'twitter', link: 'https://x.com/ChatTCP'}
        ]
    }
})
