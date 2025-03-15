<template>
    <div class="updatelog-card">
        <div class="log">
            <div class="log-header">
                <span class="version-title">v{{ versionData.version }}</span>
                <span class="update-date">{{ versionData.releaseDate }}</span>
            </div>
            <div class="log-content">
                <h3>{{ versionData.description }}</h3>
                <!-- <div class="content-markdown"> -->
                <MarkdownViewer :docsUrl="versionData.changelogUrl" />
                <!-- </div> -->
            </div>
            <div class="log-download">
                <h4>下载该版本:</h4>
                <div>
                    <a href="#" class="download-link download-link-install">安装版</a>
                    <p>{{ versionData.installerHash }}</p>
                </div>
                <div>
                    <a href="#" class="download-link download-link-portable">便携版</a>
                    <p>{{ versionData.zipPackageHash }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue'
import MarkdownViewer from '@/components/common/MarkdownViewer.vue';

//版本日志数据
const props = defineProps({
    versionData: {
        type: Object,
        required: true
    }
})
</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/card.scss" as *;
</style>