import { defineStore } from "pinia";

export const useFeedbackStore = defineStore('feedback', {
    state: () => ({
        images: [],//预览图片
        userMessages: [],//用户发发送德消息
        officialMessage: [],//官方回复德消息
        showTip: false//是否显示提示文字
    }),
    getters: {
        imagesCount: (state) => state.images.length,
        userMessagesCount: (state) => state.userMessages.length,
        officialMessageCount: (state) => state.officialMessage.length
    },
    actions: {
        setTextMessage(message) {
            this.textMessage = message
        },
        //添加图片
        addImage(img) {
            //生成唯一id
            const imageId = Date.now() + Math.random().toString(36).substr(2, 9)
            const imageWithId = {
                ...img,
                id: imageId
            }
            this.images.push(imageWithId)
            return imageId
        },
        //移除图片
        removeImage(imageId) {
            // 通过ID查找索引并删除
            const index = this.images.findIndex(img => img.id === imageId);
            if (index !== -1) {
                this.images.splice(index, 1);
            }
        },
        //清除用户输入的消息和图片
        clearAll() {
            this.textMessage = ''
            this.images = []
        },
        //显示隐藏提示
        SetShowTip() {
            this.showTip = true
            //1.5s后隐藏
            setTimeout(() => {
                this.showTip = false
            }, 1500);
        },
        //判断消息和图片是否为空
        isEmpty(msg) {
            console.log("用户输入的：", msg);

            return ((!msg || !msg.trim()) && this.images.length === 0)
        },
        //添加用户消息
        addUserMessage(msg) {
            this.userMessages.push(msg)
        },
        //添加官方消息
        addOfficialMessage(msg) {
            this.officialMessage.push(msg)
        }


    }
})