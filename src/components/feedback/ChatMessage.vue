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

        <div class="content" v-if="hasText" ref="messageContainer" v-html="messageContent"></div>
        <div class="loadding" v-else>
          <!-- <img :src="loadding" alt=""> -->
          <div class="loadding-container">
            <!-- 波浪线效果 -->
            <!-- 其他用法 -->
            <Loadding animation-type="zoom" text="LOADDING" />
          </div>
        </div>
      </div>
      <div class="time">{{ messageData.date }}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, nextTick, watch, ref, computed } from "vue";
import { marked } from "marked";
import { useFeedbackStore } from "@/stores/feedback";
import aoyukmtAvatar from '@/assets/avatar/aoyukmt-avatar.svg'
import hljs from 'highlight.js';
import "highlight.js/styles/atom-one-light.css";
import Loadding from "@/components/feedback/Loadding.vue";

const feedbackStore = useFeedbackStore()
const officialName = ref("AOYUKMT智能助手📫")
const messageContainer = ref(null); // 代码块容器
// 接收父组件传递的 messageData
const props = defineProps({
  messageData: {
    type: Object,
    required: true
  }
});
// 配置 marked


marked.setOptions({
  highlight: (code, lang) => {
    const validLang = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language: validLang }).value;
  }
});

// Markdown 转换为 HTML
const messageContent = computed(() => {
  return props.messageData.isUser ? props.messageData.text : marked(props.messageData.text);
});



// 封装代码高亮方法
const applyHighlight = async () => {
  await nextTick(); // 确保 DOM 已更新
  messageContainer.value?.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el); // 重新高亮代码
  });
};

// 监听 Markdown 内容变化，触发代码高亮
watch(messageContent, applyHighlight);

// 当组件挂载 & 重新挂载（路由切换返回时）时，重新执行高亮
onMounted(applyHighlight);
onUpdated(applyHighlight); // 组件更新时，确保代码高亮
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