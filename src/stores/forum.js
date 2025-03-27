import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue'
import tools from "@/utils/tools";

export const useForumStore = defineStore('forum', () => {

    //上传的文件
    const uploadDocuments = ref([])
    //上传的图片
    const uploadImages = ref([])
    //存储用户发送的消息
    const messages = ref([])
    //控制是否显示提示消失
    const showTip = ref(false)

    //判断消息是否为空
    const isMessagesEmpty = computed(() => messages.value.length === 0)

    //判断是否上传了文档
    const isuploadDocumentEmpty = computed(() => uploadDocuments.value.length === 0)

    //判断是否上传了图片
    const isUploadImageEmpty = computed(() => uploadImages.value.length === 0)

    //清理所有上传的文件
    const clearUploadFiles = () => {
        uploadDocuments.value = []
        uploadImages.value = []
    }

    //添加一个文档
    const addDocument = (document) => {
        uploadDocuments.value.push(document)
    }

    //移除一个文档
    const removeDocument = (index) => {
        uploadDocuments.value.splice(index, 1)
    }

    //添加一个图片
    const addImage = (image) => {
        uploadImages.value.push(image)
    }

    //移除一个图片
    const removeImage = (index) => {
        uploadImages.value.splice(index, 1)
    }


    //设置显示消息
    const setShowTip = () => {
        showTip.value = true
        setTimeout(() => {
            showTip.value = false
        }, 1500)
    }

    //添加一条消息
    const addMessage = (msg) => {

        const userMsg = {
            id: messages.value.length,//id
            ...msg,//用户消息
            date: tools.getFormatDate("yyyy-mm-dd HH:MM:SS")//时间
        }
        messages.value.push(userMsg)
    }

    return {
        messages,
        showTip,
        isMessagesEmpty,
        uploadImages,
        uploadDocuments,
        isuploadDocumentEmpty,
        isUploadImageEmpty,
        addMessage,
        addImage,
        addDocument,
        removeImage,
        removeDocument,
        setShowTip,
        clearUploadFiles

    }


})