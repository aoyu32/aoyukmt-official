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
                    <a href="#" class="download-link download-link-install"
                        @click.prevent="downloadApp(versionData.version, versionData.id, 'installer')">安装版</a>
                    <p>{{ versionData.installerHash }}</p>
                </div>
                <div>
                    <a href="#" class="download-link download-link-portable"
                        @click.prevent="downloadApp(versionData.version, versionData.id, 'zip')">便携版</a>

                    <p>{{ versionData.zipPackageHash }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import MarkdownViewer from '@/components/common/MarkdownViewer.vue';
import { apis } from '@/api/api';
import tools from '@/utils/tools';

// 版本日志数据
const props = defineProps({
    versionData: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(["setTipContext"])

// 请求下载应用
const downloadApp = async (version, versionId, packageType) => {
    //生成auid
    tools.insertAUID()
    const isLatest = versionId === 'latest';
    const uid = tools.getAUID()
    console.log("更新日志下载auid:", uid);


    const apiMethod = isLatest ? apis.downloadLatest : apis.downloadHistory;
    const params = isLatest ? { uid, packageType } : { uid, version, packageType };

    try {
        const path = await apiMethod(params);
        await tools.downloadFile(path);
    } catch (error) {
        emit("setTipContext", `${error.message}!☹️`);
    }
}

</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/card.scss" as *;
</style>