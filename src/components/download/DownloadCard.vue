<template>
    <div class="download-card" :data-aos="animation">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <a class="btn download-btn" @click="requestDownload(title)">下载{{ title }} x64</a>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { apis } from '@/api/api';
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
    animation: {
        type: String,
    }
});
const requestDownload = async (title) => {
    console.log(title);
    event.preventDefault(); // 阻止默认行为
    console.log("download");

    if (title === '安装版') {
        try {
            const path = await apis.downloadLatest("installer")
            window.location.href = path

        } catch (error) {
            console.log(error.message);
        }
    }

    if (title === '便携版') {
        try {
            const path = await apis.downloadLatest("zip")
            window.location.href = path
        } catch (error) {
            console.log(error.message);
        }
    }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/download/card.scss";
</style>