<template>
    <div class="feedback-window" ref="feedbackWindowRef">
        <Message message-position="absolute" ref="messageRef" />

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
                    @update-form="(data) => updateFormData(session.id, data)" @reset-form="() => resetForm(session.id)"
                    @submit-form="() => submitForm(session.id)" @show-tip="showTip" :isFormSubmit="session.isSubmit"
                    @set-anonymous="handleSetAnonymous(session)" :hasLogin="userData.hasLogin"
                    :after-submit="submitResultContext" />
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
import { ref, onMounted, nextTick, watch, computed } from 'vue';
import { useFeedbackStore } from '@/stores/feedback';
import FeedbackSelect from './FeedbackSelect.vue';
import FeedbackForm from './FeedbackForm.vue';
import { userStore } from '@/stores/user';
import CurrentTime from '../common/CurrentTime.vue';
import tools from '@/utils/tools';
import { scrollTo } from '@/utils/scroll';
import { apis } from '@/api/api';


const feedbackWindowRef = ref(null)
const messageRef = ref(null)

const feedbackStore = useFeedbackStore();
const userData = userStore()
const submitResultContext = ref("")

onMounted(() => {
    nextTick(() => {
        scrollTo('bottom', 150, feedbackWindowRef.value)
    });
});

//请求反馈历史
const requestFeedback = async () => {
    //登录了再查询所有反馈
    try {
        const resp = await apis.feedbackList()
        console.log("服务端返回的反馈列表数据：", resp);
        console.log("服务端是否返回了数据：", resp);

        if (resp.length === 0) {
            // 页面加载时，如果没有会话，创建一个新会话
            if (feedbackStore.hasNoSessions) {
                addFeedbackSession()
            }
        } else {
            console.log("数据类型", typeof (resp));

            //构建反馈会话数据
            resp.forEach((el, index) => {
                const sessionId = feedbackStore.createSession()
                const feedbackSession = feedbackStore.feedbackSessions[sessionId]
                feedbackSession.id = index
                feedbackSession.selectedOption = switchFeedbackType(el.type)
                feedbackSession.isSubmit = true
                feedbackSession.submitTime = el.createTime
                //处理文件列表
                const fileNames = el.attachments.map(fileName => new File([""], fileName))
                feedbackSession.formData.attachments = fileNames
                feedbackSession.formData.content = el.content
                feedbackSession.formData.username = el.responder
            })
            feedbackStore.showAddButton = true
        }
    } catch (error) {
        console.log(error);
    }
}

const showTip = (value) => {
    messageRef.value.show(value)
}

// 处理选择反馈类型
const handleSelectOption = (sessionId, option) => {
    feedbackStore.updateSessionOption(sessionId, option);
};

//监听设置匿名
const handleSetAnonymous = (session) => {
    if (!session.isSubmit) {
        session.formData.username = 'anonymous'
        return
    }
}

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

    requestSubmitFeedback(sessionId)
    setTimeout(() => {
        feedbackStore.setFormSubmitTime(sessionId, tools.getFormatDate('yyyy-mm-dd HH:MM:SS'))
        feedbackStore.setAddButton(true)
    }, 1600)
};

//请求提交反馈
const requestSubmitFeedback = async (sessionId) => {
    const feedbackData = feedbackStore.getFeedbackSessionData(sessionId)
    console.log("要提交的反馈会话数据：", feedbackData);
    //构建请求数据
    const requestFormData = new FormData()
    requestFormData.append('type', switchFeedbackType(feedbackData.selectedOption))
    requestFormData.append('content', feedbackData.formData.contentisFormSubmit)
    requestFormData.append('responder', feedbackData.formData.username)
    feedbackData.formData.attachments.forEach(element => {
        requestFormData.append('files', element)
    });
    try {
        console.log("请求的数据", requestFormData);
        const resp = await apis.feedback(requestFormData)
        console.log("服务端响应反馈结果：", resp);
        submitResultContext.value = "你的反馈卡片已经成功送达✅"
        feedbackStore.setFormSubmit(sessionId)
    } catch (error) {
        submitResultContext.value = error.message + "❌"
        feedbackStore.feedbackSessions[sessionId].isFormSubmit = false

    }
}

const switchFeedbackType = (selectOption) => {
    const map = new Map()
    map.set('suggestions', "有意见或建议")
    map.set('bug', "提交应用 Bug")
    map.set('feature', "有功能需求")
    map.set('other', "其他")
    const reverseMap = new Map();
    for (const [key, value] of map.entries()) {
        reverseMap.set(value, key);
    }

    return map.get(selectOption) || reverseMap.get(selectOption);
}

//添加一个反馈会话
const addFeedbackSession = () => {
    const sessionId = feedbackStore.createSession()
    feedbackStore.feedbackSessions[sessionId].formData.username = userData.user.username
    feedbackStore.setAddButton(false)
}

//监听窗口里的内容将窗口滚动到底部
watch(() => feedbackStore.feedbackSessions, () => {
    // 使用 nextTick 确保 DOM 更新完成后再滚动
    nextTick(() => {
        scrollTo('bottom', 150, feedbackWindowRef.value)
    });
}, { deep: true })

//监听登录
watch(() => userData.hasLogin, (newValue) => {
    feedbackStore.clearFeedbackSessions()
    if (newValue) {
        if (feedbackStore.hasNoSessions) {
            requestFeedback()
        }
    } else {
        addFeedbackSession()
    }
}, { immediate: true })

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