<template>
  <div class="feedback">
    <div class="main-content">
      <!-- 头部 -->
      <div class="feedback-header">
        <h2>{{ title }}</h2>
        <p>感谢您的访问，请告诉我们您的想法或遇到的问题。</p>
      </div>
      <!-- 聊天窗口容器 -->
      <div class="feedback-chat-window">
        <div class="window">
          <FeedbackWindow />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import FeedbackWindow from '@/components/feedback/FeedbackWindow.vue';
import { useFeedbackStore } from '@/stores/feedback';
const title = ref("意见 📭 反馈")
const feedbackStore = useFeedbackStore()
title.value = computed(() => {
  return feedbackStore.submitFeedbackCount > 0 ? "意见 📬 反馈" : "意见 📭 反馈"
})

</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.feedback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .main-content {
    width: 100%;
    height: 95%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: $theme-background;
    border: 2px solid $theme-primary;
    position: relative;

    .feedback-header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid $theme-primary;

      h2 {
        color: $theme-primary;
      }

      p {
        color: $theme-font-gray;
        padding-top: 5px;
      }


    }

    .feedback-chat-window {
      width: 100%;
      height: 100%;
      display: flex;
      flex: 7;
      overflow: hidden;

      .window {
        width: 100%;
        height: 100%;

      }
    }



    .feedback-user-input {

      width: 100%;
      display: 1;

    }
  }

}
</style>