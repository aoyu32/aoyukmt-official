<template>
    <div class="assistant">

        <div class="main-content" id="main-content" @dragover="handleImageDragover" @drop="handleImageDrop">
            <Message :messagePosition="'absolute'" :topOffset="'10px'" ref="messageRef" />
            <div class="chat-container active">
                <AssistantWindow />
                <AssistantInput :files="files" @receiveUserMessage="handleUserMessage" v-aos="{
                    duration: 400,
                    once: true,
                    animation: 'fade-up',
                }" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue"

import AssistantWindow from '@/components/assistant/AssistantWindow.vue';
import AssistantInput from '@/components/assistant/AssistantInput.vue';
import { fetchChatStream } from "@/api/coze";
import { useAssistantStore } from "@/stores/assistant";
import Tools from "@/utils/tools";
import ModalDialog from "@/components/community/ModalDialog.vue";
import { callDashScopeStream } from "@/api/aliyun";
import SparkAIService from '@/api/spark'
import { GeminiAssistant } from '@/api/gemini'
import { userStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
const messageRef = ref(null)


const assistantStore = useAssistantStore()
const userData = userStore()


//监听文件拖动，将拖动到聊天窗口的图片传递给聊天输入框组件
//存储拖动的文件
const files = ref([])
// 处理拖动进入的事件
const handleImageDragover = (event) => {
    event.preventDefault();
}
// 处理文件放置的事件
const handleImageDrop = (event) => {
    event.preventDefault();  // 阻止默认行为
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
        files.value = Array.from(droppedFiles);  // 将文件存储在 files 中
    }
}
//接收用户发送的消息
const handleUserMessage = (msg) => {

    // 开始流式接收官方消息
    if (assistantStore.isEmpty(msg)) {
        messageRef.value.show("不输入内容休想发送消息!😛")
        return
    }
    // 发送消息并自动触发官方回复
    assistantStore.addUserMessage({
        img: assistantStore.images,
        text: msg,
        date: Tools.getFormatDate('yyyy-mm-dd')
    });

    setTimeout(() => {
        assistantStore.startStreamingOfficialMessage();
    }, 1000)

    assistantStore.isReplaying(true)
    // 请求 coze 获取流式回复
    // const stream = fetchChatStream(msg);
    //阿里云百炼通义千问
    // const stream = callDashScopeStream(msg)
    //讯飞星火大模型
    // const stream = new SparkAIService().sendMessageStream(msg)
    //Gemini大模型
    const prompt = "你是一个aoyukmt官网的助手"
    const stream = new GeminiAssistant().chat(prompt, msg)
    const reader = stream.getReader();
    readStream(reader);
};

async function readStream(reader) {
    let fullMessage = '';
    assistantStore.isReplaying(true)
    while (true) {
        const { done, value } = await reader.read();


        if (done) {
            // 流式接收完成
            assistantStore.completeCurrentOfficialMessage();
            assistantStore.isReplaying(false)
            break;
        }
        fullMessage += value;

        // 更新当前流式消息
        if (assistantStore.replying) {
            assistantStore.updateCurrentOfficialMessage(fullMessage);
        }
    }
}

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.assistant {
    width: 100%;
    height: 100%;


    .main-content {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        position: relative;

        .chat-container {
            width: 100%;
            display: flex;
            height: $percentage-height;
            position: relative;
            flex-direction: column;
            background: $theme-background;
            border-radius: 12px;
            border: 2px solid $theme-primary;
            overflow: hidden;
            animation: breathing-border 5s infinite alternate;
        }

    }
}
</style>