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
// 定义 title 与 packageType 的映射关系
const packageMap = {
    '安装版': 'installer',
    '便携版': 'zip'
};

// 请求下载应用
const requestDownload = async (title) => {
    const packageType = packageMap[title];

    if (!packageType) {
        emit("setTipContext", "未知的下载类型! ❌");
        return;
    }

    try {
        const path = await apis.downloadLatest({
            uid: '123',
            packageType
        });
        await tools.downloadFile(path);
    } catch (error) {
        emit("setTipContext", error.message + "! ☹️");
    }
};



</script>

<style lang="scss" scoped>
@use "@/assets/styles/download/card.scss";
</style>