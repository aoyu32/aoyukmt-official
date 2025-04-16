import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import loadingGifSrc from 'W:\\w.project\\aoyukmt\\aoyukmt-official\\src\\assets\\loadding.gif'; // 引入GIF图片

export const useAssistantStore = defineStore('assistant', () => {
    // State
    const user = ref({}); // 用户信息
    const currentOfficialMessageIndex = ref(-1); // 当前正在流式接收的官方消息的索引
    const replying = ref(false); // 是否在回复中
    const images = ref([]); // 预览图片
    const chatMessages = ref([]); // 所有聊天消息
    const userMessages = ref([]); // 用户发送的消息
    const officialMessage = ref([]); // 官方回复的消息
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
        images.value.push(img);
    };

    // 移除图片
    const removeImage = (index) => {
        // 通过ID查找索引并删除
        images.value.splice(index, 1);
    };

    // 清除用户输入的消息和图片
    const clearAll = () => {
        images.value = [];
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
        // const loadingGif = `<img src="${loadingGifSrc}" alt="思考中" style="width: 40px; height: 40px; display: block; margin: 0 auto;" />`;


        const officialMsg = { text: '', img: [], date: new Date().toLocaleString(), isUser: false };
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
        isEmpty,
        addUserMessage,
        addOfficialMessage,
        startStreamingOfficialMessage,
        updateCurrentOfficialMessage,
        completeCurrentOfficialMessage,
        setShowDialog
    }
},
);