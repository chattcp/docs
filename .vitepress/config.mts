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
            {async: '', src: `https://www.googletagmanager.com/gtag/js?id=TAG_ID`}
        ],
        [
            'script',
            {},
            `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`
        ]
    ],
    srcDir: './src',
    srcExclude: ['**/README.md'],
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                sidebar: sidebar
            }
        },
        zh: {
            label: '简体中文',
            lang: 'zh', // 可选，将作为 `lang` 属性添加到 `html` 标签中
            themeConfig: {
                sidebar: zhSidebar
            }
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.png",
        nav: [
            {text: 'Download', link: 'https://chattcp.com'}
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/chattcp/docs'}
        ]
    }
})
