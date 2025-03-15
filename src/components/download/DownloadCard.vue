<template>
    <div class="download-card" :data-aos="animation">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <button class="btn download-btn" @click="requestDownload(title)">下载{{ title }} x64</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { apis } from '@/api/api';
import tools from '@/utils/tools';
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
const emit = defineEmits(["setTipContext"])
//请求下载应用
const requestDownload = async (title) => {
    if (title === '安装版') {
        try {
            const path = await apis.downloadLatest("installer", "123")
            tools.downloadFile(path)
        } catch (error) {
            emit("setTipContext", error.message + "!☹️")
        }
    }

    if (title === '便携版') {
        try {
            const path = await apis.downloadLatest("zip", "123")
            tools.downloadFile(path)
        } catch (error) {
            emit("setTipContext", error.message + "!☹️")
        }
    }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/download/card.scss";
</style>