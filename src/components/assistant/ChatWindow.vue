<template>
    <div class="chat-window lenis" id="chat-window" ref="chatWindow">
        <Message :messageContent="tipContext" :isShowMessage="assistantStore.showTip" :messagePosition="'absolute'" />
        <ChatMessage v-for="(item, index) in assistantStore.chatMessages" :key="index" :messageData="item" />
    </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import ChatMessage from './ChatMessage.vue';
import { useAssistantStore } from "@/stores/assistant";
import Message from '../common/Message.vue';
import { scrollTo } from '@/utils/scroll';

const chatWindow = ref(null)
const assistantStore = useAssistantStore()
const tipContext = ref('不输入内容休想发送消息! 😛')
//提示消息状态
onMounted(() => {
    scrollToBottom()
})

//渲染消息气泡
// 监听 chatMessages 的变化，滚动到底部
watch(
    () => assistantStore.chatMessages,
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
}
</style>
