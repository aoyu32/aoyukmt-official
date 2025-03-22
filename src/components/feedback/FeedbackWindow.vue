<template>
    <div class="feedback-window">
        <Message :messageContent="tipContext" :isShowMessage="feedbackStore.showTip" :topOffset="'70px'" />
        <!-- 反馈会话区域 -->
        <div v-for="session in feedbackStore.feedbackSessions" :key="session.id">
            <!-- 反馈选择组件 -->
            <div class="feedback-left">
                <FeedbackSelect @setSelectOption="(option) => handleSelectOption(session.id, option)"
                    :currentOption="session.selectedOption" />
            </div>

            <!-- 反馈表单组件，仅在有选择时显示 -->
            <div class="feedback-right" v-if="session.selectedOption">
                <FeedbackForm :formData="session.formData" :feedbackType="session.selectedOption"
                    :defaultUserName="userData.user.name" @update-form="(data) => updateFormData(session.id, data)"
                    @reset-form="() => resetForm(session.id)" @submit-form="() => submitForm(session.id)"
                    @show-tip="showTip" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useFeedbackStore } from '@/stores/feedback';
import FeedbackSelect from './FeedbackSelect.vue';
import FeedbackForm from './FeedbackForm.vue';
import { userStore } from '@/stores/user';
import Message from '../common/Message.vue';


const feedbackStore = useFeedbackStore();
const userData = userStore()

onMounted(() => {
    // 页面加载时，如果没有会话，创建一个新会话
    if (feedbackStore.hasNoSessions) {
        feedbackStore.createSession();
    }
});

//是否显示提示内容
const tipContext = ref("")
const showTip = (value) => {
    feedbackStore.setShowTip()
    tipContext.value = value

}

// 处理选择反馈类型
const handleSelectOption = (sessionId, option) => {
    feedbackStore.updateSessionOption(sessionId, option);
};

// 更新表单数据
const updateFormData = (sessionId, formData) => {
    feedbackStore.updateSessionForm(sessionId, formData);
};

// 重置表单
const resetForm = (sessionId) => {
    feedbackStore.resetSession(sessionId);
};

// 提交表单
const submitForm = (sessionId) => {
    // 处理表单提交逻辑，例如发送到服务器
    const session = feedbackStore.feedbackSessions[sessionId];
    setTimeout(() => {
        // 提交成功后，可以创建新的会话
        // feedbackStore.createSession();
    },2000)

};
</script>

<style scoped lang="scss">
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.feedback-window {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding: 10px 15px;

    @media (max-width: 768px) {
        max-width: 100%;
    }

    .feedback-left {
        width: 100%;
        display: flex;
        justify-content: start;
    }

    .feedback-right {
        width: 100%;
        display: flex;
        justify-content: end;
        padding: 5px 0;
    }
}
</style>