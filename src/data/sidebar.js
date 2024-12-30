export const menuData = [
    {
        label: '快速开始',
        isOpen: true,  // 默认展开
        submenu: [
            {
                id: 'intro',  // 英文翻译为单词
                label: '简介',
                src: '/docs/intro.md' // 路径
            },
            {
                id: 'install',
                label: '安装和启动',
                src: '/docs/install.md'
            },
            {
                id: 'gettingstarted',  // 单词合并
                label: '快速入门',
                src: '/docs/gettingstarted.md'
            }
        ]
    },
    {
        label: '使用指导',
        isOpen: true,
        submenu: [
            {
                id: 'mapping',  // 使用符合意思的单词
                label: '字符输入映射',
                src: '/docs/mapping.md'
            },
            {
                id: 'directional',  // 使用单词
                label: '方向键映射',
                src: '/docs/directional.md'
            },
            {
                id: 'editing',  // 使用单词
                label: '编辑控制映射',
                src: '/docs/editing.md'
            },
            {
                id: 'disk',  // 使用单词
                label: '打开磁盘映射',
                src: '/docs/disk.md'
            },
            {
                id: 'app',  // 使用单词
                label: '应用快捷启动',
                src: '/docs/runapp.md'
            },
            {
                id: 'website',  // 使用单词
                label: '网站快捷启动',
                src: '/docs/website.md'
            },
            {
                id: 'hotstrings',  // 使用单词
                label: '热字符串',
                src: '/docs/hotstrings.md'
            },
            {
                id: 'system',  // 使用单词
                label: '常用系统操作映射',
                src: '/docs/system.md'
            },
            {
                id: 'file',  // 使用单词
                label: '资源管理器映射',
                src: '/docs/file.md'
            },
            {
                id: 'window',  // 使用单词
                label: '窗口操作映射',
                src: '/docs/window.md'
            }
        ]
    },
    {
        label: '应用配置',
        isOpen: true,
        submenu: [
            {
                id: 'config',  // 使用单词
                label: '配置说明',
                src: '/docs/config.md'
            },
            {
                id: 'features',  // 使用单词
                label: '各功能配置',
                src: '/docs/settings.md'
            }
        ]
    },
    {
        label: '常见问题',
        isOpen: true,
        submenu: [
            {
                id: 'error',  // 使用单词
                label: '错误弹窗',
                src: '/docs/error.md'
            },
            {
                id: 'keyissues',  // 使用单词
                label: '按键映射问题',
                src: '/docs/keyissues.md'
            }
        ]
    }
];
