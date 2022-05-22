const path = require('path')
module.exports = {
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        // '/': {
        //     lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
        //     title: 'agbj-ui',
        //     description: 'Vue-powered Static Site Generator'
        // },
        '/zh/': {
            lang: 'zh-CN',
            title: 'agbj-ui',
            description: '奥格北京内部UI库'
        }
    },
    title: 'agbj-ui',
    description: '奥格北京内部UI库',
    dest:path.resolve(__dirname,'../../lib/doc/'),
    themeConfig: {
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {},
                nav: [
                    { text: 'Nested', link: '/nested/', ariaLabel: 'Nested' }
                ],
                sidebar: {
                    '/': [/* ... */],
                    '/nested/': [/* ... */]
                }
            },
            '/zh/': {
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                // 当前 locale 的 algolia docsearch 选项
                algolia: {},
                nav: [
                    { text: '主页', link: '/zh/' },
                    { text: '组件', link: '/zh/components/Install' },
                    {
                        text: '百度地址',
                        link: 'http://www.baidu.com'
                    }
                ],
                sidebar: {
                    "/zh/components/": [
                        {
                            title: '开发指南',
                            collapsable: false,
                            sidebarDepth: -1,
                            children: [
                                'Install',
                                "quickstart"
                            ]
                        }, {
                            title: '组件',
                            collapsable: false,
                            sidebarDepth: -1,
                            children: [
                                'Icon',
                                'Button'
                            ]
                        }
                    ]

                },
            }
        },
    },
    base: '/docs/',
    plugins: ['demo-container'],
    configureWebpack: {
        resolve: {
            alias: {
                '@packages': path.resolve(__dirname, '../../packages/'),
                'vue$': 'vue/dist/vue.esm.js',
            }
        },
  
    }
}