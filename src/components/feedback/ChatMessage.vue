<template>
    <div class="chat-message user">
      <div class="avatar">
        <img src="@/assets/avatar/aoyukmt-avatar.svg" alt="">
      </div>
      <div class="message-wrapper">
        <div class="name">test</div>
        <div class="message-content">
          <!-- 显示图片 -->
          <div v-if="hasImages" class="message-content-img">
            <img v-for="(item, index) in messageData.img" :src="item.src" :key="index" alt="">
          </div>
          <!-- 显示文本，动态计算 padding -->
          <span v-if="hasText" :style="messageTextStyle">{{ messageData.text }}</span>
        </div>
        <div class="time">{{ messageData.date }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, computed } from "vue";
  
  // 接收父组件传递的 messageData
  const props = defineProps({
    messageData: {
      type: Object,
      required: true
    }
  });
  
  // 计算是否有图片
  const hasImages = computed(() => props.messageData.img.length > 0);
  //计算是否有文本
  const hasText = computed(()=> props.messageData.text.trim())
  
  // 计算 messageText 的 padding 样式
  const messageTextStyle = computed(() => {
    return {
      padding: hasImages.value && props.messageData.text.trim()
        ? '0 10px 10px 10px' 
        : '10px'
    };
  });
  </script>
  
  <style scoped lang="scss">
  @use "@/assets/styles/feedback/message.scss" as *;
  </style>
  