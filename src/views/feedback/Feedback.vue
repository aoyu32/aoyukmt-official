<template>
  <div class="feedback">
    <div class="main-content">
      <!-- 头部 -->
      <div class="feedback-header">
        <h2>意见 📭 反馈</h2>
        <p>感谢您的访问，请填写以下表单告诉我们您的想法或遇到的问题。</p>

      </div>
      <!-- 聊天窗口容器 -->
      <div class="feedback-chat-window">
        <div class="window">
          <FeedbackWindow />
        </div>
      </div>
      <!-- 输入区域 -->
      <!-- <div class="feedback-user-input">
        <div class="input">
          <FeedbackInput />
        </div>

      </div> -->
    </div>
  </div>
</template>

<script setup>
import FeedbackInput from '@/components/feedback/FeedbackInput.vue';
import FeedbackWindow from '@/components/feedback/FeedbackWindow.vue';

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
    background-color: aliceblue;
    border: 2px solid $theme-primary;

    .feedback-header {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid $theme-primary;
      // background-color: aquamarine;

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
      overflow-y: auto;

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