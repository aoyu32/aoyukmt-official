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
const emit = defineEmits(['hideOutline'])
//点击跳转到标题
const scrollToHeading = (headingId) => {
    emit('hideOutline', true)
    const element = document.getElementById(headingId);     // 获取目标元素
    let offset = 0
    if (window.innerWidth >= 1000) {
        offset = -25
    } else {
        offset = 10
    }
    scrollTo(element, 300, null, offset)
};
</script>
<style lang="scss" scoped>
@use "@/assets/styles/document/outline.scss" as *;
</style>