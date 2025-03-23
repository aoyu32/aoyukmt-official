<template>
    <div class="forum-input" v-aos="{
        animation: 'slide-up',
        duration: 300,
    }">
        <!-- 输入区域 -->
        <div class="input-container">
            <!-- 图标区域（左上角） -->
            <div class="input-icons">
                <div class="icons">
                    <span class="icon emoji">😀</span>
                    <span class="icon more">🗂️</span>
                </div>
                <div class="font-counter">
                    <span><span class="eye">🧿</span>{{ charNumber }}</span>
                </div>
            </div>
            <!-- 输入框区域 -->
            <div class="input-textarea">
                <!-- 文本输入区域 -->
                <textarea placeholder="请输入内容..." class="textarea" ref="textareaRef" @input="handleInput"
                    v-model="userInputText"></textarea>
            </div>
            <!-- 发送按钮区域 -->
            <div class="input-send">
                <button>
                    发送
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const textareaRef = ref(null)

//监听输入框输入
const userInputText = ref("")
const handleInput = () => {
    adjustHeight()
}

//计算输入内容的字符数
const charNumber = computed(() => {
    if (!userInputText.value) {
        return
    }

    if (Array.from(userInputText.value).length > 15000) {
        return '字数超过上限'
    }
    return Array.from(userInputText.value).length;
})

//动态调整输入框的高度
const adjustHeight = () => {
    if (textareaRef.value) {
        // 先重置高度，确保正确计算
        textareaRef.value.style.height = 'auto';

        // 获取内容高度
        const scrollHeight = textareaRef.value.scrollHeight;

        // 设置新高度，确保不超过最大高度
        const maxHeight = 90;

        if (scrollHeight > maxHeight) {
            textareaRef.value.style.height = maxHeight + 'px';
            textareaRef.value.style.overflowY = 'auto';
        } else {
            textareaRef.value.style.height = scrollHeight + 'px';
            textareaRef.value.style.overflowY = 'hidden'; // 内容未超出时隐藏滚动条
        }
    }
}

</script>
<style scoped lang="scss">
@use "@/assets/styles/forum/input.scss" as *;
</style>