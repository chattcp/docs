import {defineConfig} from 'vitepress'

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
            lang: 'en'
        },
        zh: {
            label: '简体中文',
            lang: 'zh', // 可选，将作为 `lang` 属性添加到 `html` 标签中
        }
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/logo.png",
        nav: [
            {text: 'Download', link: 'https://chattcp.com'}
        ],
        sidebar: [
            {
                text: 'Home',
                link: '/'
            },
            {
                text: 'About ChatTCP',
                link: '/about-chattcp'
            },
            {
                text: 'Quick Start',
                link: "/quick-start"
            },
            {
                text: 'How to capture tcp packets',
                link: '/how-to-capture-tcp-packets'
            },
            {
                text: 'Classic case',
                link: '/classic-case'
            },
            {
                text: 'Search packets',
                link: '/search-package'
            },
            {
                text: 'Decode application layer protocols',
                link: '/decode-application-layer-protocols'
            },
            {
                text: 'Extract http protocol files',
                link: '/extract-http-protocol-files'
            },
            {
                text: 'Relative Sequence Number',
                link: '/relative-sequence-number'
            },
            {
                text: 'Understanding packet retransmission and out of order',
                link: '/tcp-packet-retransmission-and-out-of-order'
            },
            {
                text: 'Understand the connection status of the TCP protocol',
                link: '/understand-the-connection-status-of-the-tcp-protocol'
            }
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/chattcp/docs'}
        ]
    }
})
