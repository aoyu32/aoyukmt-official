<template>
    <div class="assistant">

        <div class="main-content" id="main-content" @dragover="handleImageDragover" @drop="handleImageDrop">
            <Message :messagePosition="'absolute'" :topOffset="'10px'" ref="messageRef" />
            <div class="chat-container active">
                <div class="window-header">
                    <button class="chat-histroy-btn" @click="handleDisplayHistoryBar" v-show="displayBtn"><i
                            class="iconfont icon-direction-left"></i></button>
                </div>
                <AssistantWindow :display-histroy="!displayBtn" @display-histroy-btn="displayBtn = true" />
                <AssistantInput :files="files" @receiveUserMessage="handleUserMessage" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, provide } from "vue"

import AssistantWindow from '@/components/assistant/AssistantWindow.vue';
import AssistantInput from '@/components/assistant/AssistantInput.vue';
import { fetchChatStream } from "@/api/coze";
import { useAssistantStore } from "@/stores/assistant";
import Tools from "@/utils/tools";
import { callDashScopeStream } from "@/api/aliyun";
import SparkAIService from '@/api/spark'
import { GeminiAssistant } from '@/api/gemini'
import { userStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { assistant } from "@/api/assistant";
import { useRoute } from "vue-router";
const messageRef = ref(null)

const displayBtn = ref(true)

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
const handleUserMessage = async (msg) => {

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

    assistantStore.startStreamingOfficialMessage();

    assistantStore.isReplaying(true)
    // 请求 coze 获取流式回复
    // const stream = fetchChatStream(msg);
    //阿里云百炼通义千问
    // const stream = callDashScopeStream(msg)
    //讯飞星火大模型
    // const stream = new SparkAIService().sendMessageStream(msg)
    // Gemini大模型
    const stream = await assistant({
        id: "123456",
        message: msg
    }, userData.token)
    console.log("stream流:", stream);

    const prompt = "你是一个aoyukmt官网的助手"

    // const stream = new GeminiAssistant().chat(prompt, msg)
    const reader = stream.getReader();
    readStream(reader);
};


const handleDisplayHistoryBar = () => {
    displayBtn.value = false
}

async function readStream(reader) {
    let fullMessage = '';
    assistantStore.isReplaying(true)
    while (true) {
        const { done, value } = await reader.read();
        console.log("数据流：", value);
        console.log("是否完成：", done);


        if (done) {
            // 流式接收完成
            assistantStore.completeCurrentOfficialMessage();
            assistantStore.isReplaying(false)
            break;
        }
        fullMessage += value;
        console.log("拼接后的数据：", fullMessage);

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
@use "@/assets/styles/mixins/_tooltip-mixins.scss" as *;

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

            .window-header {
                width: 100%;
                display: flex;
                position: sticky;
                justify-content: flex-end;
                background-color: transparent;
                z-index: 100;

                .chat-histroy-btn {
                    border: none;
                    background-color: transparent;
                    right: 5px;
                    top: 5px;
                    position: absolute;
                    transform: rotate(-45deg);
                    transition: all 0.3s ease-in-out;
                    color: $theme-primary;
                    cursor: pointer;


                    .iconfont {
                        font-size: 17px;
                        @include tooltip($assistant-hover-histroy-text, right, 20px, bottom, -15px, 20px, $theme-secondary-light);

                    }

                    &:hover {
                        transform: rotate(0deg);
                        color: $theme-primary-dark;
                    }

                }
            }
        }

    }
}
</style>