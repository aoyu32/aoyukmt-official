import { defineStore } from "pinia";
import { ref } from 'vue'

export const useHeaderStore = defineStore('header', () => {

    //标签
    const links = ref([
        {
            label: 'download',
            name: '🫣 下载安装',
            hoverName: '😎 下载安装',
            routerLink: '/download'
        },
        {
            label: 'document',
            name: '🐋 使用文档',
            hoverName: '🐳 使用文档',
            routerLink: '/document',
        },
        {
            label: 'community',
            name: '🛫 交流中心',
            hoverName: '🛬 交流中心',
            routerLink: '/community',
        },
        {
            label: 'updatelog',
            name: '🐤 更新日志',
            hoverName: '🐣 更新日志',
            routerLink: '/updatelog',
        }

    ])
    const typings = ref([
        {
            typeText: 'AOYUKMT',
            navWidth: '1200px',
            routerLink: '/index'
        },
        {
            typeText: 'DOWNLOAD',
            navWidth: '1200px',
            routerLink: '/download'
        },
        {
            typeText: 'DOCUMNET',
            navWidth: '95%',
            routerLink: '/document'
        },
        {
            typeText: 'COMMUNITY',
            navWidth: '1300px',
            routerLink: '/community'
        },
        {
            typeText: 'UPDATELOG',
            navWidth: '1200px',
            routerLink: '/updatelog'
        },
        {
            typeText: 'ASSISTANT',
            navWidth: '1300px',
            routerLink: '/community/assistant'
        },
        {
            typeText: 'CHAT FORUM',
            navWidth: '1300px',
            routerLink: '/community/forum'
        },
        {
            typeText: 'FEEDBACK',
            navWidth: '1300px',
            routerLink: '/community/feedback'
        }

    ])

    const setLinks = (link) => {
        links.value.push(link)
    }

    const setTypings = (typing) => {
        typingInstance.value.push(typing)
    }

    return {
        links,
        typings,
        setLinks,
        setTypings
    }

})