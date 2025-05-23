import { defineStore } from "pinia";
import { ref, computed } from 'vue';

export const useFeedbackStore = defineStore('feedback', () => {
    // 存储反馈会话，每个会话包含选择和表单数据
    const feedbackSessions = ref([]);

    //控制是否显示添加一个反馈会话按钮
    const showAddButton = ref(false)

    // 计算当前会话数量
    const sessionCount = computed(() => {
        return feedbackSessions.value.length;
    });

    // 判断是否有会话
    const hasNoSessions = computed(() => {
        return feedbackSessions.value.length === 0;
    });

    //计算提交了的反馈会话数据
    const submitFeedbackCount = computed(() => {
        let count = 0
        feedbackSessions.value.forEach(element => {
            if (element.submitTime) {
                count++
            }
        });
        return count
    })

    //设置显示添加会话按钮
    const setAddButton = (flag) => {
        showAddButton.value = flag
    }

    // 创建新会话
    const createSession = () => {
        const sessionId = feedbackSessions.value.length;
        feedbackSessions.value.push({
            id: sessionId,
            selectedOption: "",
            isSubmit: false,
            submitResult: {
                result: false,
                message: ""
            },
            submitTime: "",
            formData: {
                username: "",
                attachments: [],
                content: ""
            }
        });
        return sessionId;
    };

    // 更新会话选项
    const updateSessionOption = (sessionId, option) => {
        if (sessionId >= 0 && sessionId < feedbackSessions.value.length) {
            feedbackSessions.value[sessionId].selectedOption = option;
        }
    };

    // 更新会话表单数据
    const updateSessionForm = (sessionId, formData) => {
        if (sessionId >= 0 && sessionId < feedbackSessions.value.length) {
            feedbackSessions.value[sessionId].formData = {
                ...feedbackSessions.value[sessionId].formData,
                ...formData
            };
        }
    };

    //设置表单提交状态
    const setFormSubmit = (sessionId, submitResult) => {
        feedbackSessions.value[sessionId].isSubmit = true
        feedbackSessions.value[sessionId].submitResult = submitResult
    }

    //设置表单提交时间
    const setFormSubmitTime = (sessionId, time) => {
        feedbackSessions.value[sessionId].submitTime = time
    }

    //获取某个id的session数据
    const getFeedbackSessionData = (sessionId) => {
        return feedbackSessions.value[sessionId]
    }

    // 重置会话
    const resetSession = (sessionId) => {
        if (sessionId >= 0 && sessionId < feedbackSessions.value.length) {
            feedbackSessions.value[sessionId].formData = {
                username: "",
                attachments: [],
                content: ""
            };
        }
    };

    //情况反馈会话
    const clearFeedbackSessions = () => {
        feedbackSessions.value = []
        showAddButton.value = false
    }

    return {
        feedbackSessions,
        sessionCount,
        hasNoSessions,
        showAddButton,
        submitFeedbackCount,
        setFormSubmit,
        createSession,
        updateSessionOption,
        updateSessionForm,
        resetSession,
        setFormSubmitTime,
        setAddButton,
        getFeedbackSessionData,
        clearFeedbackSessions
    };
});