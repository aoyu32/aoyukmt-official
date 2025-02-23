import { defineStore } from "pinia";

export const useFeedbackStore = defineStore('feedback', {
    state: () => ({
        currentOfficialMessageIndex: -1, // 当前正在流式接收的官方消息的索引
        replying: false,
        images: [],//预览图片
        chatMessages: [],//所有聊天消息
        userMessages: [],//用户发发送的消息
        officialMessage: [],//官方回复的消息
        showTip: false//是否显示提示文字
    }),
    getters: {
        imagesCount: (state) => state.images.length,
        userMessagesCount: (state) => state.userMessages.length,
        officialMessageCount: (state) => state.officialMessage.length
    },
    actions: {
        //是否在回复中
        isReplaying(isReplying) {
            this.replying = isReplying
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
            return ((!msg || !msg.trim()) && this.images.length === 0)
        },
        // 添加用户消息
        addUserMessage(msg) {
            const userMsg = { ...msg, isUser: true };
            this.userMessages.push(userMsg);
            this.chatMessages.push(userMsg); // 添加到对话序列
        },

        // 添加官方消息
        addOfficialMessage(msg) {
            const officialMsg = { ...msg, isUser: false };
            this.officialMessage.push(officialMsg);
            this.chatMessages.push(officialMsg); // 添加到对话序列
        },

        // 开始流式接收官方消息
        startStreamingOfficialMessage() {
            const officialMsg = { text: '思考中...', img: [], date: new Date().toLocaleString(), isUser: false };
            this.officialMessage.push(officialMsg);
            this.chatMessages.push(officialMsg);
            this.currentOfficialMessageIndex = this.chatMessages.length - 1; // 记录当前消息的索引
        },

        // 更新当前流式消息
        updateCurrentOfficialMessage(text) {
            if (this.currentOfficialMessageIndex !== -1) {
                this.chatMessages[this.currentOfficialMessageIndex].text = text;
            }
        },
        // 完成当前流式消息
        completeCurrentOfficialMessage() {
            this.currentOfficialMessageIndex = -1; // 重置索引
        }
    }
})