import { defineStore } from "pinia";
import { ref } from 'vue'

export const useForumStore = defineStore('forum', () => {

    //存储用户上传的文件
    const uploadFiles = ref([])

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
        setUploadFiles,
        removeUploadFiles
    }


})