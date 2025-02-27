<template>
    <div class="markdown-outline" v-aos="{
        animation: 'fade-down',
    }">
        <ul>
            <li v-for="heading in headings" :key="heading.id" :class="{ active: activeHeadingId === heading.id }"
                @click="scrollToHeading(heading.id)">
                {{ heading.text }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDocumentStore } from '@/stores/document';
import { storeToRefs } from 'pinia';
import { scrollTo } from '@/utils/scroll';

const store = useDocumentStore();
const { headings } = storeToRefs(store);
const activeHeadingId = ref(null);

//点击跳转到标题
const scrollToHeading = (headingId) => {
    const container = document.querySelector('.document');  // 获取滚动容器
    const element = document.getElementById(headingId);     // 获取目标元素
    scrollTo(element, 300, null, -25)
    // if (container && element) {
    //     // 获取目标元素相对于容器的偏移位置
    //     const rect = element.getBoundingClientRect();
    //     const containerRect = container.getBoundingClientRect();
    //     // 计算目标元素的 top 偏移量
    //     const offsetTop = rect.top - containerRect.top + container.scrollTop;
    //     activeHeadingId.value = headingId; // 设置激活的标题
    //     // 使用 scrollTo 滚动到目标位置
    //     window.scrollTo({
    //         top: offsetTop - 95,
    //         behavior: 'smooth'
    //     });
    // }
};
</script>
<style lang="scss" scoped>
@use "@/assets/styles/document/outline.scss" as *;
</style>