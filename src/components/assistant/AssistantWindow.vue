<template>
    <div class="assistant-window" id="chat-window" ref="chatWindow">
        <AssistantMessage v-for="(item, index) in assistantStore.chatMessages" :key="index" :messageData="item" />
    </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import AssistantMessage from './AssistantMessage.vue';
import { useAssistantStore } from "@/stores/assistant";
import { scrollTo } from '@/utils/scroll';

const chatWindow = ref(null)
const assistantStore = useAssistantStore()

//提示消息状态
onMounted(() => {
    scrollToBottom()
})

//渲染消息气泡
// 监听 chatMessages 的变化，滚动到底部
watch(
    () => assistantStore.chatMessages,
    () => {
        nextTick(() => {
            scrollToBottom();
        });
    },
    { deep: true }
);

const scrollToBottom = () => {
    scrollTo('bottom', 150, chatWindow.value)
};

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;

.assistant-window {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;


}
</style>
