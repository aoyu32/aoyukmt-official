<template>
    <div class="assistant-window" id="chat-window" ref="chatWindow">
        <Message :messageContent="tipContext" :isShowMessage="assistantStore.showTip" :messagePosition="'absolute'" />
        <AssistantMessage v-for="(item, index) in assistantStore.chatMessages" :key="index" :messageData="item" />
    </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import AssistantMessage from './AssistantMessage.vue';
import { useAssistantStore } from "@/stores/assistant";
import Message from '../common/Message.vue';
import { scrollTo } from '@/utils/scroll';

const chatWindow = ref(null)
const assistantStore = useAssistantStore()
const tipContext = ref('不输入内容休想发送消息!😛')
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
    scrollTo('bottom', 150, chatWindow.value)
};

</script>
<style lang="scss" scoped>
.assistant-window {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
