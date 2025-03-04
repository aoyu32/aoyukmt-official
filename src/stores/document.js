import { defineStore } from "pinia";

export const useDocumentStore = defineStore('document', {
    state: () => ({
        activeFilePath: '/docs/intro.md', // 默认文档路径
        activeParentIndex: 0, // 默认激活的父菜单索引
        activeChildIndex: 0, // 默认激活的子菜单索引
        headings: [], // 大纲标题列表
        menuData: [],
        activeHeadingId: null//标题栏激活id
    }),
    actions: {
        setFilePath(filePath) {
            this.activeFilePath = filePath;
        },
        setActiveChildIndex(childIndex) {
            this.activeChildIndex = childIndex
        },
        setActiveParentIndex(parentIndex) {
            this.activeParentIndex = parentIndex
        },
        setActiveMenu(parentIndex, childIndex) {
            this.activeParentIndex = parentIndex;
            this.activeChildIndex = childIndex;
        },
        setHeadings(headings) {
            this.headings = headings;
        },
        setMenuData(data) {
            this.menuData = data
        },
        setActiveHeadingId(id) {
            this.activeHeadingId = id
        }
    },
});
