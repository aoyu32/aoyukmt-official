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
            <div class="message-container" :style="messageContainerStyle">
                <!-- 消息内容 -->
                <div class="message-content">
                    <!-- 文本和图片容器 -->
                    <div class="text-img" :style="textImgStyle" v-if="contentType">
                        <!-- 图片 -->
                        <div class="img single-img" v-if="!isImgEmpty">
                            <img :src="img" alt="" v-for="(img, index) in message.content.img" :key="index"
                                :style="imageStyle">
                        </div>
                        <!-- 文本 -->
                        <div class="text">
                            {{ message.content.text }}
                        </div>
                    </div>
                    <!-- 文档 -->
                    <div class="document" v-else>
                        <MarkdownViewer :markdown-file="message.content.docs" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import MarkdownViewer from '../common/MarkdownViewer.vue';
const props = defineProps({
    message: {
        type: Object,
        default: ""
    }
})

//判断是否发送了图片
const isimgempty = computed(() => {
    return props.message.content.img.length === 0
})


//判断发送的是否是文本+图片类型的消息
const contentType = computed(() => {
    return props.message.content.type === 'img'
})

const imageStyle = computed(() => {
    const onlyOneImg = props.message.content.img.length === 1
    return {
        width: onlyOneImg ? '300px' : 'auto'
    }
})

const messageContainerStyle = computed(() => {
    if (!contentType.value) return
    const onlyOneImg = props.message.content.img.length === 1
    const hasText = props.message.content.text === ''
    return {
        padding: onlyOneImg && hasText ? '0px' : '10px',
        border: onlyOneImg && hasText ? 'none' : '1px solid $theme-primary',
        backgroundColor: onlyOneImg && hasText ? 'transparent' : '$theme-secondary'
    }
})

const textImgStyle = computed(() => {
    const hasText = props.message.content.text !== ''
    return {
        gap: hasText ? '0px' : '10px'
    }
})


onMounted(() => {
    console.log("父组件 传递来的消息数据：", props.message.content);
})
</script>
<style scoped lang="scss">
@use "@/assets/styles/forum/message.scss" as *;
</style>
