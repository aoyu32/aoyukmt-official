<template>
    <div class="chat-window" id="chat-window">
        <div class="chat-tip" ref="chatTip" :class="{ 'show': feedbackStore.showTip, 'hide': !feedbackStore.showTip }">
            {{ tipContext }}
        </div>
        <ChatMessage v-for="(item,index) in messageData" :key="index" :messageData="item"/>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import ChatMessage from './ChatMessage.vue';
import { useFeedbackStore } from "@/stores/feedback";

const feedbackStore = useFeedbackStore()
const chatTip = ref(null)
const tipContext = ref('不输入内容休想发送消息! 😛')
//提示消息状态
onMounted(() => {
    chatTip.value.classList.remove('hide')
})

//渲染消息气泡
//将消息数据传递给聊天消息组件
const messageData = ref([])

watch(() => feedbackStore.userMessages, (newUserMessags) => {
    messageData.value = newUserMessags
},{
    immediate:true
})

</script>
<style lang="scss" scoped>
.chat-window {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: calc(100% - 100px);

    /* 提示框 */
    /* chat-tip 提示框的基本样式 */
    .chat-tip {
        display: none;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        padding: 10px 20px;
        background-color: #ff6161;
        color: white;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        max-width: 80%;
        opacity: 0;
        z-index: 10;
        box-shadow: 1px 5px 10px rgba(70, 63, 63, 0.304);
    }

    /* 提示框从上方弹出的动画 */
    @keyframes slideDown {
        0% {
            transform: translateX(-50%) translateY(-75%);
            opacity: 0;
        }

        100% {
            transform: translateX(-50%) translateY(15px);
            opacity: 1;
        }
    }

    /* 提示框收回的动画 */
    @keyframes slideUp {
        0% {
            transform: translateX(-50%) translateY(15px);
            opacity: 1;
        }

        100% {
            transform: translateX(-50%) translateY(-65%);
            opacity: 0;
        }
    }

    /* 通过弹出和收回动画显示/隐藏提示框 */
    .chat-tip.show {
        display: block;
        animation: slideDown 0.25s ease-out forwards;
    }

    .chat-tip.hide {
        display: block;
        animation: slideUp 0.25s ease-in forwards;
        pointer-events: none;
    }
}
</style>
