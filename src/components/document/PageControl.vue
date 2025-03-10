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
import { storeToRefs } from 'pinia';

const store = useDocumentStore();
const { menuData, activeParentIndex, activeChildIndex, activeDocsUrl } = storeToRefs(store)

const prevLabel = computed(() => {
    const childIndex = activeChildIndex.value;
    const parentIndex = activeParentIndex.value;
    const currentParent = menuData.value[parentIndex];

    // 如果当前是一级菜单的第一个元素，且没有上一级菜单，则返回空
    if (parentIndex === 0 && childIndex === 0) {
        return '';
    }

    // 如果当前是一级菜单的第一个元素，且有上一级菜单
    if (childIndex === 0) {
        const prevParent = menuData.value[parentIndex - 1];
        const lastChildIndex = prevParent.documents.length - 1;
        return prevParent.documents[lastChildIndex].label;
    }

    // 否则，返回当前一级菜单的前一个子菜单的 label
    return currentParent.documents[childIndex - 1].label;
});

const nextLabel = computed(() => {
    const childIndex = activeChildIndex.value;
    const parentIndex = activeParentIndex.value;
    const currentParent = menuData.value[parentIndex];
    const lastChildIndex = currentParent.documents.length - 1;

    // 如果当前是一级菜单的最后一个元素，且没有下一级菜单，则返回空
    if (parentIndex === menuData.value.length - 1 && childIndex === lastChildIndex) {
        return '';
    }

    // 如果当前是一级菜单的最后一个元素，且有下一级菜单
    if (childIndex === lastChildIndex) {
        const nextParent = menuData.value[parentIndex + 1];
        return nextParent.documents[0].label;
    }

    // 否则，返回当前一级菜单的下一个子菜单的 label
    return currentParent.documents[childIndex + 1].label;
});

const toPrePage = () => {
    const childIndex = activeChildIndex.value;
    const parentIndex = activeParentIndex.value;
    const currentParent = menuData.value[parentIndex];

    // 如果当前子菜单不是第一个
    if (childIndex > 0) {
        store.setActiveChildIndex(childIndex - 1);
        const prevDoc = currentParent.documents[childIndex - 1];
        store.setActiveDocsUrl(prevDoc.docsUrl);
    }
    // 如果当前子菜单是第一个，且有上一级菜单
    else if (parentIndex > 0) {
        const prevParent = menuData.value[parentIndex - 1];
        const lastChildIndex = prevParent.documents.length - 1;
        store.setActiveParentIndex(parentIndex - 1);
        store.setActiveChildIndex(lastChildIndex);
        const prevDoc = prevParent.documents[lastChildIndex];
        store.setActiveDocsUrl(prevDoc.docsUrl);
    }
    store.menuData[activeParentIndex.value].isOpen = true
};

const toNextPage = () => {
    const childIndex = activeChildIndex.value;
    const parentIndex = activeParentIndex.value;
    const currentParent = menuData.value[parentIndex];
    const lastChildIndex = currentParent.documents.length - 1;

    // 如果当前子菜单不是最后一个
    if (childIndex < lastChildIndex) {
        store.setActiveChildIndex(childIndex + 1);
        const nextDoc = currentParent.documents[childIndex + 1];
        store.setActiveDocsUrl(nextDoc.docsUrl);
    }
    // 如果当前子菜单是最后一个，且有下一级菜单
    else if (parentIndex < menuData.value.length - 1) {
        const nextParent = menuData.value[parentIndex + 1];
        store.setActiveParentIndex(parentIndex + 1);
        store.setActiveChildIndex(0);
        const nextDoc = nextParent.documents[0];
        store.setActiveDocsUrl(nextDoc.docsUrl);
    }
    store.menuData[activeParentIndex.value].isOpen = true
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/document/pagecontrol.scss" as *;
</style>