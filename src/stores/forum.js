import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import tools from "@/utils/tools";

export const useForumStore = defineStore('forum', () => {

    //存储用户上传的文件
    const uploadFiles = ref([])
    //存储用户发送的消息
    const messages = ref([])
    //控制是否显示提示消失
    const showTip = ref(false)

    //判断上传的文件是否为空
    const isUploadFilesEmpty = computed(() => uploadFiles.value.length === 0)


    //判断消息是否为空
    const isMessagesEmpty = computed(() => messages.value.length === 0)

    //添加一个文件
    const setUploadFiles = (file) => {
        uploadFiles.value.push(file)
    }

    //根据index移除一个文件
    const removeUploadFiles = (index) => {
        uploadFiles.value.splice(index, 1)
    }

    //清理所有上传的文件
    const clearUploadFiles = () => {
        uploadFiles.value = []
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
        uploadFiles,
        isUploadFilesEmpty,
        messages,
        showTip,
        isMessagesEmpty,
        addMessage,
        setUploadFiles,
        removeUploadFiles,
        setShowTip,
        clearUploadFiles

    }


})