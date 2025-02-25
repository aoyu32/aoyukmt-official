<template>
    <div class="feedback">
        <div class="main-content" id="main-content" @dragover="handleImageDragover" @drop="handleImageDrop">
            <div class="chat-container active">
                <ChatWindow />
                <ChatInput :files="files" @receiveUserMessage="handleUserMessage" />
                <ModalDialog/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue"

import ChatWindow from '@/components/feedback/ChatWindow.vue';
import ChatInput from '@/components/feedback/ChatInput.vue';
import { fetchChatStream } from "@/utils/coze";
import { useFeedbackStore } from "@/stores/feedback";
import Tools from "@/utils/tools";
import ModalDialog from "@/components/feedback/ModalDialog.vue";

const feedbackStore = useFeedbackStore()

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
//接收用户发生的消息
const handleUserMessage = (msg) => {

    // 开始流式接收官方消息

    setTimeout(() => {
        feedbackStore.startStreamingOfficialMessage();
    }, 1000)

    // 请求 coze 获取流式回复
    const stream = fetchChatStream(msg);

    const reader = stream.getReader();
    readStream(reader);

};

async function readStream(reader) {
    let fullMessage = '';
    while (true) {
        const { done, value } = await reader.read();

        if (done) {
            // 流式接收完成
            feedbackStore.completeCurrentOfficialMessage();
            feedbackStore.isReplaying(false)
            break;
        }
        fullMessage += value;
        // 更新当前流式消息
        if (feedbackStore.replying) {
            feedbackStore.updateCurrentOfficialMessage(fullMessage);
        }
    }
}

//随机生成用户信息
const initUser = () => {
    feedbackStore.setUser({
        id: Tools.getRandomId(),
        name: Tools.getRandomName('user-'),
        avatar: Tools.getRandomAvatar()
    })
}

onMounted(() => {
    if (localStorage.getItem('user')===null) {
        initUser()
    }
})

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/constant.scss" as *;

.main-content {
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: hsla(0, 100%, 67%, 0.345);
    padding-top: 72px;
    align-items: center;
    justify-content: center;

    .chat-container {
        width: 1200px;
        display: flex;
        height: 95%;
        position: relative;
        flex-direction: column;
        background: #ffffff;
        border-radius: 12px;
        /* position: relative; */
        border: 2px solid $primary-color;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5);
        overflow: hidden;
        animation: breathing-border 5s infinite alternate;
    }

    @media (max-width: 1250px) {
        .chat-container {
            width: 95%;
        }

    }

}



@keyframes breathing-border {
    0% {
        box-shadow:
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(255, 255, 255, 0.5);
    }

    25% {
        box-shadow:
            0 0 10px rgba(255, 230, 230, 0.8),
            0 0 20px rgba(255, 230, 230, 0.5);
    }

    50% {
        box-shadow:
            0 0 10px rgba(255, 200, 200, 0.8),
            0 0 20px rgba(255, 200, 200, 0.5);
    }

    75% {
        box-shadow:
            0 0 10px rgba(255, 150, 150, 0.8),
            0 0 20px rgba(255, 150, 150, 0.5);
    }

    100% {
        box-shadow:
            0 0 10px rgba(255, 102, 102, 0.8),
            0 0 20px rgba(255, 102, 102, 0.5);
    }
}
</style>