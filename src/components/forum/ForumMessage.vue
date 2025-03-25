<template>
    <div class="forum-message">
        <!-- 头像 -->
        <div class=" avatar">
            <img src="@/assets/aoyukmt.png">
        </div>
        <!-- 消息 -->
        <div class="message">
            <!-- 用户名容器 -->
            <div class="name-container">
                <span>🕸️</span>
                <span> aoyukmt</span>
            </div>
            <!-- 消息容器 -->
            <div class="message-container">
                <MarkdownViewer :docs-url="url"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import MarkdownViewer from '../common/MarkdownViewer.vue';
const url = ref("http://localhost:8080/docs/manual/intro.md")


</script>

<style lang="scss" scoped>
@use "@/assets/styles/forum/message.scss" as *;
</style>