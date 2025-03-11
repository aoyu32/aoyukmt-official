import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDocumentStore = defineStore("document", () => {
    // 定义响应式状态
    const activeDocsUrl = ref(""); // 当前文档 URL
    const activeParentIndex = ref(0); // 当前激活的父菜单索引
    const activeChildIndex = ref(0); // 当前激活的子菜单索引
    const headings = ref([]); // 大纲标题列表
    const menuData = ref([]); // 菜单数据
    const activeHeadingId = ref(null); // 当前激活的标题 ID

    // 计算属性 - 判断 menuData 是否为空
    const isMenuDataEmpty = computed(() => menuData.value.length === 0);

    // 计算属性 - 判断 activeDocsUrl 是否为空
    const isActiveDocsUrlEmpty = computed(() => activeDocsUrl.value === "");

    // 设置当前文档 URL
    const setActiveDocsUrl = (url) => {
        activeDocsUrl.value = url;
    };

    // 设置当前激活的子菜单索引
    const setActiveChildIndex = (childIndex) => {
        activeChildIndex.value = childIndex;
    };

    // 设置当前激活的父菜单索引
    const setActiveParentIndex = (parentIndex) => {
        activeParentIndex.value = parentIndex;
    };

    // 设置当前激活的菜单
    const setActiveMenu = (parentIndex, childIndex) => {
        activeParentIndex.value = parentIndex;
        activeChildIndex.value = childIndex;
    };

    // 设置大纲标题列表
    const setHeadings = (newHeadings) => {
        headings.value = newHeadings;
    };

    // 设置菜单数据
    const setMenuData = (data) => {
        menuData.value = data;
    };

    // 切换父菜单的打开/关闭状态
    const setParentMenuOpen = (index) => {
        menuData.value[index].isOpen = !menuData.value[index].isOpen;
    };

    // 设置当前激活的标题 ID
    const setActiveHeadingId = (id) => {
        activeHeadingId.value = id;
    };

    return {
        activeDocsUrl,
        activeParentIndex,
        activeChildIndex,
        headings,
        menuData,
        activeHeadingId,
        isMenuDataEmpty, // 计算属性：菜单数据是否为空
        isActiveDocsUrlEmpty, // 计算属性：当前文档 URL 是否为空
        setActiveDocsUrl,
        setActiveChildIndex,
        setActiveParentIndex,
        setActiveMenu,
        setHeadings,
        setMenuData,
        setParentMenuOpen,
        setActiveHeadingId,
    };
});