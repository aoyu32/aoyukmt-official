import { defineStore } from "pinia";
import { ref, computed } from "vue"

export const useDownloadStore = defineStore('download', () => {

    //安装包下载链接
    const installerUrl = ref("")
    //压缩包下载链接
    const zipPackageUrl = ref("")
    //是否显示消息提示
    const showTip = ref(false)
    //下载卡片内容
    const downloadOptions = ref([
        {
            title: '安装版',
            description: '🔧 安装程序，适用于更复杂的安装需求',
            downloadLink: './downloads/aoyukmt_full.zip',
            animation: 'slide-right',
        },
        {
            title: '便携版',
            description: '📦 灵活：ZIP压缩包解压即用，绿色便携',
            downloadLink: './downloads/aoyukmt_portable.zip',
            animation: 'slide-left',
        }

    ]);

    const isInstallUrlEmpty = computed(() => {
        return installerUrl === ""
    })

    const isZipPackageUrlEmpty = computed(() => {
        return zipPackageUrl === ""
    })

    const setInstallUrl = (url) => {
        installerUrl.value = url
    }
    const setZipPackageUrl = (url) => {
        zipPackageUrl.value = url
    }

    const setShowTip = () => {
        showTip.value = true
        setTimeout(() => {
            showTip.value = false
        }, 1500)
    }

    return {
        installerUrl,
        zipPackageUrl,
        showTip,
        downloadOptions,
        isInstallUrlEmpty,
        isInstallUrlEmpty,
        setInstallUrl,
        setZipPackageUrl,
        setShowTip
    }

})