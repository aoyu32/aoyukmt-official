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

const scrollToBottom = (duration = 200) => {
    setTimeout(() => {
        if (chatWindow.value) {
            const start = chatWindow.value.scrollTop;
            const end = chatWindow.value.scrollHeight - chatWindow.value.clientHeight;
            const change = end - start;
            const startTime = performance.now();

            const animateScroll = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1); // 确保进度不超过1
                const amountScrolled = easeInOutQuad(progress) * change;

                chatWindow.value.scrollTop = start + amountScrolled;

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            // 缓动函数，用于平滑滚动
            const easeInOutQuad = (t) => {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };

            requestAnimationFrame(animateScroll);
        }
    }, 50); // 短暂延迟确保 DOM 已更新
};

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
