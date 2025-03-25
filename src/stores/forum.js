import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useForumStore = defineStore('forum', () => {

    //存储用户上传的文件
    const uploadFiles = ref([])

    //判断上传的文件是否为空
    const isUploadFilesEmpty = computed(() => uploadFiles.value.length === 0)

    //添加一个文件
    const setUploadFiles = (file) => {
        uploadFiles.value.push(file)
    }

    //根据index移除一个文件
    const removeUploadFiles = (index) => {
        uploadFiles.value.splice(index, 1)
    }


    return {
        uploadFiles,
        isUploadFilesEmpty,
        setUploadFiles,
        removeUploadFiles,
    }


})