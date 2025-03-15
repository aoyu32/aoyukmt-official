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
import { ref, nextTick, onMounted } from 'vue'
import MarkdownViewer from '@/components/common/MarkdownViewer.vue';
import { apis } from '@/api/api';
import tools from '@/utils/tools';

//版本日志数据
const props = defineProps({
    versionData: {
        type: Object,
        required: true
    }
})
//请求下载应用
const downloadApp = async (version, versionId, packageType) => {
    if (versionId === 'latest') {
        if (packageType === 'installer') {
            try {
                const path = await apis.downloadLatest({
                    'uid': '123',
                    'packageType': 'installer'
                })
                tools.downloadFile(path)
            } catch (error) {
                // emit("setTipContext", error.message + "!☹️")
                console.log(error.message);

            }
        }
        if (packageType === 'zip') {
            try {
                const path = await apis.downloadLatest({
                    'uid': '123',
                    'packageType': 'zip'
                })
                tools.downloadFile(path)
            } catch (error) {
                // emit("setTipContext", error.message + "!☹️")
                console.log(error.message);
            }
        }

        return
    }

    if (packageType === 'installer') {

        try {
            const path = await apis.downloadHistory({
                'uid': '123',
                'version': version,
                'packageType': packageType
            })
            tools.downloadFile(path)
            return
        } catch (error) {
            console.log(error.message);
        }
    }

    if (packageType === 'zip') {
        try {
            const path = await apis.downloadHistory({
                'uid': '123',
                'version': version,
                'packageType': packageType
            })
            tools.downloadFile(path)
            return
        } catch (error) {
            console.log(error.message);
        }
    }



}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/card.scss" as *;
</style>