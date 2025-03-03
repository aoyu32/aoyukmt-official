<template>
  <div class="chat-message" :class="{ 'user': messageData.isUser, 'official': !messageData.isUser }">
    <div class=" avatar" @click="ModifyUserInfo">
      <img :src="messageData.isUser ? feedbackStore.user.avatar : aoyukmtAvatar" alt="">
    </div>
    <div class="message-wrapper">
      <div class="name">{{ messageData.isUser ? "🪶" + feedbackStore.user.name : officialName }}</div>
      <div class="message-content">
        <!-- 显示图片 -->
        <div v-if="hasImages" class="message-content-img" :style="messageTextStyle">
          <img v-for="(item, index) in messageData.img" :src="item.src" :key="index" alt="">
        </div>
        <!-- 显示文本，动态计算 padding -->
        <div class="content" v-if="hasText" ref="messageContainer"
          v-html="messageData.text === '' ? '思考中' : messageContent"></div>
      </div>
      <div class="time">{{ messageData.date }}</div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed } from "vue";
import { marked } from "marked";
import { useFeedbackStore } from "@/stores/feedback";
import aoyukmtAvatar from '@/assets/avatar/aoyukmt-avatar.svg'



const feedbackStore = useFeedbackStore()
const officialName = ref("AOYUKMT智能助手📫")
// 接收父组件传递的 messageData
const props = defineProps({
  messageData: {
    type: Object,
    required: true
  }
});

//将markdown语法的消息解析为html
const messageContent = computed(() => {
  return props.messageData.isUser ? props.messageData.text : marked(props.messageData.text)
})

// 计算是否有图片
const hasImages = computed(() => props.messageData.img.length > 0);
//计算是否有文本
const hasText = computed(() => props.messageData.text.trim())

// 计算 messageText 的 padding 样式
const messageTextStyle = computed(() => {
  return {
    paddingBottom: hasImages.value && props.messageData.text.trim() && props.messageData.isUser
      ? '0.6rem'
      : '0'
  };
});

//修改用户信息
const ModifyUserInfo = () => {
  if (props.messageData.isUser) {
    feedbackStore.setShowDialog(true)
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/feedback/markdown.scss" as *;
@use "@/assets/styles/feedback/message.scss" as *;
</style>