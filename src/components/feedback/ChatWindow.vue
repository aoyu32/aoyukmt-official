<template>
    <div class="chat-window lenis" id="chat-window" ref="chatWindow">
        <div class="chat-tip" ref="chatTip" :class="{ 'show': feedbackStore.showTip, 'hide': !feedbackStore.showTip }">
            {{ tipContext }}
        </div>
        <ChatMessage v-for="(item, index) in feedbackStore.chatMessages" :key="index" :messageData="item" />
    </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import ChatMessage from './ChatMessage.vue';
import { useFeedbackStore } from "@/stores/feedback";
import { scrollTo } from '@/utils/scroll';

const chatWindow = ref(null)
const feedbackStore = useFeedbackStore()
const chatTip = ref(null)
const tipContext = ref('不输入内容休想发送消息! 😛')
//提示消息状态
onMounted(() => {
    chatTip.value.classList.remove('hide')
    scrollToBottom()
})

//渲染消息气泡
// 监听 chatMessages 的变化，滚动到底部
watch(
    () => feedbackStore.chatMessages,
    () => {
        // 使用 nextTick 确保 DOM 更新完成后再滚动
        nextTick(() => {
            scrollToBottom();
        });
    },
    { deep: true } // 深度监听，确保消息内容更新时也能触发
);

const scrollToBottom = () => {
    // setTimeout(() => {
    scrollTo('bottom', 150, chatWindow.value)
    // }, 50); // 短暂延迟确保 DOM 已更新
};

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.chat-window {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* 提示框 */
    /* chat-tip 提示框的基本样式 */
    .chat-tip {
        display: none;
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        padding: 10px 20px;
        background-color: $theme-secondary-dark;
        color: $theme-font-light;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        max-width: 80%;
        opacity: 0;
        z-index: 10;
        box-shadow: 1px 5px 10px $theme-deep-shadow;
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
