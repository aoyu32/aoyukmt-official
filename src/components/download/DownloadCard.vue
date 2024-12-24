<template>
    <div class="download-card" :data-aos="animation">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <a :href="downloadLink" class="btn download-btn">下载{{ title }} x64</a>
    </div>
</template>

<script setup>
// 定义组件的 props
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    downloadLink: {
        type: String,
        required: true
    },
    animation: {
        type: String,
    }
});
</script>

<style lang="scss" scoped>
@use "@/assets/styles/download/card.scss";
</style>