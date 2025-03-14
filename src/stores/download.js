import { defineStore } from "pinia";
import { ref, computed } from "vue"

export const useDownloadStore = defineStore('download', () => {

    //安装包下载链接
    const installerUrl = ref("")
    //压缩包下载链接
    const zipPackageUrl = ref("")

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

    return {
        installerUrl,
        zipPackageUrl,
        isInstallUrlEmpty,
        isInstallUrlEmpty,
        setInstallUrl,
        setZipPackageUrl
    }

})