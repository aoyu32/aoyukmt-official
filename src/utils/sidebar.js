export const menuData = [
    {
        label: '快速开始',
        isOpen: true,  // 默认不展开
        submenu: [
            { id: 'start', label: '简介' },
            { id: 'start2', label: '安装和启动' },
            { id: 'start3', label: '快速入门' } // 修正了 id 唯一性
        ]
    },
    {
        label: '使用指导',
        isOpen: true,  // 默认不展开
        submenu: [
            { id: 'direction-control1', label: '字符输入映射' },
            { id: 'direction-control2', label: '方向键映射' },
            { id: 'direction-control3', label: '编辑控制映射' },
            { id: 'direction-control4', label: '打开磁盘映射' },
            { id: 'direction-control5', label: '应用快捷启动' },
            { id: 'direction-control6', label: '网站快捷启动' },
            { id: 'direction-control7', label: '热字符串' },
            { id: 'direction-control8', label: '常用系统操作映射' },
            { id: 'direction-control9', label: '资源管理器映射' },
            { id: 'direction-control10', label: '窗口操作映射' }
        ]
    },
    {
        label: '应用配置',
        isOpen: false,  // 默认不展开
        submenu: [
            { id: 'edit-control1', label: '配置说明' },
            { id: 'edit-control2', label: '各功能配置' }
        ]
    },
    {
        label: '常见问题',
        isOpen: false,  // 默认不展开
        submenu: [
            { id: 'edit-control1', label: '错误弹窗' },
            { id: 'edit-control2', label: '按键映射问题' }
        ]
    }
];
