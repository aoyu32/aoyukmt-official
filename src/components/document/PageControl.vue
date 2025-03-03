<template>
    <nav class="markdown-page">
        <a class="pre-page" :class="{ hidden: !prevLabel }" id="pre-page" @click="toPrePage">
            <p class="pre">
                <i class="iconfont icon-prepage-right"></i>
                <span>{{ prevLabel || '' }}</span>
            </p>
        </a>
        <a class="next-page" :class="{ hidden: !nextLabel }" id="next-page" @click="toNextPage">
            <p class="next">
                <span>{{ nextLabel || '' }}</span>
                <i class="iconfont icon-shangyiye"></i>
            </p>
        </a>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useDocumentStore } from '@/stores/document';

const store = useDocumentStore();
const menuData = computed(() => store.menuData);

// 获取父级和子级的索引
const parentIndex = computed(() => store.activeParentIndex);
const childIndex = computed(() => store.activeChildIndex);

// 判断是否为第一个菜单项
const isFirstItem = computed(() => {
    return parentIndex.value === 0 && childIndex.value === 0;
});

// 判断是否为最后一个菜单项
const isLastItem = computed(() => {
    const lastParentIndex = menuData.value.length - 1;
    const currentParent = menuData.value[parentIndex.value];
    const lastChildIndex = currentParent.submenu.length - 1;

    return parentIndex.value === lastParentIndex && childIndex.value === lastChildIndex;
});

const prevLabel = computed(() => {
    // 如果是第一个菜单项，不显示上一页
    if (isFirstItem.value) {
        return null;
    }

    const currentParent = menuData.value[parentIndex.value];

    // 如果当前不是该父菜单下的第一个子菜单
    if (childIndex.value > 0) {
        return currentParent.submenu[childIndex.value - 1].label;
    }

    // 如果是当前父菜单的第一个子菜单，显示上一个父菜单的最后一个子菜单
    if (parentIndex.value > 0) {
        const prevParent = menuData.value[parentIndex.value - 1];
        return prevParent.submenu[prevParent.submenu.length - 1].label;
    }

    return null;
});

const nextLabel = computed(() => {
    // 如果是最后一个菜单项，不显示下一页
    if (isLastItem.value) {
        return null;
    }

    const currentParent = menuData.value[parentIndex.value];

    // 如果当前不是该父菜单下的最后一个子菜单
    if (childIndex.value < currentParent.submenu.length - 1) {
        return currentParent.submenu[childIndex.value + 1].label;
    }

    // 如果是当前父菜单的最后一个子菜单，显示下一个父菜单的第一个子菜单
    if (parentIndex.value < menuData.value.length - 1) {
        const nextParent = menuData.value[parentIndex.value + 1];
        return nextParent.submenu[0].label;
    }

    return null;
});

const toPrePage = () => {
    if (childIndex.value > 0) {
        // 当前父菜单下的上一个子菜单
        store.setActiveChildIndex(childIndex.value - 1);
    } else if (parentIndex.value > 0) {
        // 跳转到上一个父菜单的最后一个子菜单
        const prevParent = menuData.value[parentIndex.value - 1];
        store.setActiveMenu(
            parentIndex.value - 1,
            prevParent.submenu.length - 1
        );
    }
};

const toNextPage = () => {
    const currentParent = menuData.value[parentIndex.value];

    if (childIndex.value < currentParent.submenu.length - 1) {
        // 当前父菜单下的下一个子菜单
        store.setActiveChildIndex(childIndex.value + 1);
    } else if (parentIndex.value < menuData.value.length - 1) {
        // 跳转到下一个父菜单的第一个子菜单
        store.setActiveMenu(parentIndex.value + 1, 0);
    }
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/document/pagecontrol.scss" as *;
</style>