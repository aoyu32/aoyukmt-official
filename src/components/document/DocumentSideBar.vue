<template>
    <div>
        <aside class="sidebar" id="sidebar">
            <nav class="sidebar-nav">
                <h3>文档导航</h3>
                <ul class="nav-menu">
                    <li v-for="(menuItem, index) in menuData" :key="index" :class="['has-submenu', {
                        'open': menuItem.isOpen,
                        'active-parent': activeParentIndex === index
                    }]">
                        <a href="" @click.prevent="toggleMenu(index)"
                            :class="{ 'active': activeParentIndex === index }">
                            {{ menuItem.name }}
                            <span class="iconfont icon-arrow-right" :class="{ rotate: menuItem.isOpen }">
                            </span>
                        </a>
                        <ul class="nav-submenu" :class="{ 'show': menuItem.isOpen }">
                            <li v-for="(subItem, subIndex) in menuItem.documents" :key="subIndex" @click="hideSidebar">
                                <a href="#" :data-md="subItem.id"
                                    :class="{ 'active': activeParentIndex === index && activeChildIndex === subIndex }"
                                    @click.prevent="handleSubmenuClick(index, subIndex, subItem.docsUrl)">
                                    {{ subItem.label }}
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </aside>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useDocumentStore } from '@/stores/document';
import { storeToRefs } from 'pinia';
const store = useDocumentStore();
// 跟踪激活的菜单项
const { menuData, activeChildIndex, activeParentIndex } = storeToRefs(store)

// 在组件挂载后设置默认状态
onMounted(() => {
    // 设置第一个一级菜单为激活状态
    store.setActiveParentIndex(0)
    // 设置第一个二级菜单为激活状态
    store.setActiveChildIndex(0)
    console.log(menuData.value);
    
    //默认显示第一个一级菜单的第一个文档
    // store.setActiveDocsUrl()
});

// 切换菜单展开状态 - 只负责展开/收起，不处理高亮
const toggleMenu = (index) => {
    store.setParentMenuOpen(index)
};

// 处理二级菜单点击 - 处理高亮状态
const handleSubmenuClick = (parentIndex, childIndex, docsUrl) => {
    store.setActiveMenu(parentIndex, childIndex);
    store.setActiveDocsUrl(docsUrl)
};


// watch(() => store.activeParentIndex, (newValue) => {
//     activeParentIndex.value = newValue
// })

// watch(() => store.activeChildIndex, (newValue) => {
//     activeChildIndex.value = newValue
//     const filePath = localMenuData[store.activeParentIndex].submenu[store.activeChildIndex].src;
//     store.setFilePath(filePath); // 更新文件路径
// })

const emit = defineEmits(['hideSidebar'])
//通知父组件隐藏侧边栏
const hideSidebar = () => {
    emit('hideSidebar', true)
    window.scrollTo(0, 0)
}
</script>


<style lang="scss" scoped>
@use "@/assets/styles/document/siderbar.scss";
</style>
