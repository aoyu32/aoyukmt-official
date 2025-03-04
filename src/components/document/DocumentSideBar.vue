<template>
    <div>
        <aside class="sidebar" id="sidebar">
            <nav class="sidebar-nav">
                <h3>文档导航</h3>
                <ul class="nav-menu">
                    <li v-for="(menuItem, index) in localMenuData" :key="index" :class="['has-submenu', {
                        'open': menuItem.isOpen,
                        'active-parent': activeParentIndex === index
                    }]">
                        <a href="" @click="toggleMenu(index)" :class="{ 'active': activeParentIndex === index }">
                            {{ menuItem.label }}
                            <span class="iconfont icon-arrow-right" :class="{ rotate: menuItem.isOpen }">
                            </span>
                        </a>
                        <ul class="nav-submenu" :class="{ 'show': menuItem.isOpen }">
                            <li v-for="(subItem, subIndex) in menuItem.submenu" :key="subIndex" @click="hideSidebar">
                                <a href="#" :data-md="subItem.id"
                                    :class="{ 'active': activeParentIndex === index && activeChildIndex === subIndex }"
                                    @click.prevent="handleSubmenuClick(index, subIndex, subItem.src)">
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
const store = useDocumentStore();

// const props = defineProps({
//     menuData: {
//         type: Array,
//         required: true
//     }
// });
// 创建本地响应式数据
const localMenuData = store.menuData
// 跟踪激活的菜单项
const activeParentIndex = ref(null);
const activeChildIndex = ref(null);


// 在组件挂载后设置默认状态
onMounted(() => {
    // 设置第一个一级菜单为激活状态
    activeParentIndex.value = 0;
    // 设置第一个二级菜单为激活状态
    activeChildIndex.value = 0;

});


// 切换菜单展开状态 - 只负责展开/收起，不处理高亮
const toggleMenu = (index) => {
    localMenuData[index].isOpen = !localMenuData[index].isOpen;
    activeParentIndex.value = index
};

// 处理二级菜单点击 - 处理高亮状态
const handleSubmenuClick = (parentIndex, childIndex) => {
    store.setActiveMenu(parentIndex, childIndex);
    // 更新激活状态
    activeParentIndex.value = parentIndex;
    activeChildIndex.value = childIndex;
    // 确保父菜单保持展开
    localMenuData[parentIndex].isOpen = true;
    const filePath = localMenuData[parentIndex].submenu[childIndex].src;
    store.setFilePath(filePath); // 更新文件路径
};


watch(() => store.activeParentIndex, (newValue) => {
    activeParentIndex.value = newValue
})

watch(() => store.activeChildIndex, (newValue) => {
    activeChildIndex.value = newValue
    const filePath = localMenuData[store.activeParentIndex].submenu[store.activeChildIndex].src;
    store.setFilePath(filePath); // 更新文件路径
})

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
