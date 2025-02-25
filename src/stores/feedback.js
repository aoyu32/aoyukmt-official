import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFeedbackStore = defineStore('feedback', () => {
    // State
    const user = ref({}); // 用户信息
    const currentOfficialMessageIndex = ref(-1); // 当前正在流式接收的官方消息的索引
    const replying = ref(false); // 是否在回复中
    const images = ref([]); // 预览图片
    const chatMessages = ref([]); // 所有聊天消息
    const userMessages = ref([]); // 用户发送的消息
    const officialMessage = ref([]); // 官方回复的消息
    const showTip = ref(false); // 是否显示提示文字
    const showDialog = ref(false) //是否显示修改信息弹窗

    // Getters
    const imagesCount = computed(() => images.value.length); // 图片数量
    const userMessagesCount = computed(() => userMessages.value.length); // 用户消息数量
    const officialMessageCount = computed(() => officialMessage.value.length); // 官方消息数量

    // Actions
    // 设置用户信息
    const setUser = (newUser) => {
        user.value = newUser;
    };

    // 设置是否在回复中
    const isReplaying = (isReplying) => {
        replying.value = isReplying;
    };

    // 添加图片
    const addImage = (img) => {
        // 生成唯一id
        const imageId = Date.now() + Math.random().toString(36).substr(2, 9);
        const imageWithId = {
            ...img,
            id: imageId
        };
        images.value.push(imageWithId);
        return imageId;
    };

    // 移除图片
    const removeImage = (imageId) => {
        // 通过ID查找索引并删除
        const index = images.value.findIndex(img => img.id === imageId);
        if (index !== -1) {
            images.value.splice(index, 1);
        }
    };

    // 清除用户输入的消息和图片
    const clearAll = () => {
        images.value = [];
    };

    // 显示隐藏提示
    const SetShowTip = () => {
        showTip.value = true;
        // 1.5秒后隐藏
        setTimeout(() => {
            showTip.value = false;
        }, 1500);
    };

    // 判断消息和图片是否为空
    const isEmpty = (msg) => {
        return ((!msg || !msg.trim()) && images.value.length === 0);
    };

    // 添加用户消息
    const addUserMessage = (msg) => {
        const userMsg = { ...msg, isUser: true };
        userMessages.value.push(userMsg);
        chatMessages.value.push(userMsg); // 添加到对话序列
    };

    // 添加官方消息
    const addOfficialMessage = (msg) => {
        const officialMsg = { ...msg, isUser: false };
        officialMessage.value.push(officialMsg);
        chatMessages.value.push(officialMsg); // 添加到对话序列
    };

    // 开始流式接收官方消息
    const startStreamingOfficialMessage = () => {
        const officialMsg = { text: '让我想想怎么回答...', img: [], date: new Date().toLocaleString(), isUser: false };
        officialMessage.value.push(officialMsg);
        chatMessages.value.push(officialMsg);
        currentOfficialMessageIndex.value = chatMessages.value.length - 1; // 记录当前消息的索引
    };

    // 更新当前流式消息
    const updateCurrentOfficialMessage = (text) => {
        if (currentOfficialMessageIndex.value !== -1) {
            chatMessages.value[currentOfficialMessageIndex.value].text = text;
        }
    };

    // 完成当前流式消息
    const completeCurrentOfficialMessage = () => {
        currentOfficialMessageIndex.value = -1; // 重置索引
    };

    //显示修改用户信息弹窗
    const setShowDialog = (isShow) => {
        showDialog.value = isShow
    }

    return {
        // State
        currentOfficialMessageIndex,
        user,
        replying,
        images,
        chatMessages,
        userMessages,
        officialMessage,
        showTip,
        showDialog,

        // Getters
        imagesCount,
        userMessagesCount,
        officialMessageCount,

        // Actions
        setUser,
        isReplaying,
        addImage,
        removeImage,
        clearAll,
        SetShowTip,
        isEmpty,
        addUserMessage,
        addOfficialMessage,
        startStreamingOfficialMessage,
        updateCurrentOfficialMessage,
        completeCurrentOfficialMessage,
        setShowDialog
    }
},
    {
        persist: {
            key: 'user',
            pick: ['user']
        }
    }
);