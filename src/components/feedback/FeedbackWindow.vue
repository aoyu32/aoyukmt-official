<template>
    <div class="feedback-window" ref="feedbackWindowRef">
        <Message message-position="absolute" ref="messageRef"/>

        <!-- 反馈会话区域 -->
        <div v-for="session in feedbackStore.feedbackSessions" :key="session.id">
            <!-- 反馈选择组件 -->
            <div class="feedback-left">
                <FeedbackSelect @setSelectOption="(option) => handleSelectOption(session.id, option)"
                    :currentOption="session.selectedOption" :isSubmit="session.isSubmit" />
            </div>

            <!-- 反馈表单组件，仅在有选择时显示 -->
            <div class="feedback-right" v-if="session.selectedOption">
                <FeedbackForm :formData="session.formData" :feedbackType="session.selectedOption"
                    :defaultUserName="userData.user.name" @update-form="(data) => updateFormData(session.id, data)"
                    @reset-form="() => resetForm(session.id)" @submit-form="() => submitForm(session.id)"
                    @show-tip="showTip" :isFormSubmit="session.isSubmit" />
            </div>
            <!-- 反馈提交时间 -->
            <div class="feedback-time" v-if="session.submitTime">
                <CurrentTime :currentTime="session.submitTime" />
            </div>
            <!-- 继续反馈 -->
            <div class="add-feedback" v-if="feedbackStore.showAddButton">
                <button @click="addFeedbackSession">
                    再次反馈😄
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useFeedbackStore } from '@/stores/feedback';
import FeedbackSelect from './FeedbackSelect.vue';
import FeedbackForm from './FeedbackForm.vue';
import { userStore } from '@/stores/user';
import CurrentTime from '../common/CurrentTime.vue';
import tools from '@/utils/tools';
import { scrollTo } from '@/utils/scroll';


const feedbackWindowRef = ref(null)
const messageRef = ref(null)

const feedbackStore = useFeedbackStore();
const userData = userStore()

onMounted(() => {
    // 页面加载时，如果没有会话，创建一个新会话
    if (feedbackStore.hasNoSessions) {
        feedbackStore.createSession();

    }

    nextTick(() => {
        scrollTo('bottom', 150, feedbackWindowRef.value)
    });
});

//监听窗口里的内容将窗口滚动到底部
watch(() => feedbackStore.feedbackSessions, () => {
    // 使用 nextTick 确保 DOM 更新完成后再滚动
    nextTick(() => {
        scrollTo('bottom', 150, feedbackWindowRef.value)
    });
}, { deep: true })


const showTip = (value) => {
    messageRef.value.show(value)
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
    feedbackStore.setFormSubmit(sessionId)
    setTimeout(() => {
        feedbackStore.setFormSubmitTime(sessionId, tools.getFormatDate('yyyy-mm-dd HH:MM:SS'))
        feedbackStore.setAddButton(true)
    }, 1600)
};

//添加一个反馈会话
const addFeedbackSession = () => {
    feedbackStore.createSession()
    feedbackStore.setAddButton(false)
}
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
    overflow: hidden;
    overflow-y: auto;

    .feedback-left {
        width: 100%;
        display: flex;
        justify-content: start;
        margin-bottom: 10px;
    }

    .feedback-right {
        width: 100%;
        display: flex;
        justify-content: end;
        padding: 5px 0;
    }

    .add-feedback {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 15px;
        animation: floating 3s ease-in-out infinite;

        button {
            padding: 5px 15px;
            border: none;
            color: $theme-font-light;
            background-color: $theme-primary;
            transition: all 0.3s ease-in-out;

            &:hover {
                cursor: pointer;
                background-color: $theme-primary-hover-dark;
            }
        }





    }


}
</style>