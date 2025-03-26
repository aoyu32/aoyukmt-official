<template>
    <div class="forum-message">

        <!-- 头像 -->
        <div class=" avatar">
            <img :src="message.user.avatar">
        </div>
        <!-- 消息 -->
        <div class="message">
            <!-- 用户名容器 -->
            <div class="name-container">
                <span class="status">{{ message.user.status }}</span>
                <span class="name"> {{ message.user.name }}</span>
            </div>
            <!-- 消息容器 -->
            <div class="message-container">
                <div class="file" v-for="(item, index) in message.content.files" :key="index">
                    <div class="image" v-if="item.type === 'image'">
                        <img :src="item.value" alt="">
                    </div>
                    <div class="document" v-else>
                        {{ item.value }}
                    </div>
                </div>
                <div class="text">
                    {{ message.content.text }}
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import MarkdownViewer from '../common/MarkdownViewer.vue';
const props = defineProps({
    message: {
        type: Object,
        default: ""
    }
})

onMounted(() => {
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/forum/message.scss" as *;
</style>