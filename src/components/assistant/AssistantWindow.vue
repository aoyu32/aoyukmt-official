<template>
    <div class="assistant-window" id="chat-window" ref="chatWindow">
        <div class="assistant-messages">
            <AssistantMessage v-for="(item, index) in assistantStore.chatMessages" :key="index" :messageData="item" />
        </div>
        <div class="history" v-show="isDisplayHistroy">
            <div class="assistant-history" :style="{ 'height': histroyHeight }">
                <AssistantHistoryBar @hide-histroy="handleHideHistroy" />
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import AssistantMessage from './AssistantMessage.vue';
import { useAssistantStore } from "@/stores/assistant";
import { scrollTo } from '@/utils/scroll';
import AssistantHistoryBar from './AssistantHistoryBar.vue';

const chatWindow = ref(null)
const assistantStore = useAssistantStore()
const histroyHeight = ref('')
const isDisplayHistroy = ref(false)

const props = defineProps({
    displayHistroy: {
        type: Boolean,
        default: false
    }
})

watch(() => props.displayHistroy, (newValue) => {
    isDisplayHistroy.value = newValue
}, { immediate: true })


//提示消息状态
onMounted(() => {
    scrollToBottom()
    // histroyHeight.value = `${chatWindow.value.clientHeight}px`
    // window.addEventListener('resize', handleResize);
})

const handleResize = () => {
    histroyHeight.value = `${chatWindow.value.clientHeight}px`
}

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

const emit = defineEmits(["display-histroy-btn"])
const handleHideHistroy = () => {
    isDisplayHistroy.value = false
    emit("display-histroy-btn")
}


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
    gap: 1rem;
    height: 100%;
    position: relative;
    // flex-direction: column;



    .assistant-messages {
        width: 100%;
        height: 100%;
        flex: 1;
        // background-color: antiquewhite;
    }

    .history {
        width: 250px;
        position: sticky;
        top: 0; // 固定在顶部
        right: 0; // 固定在右侧
        height: 100%; // 高度与父元素一致
        align-self: flex-start; // 避免被拉伸

        .assistant-history {
            border-radius: 12px;
            background-color: $theme-background-light;
            height: 100%; // 高度与父元素一致
        }
    }

}

@media (max-width:1000px) {
    .assistant-window {
        padding: 20px;
        position: relative;
        height: 100%;

        .assistant-messages {
            width: 100%;
            flex: 1;
        }

        .history {
            position: absolute;
            right: 0;
            height: 100%;
            z-index: 10;
            width: 250px;


            .assistant-history {
                position: fixed;
                border-radius: 12px;
                bottom: 20px;
                top: 72px;
                width: 250px;
            }
        }
    }
}
</style>
