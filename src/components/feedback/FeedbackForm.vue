<template>
    <div class="feedback-card">
        <div class="feedback-form" :class="{ 'submit': isSubmitComplete }">
            <!-- 表单头部，显示下边框，实现分割线 -->
            <div class="form-header">
                <div class="card-title">
                    <h3>{{ cardLabel }}</h3>
                    <div class="option-type">{{ feedbackType }}</div>
                </div>
            </div>

            <!-- 用户信息部分 -->
            <div class="user-info">
                <div class="user-info-label">
                    <label>{{ nameLabel }}</label>
                    <button @click="setAnonymous"><i class="iconfont icon-suiji-active"></i></button>
                </div>
                <div class="name-input">
                    <input type="text" v-model="formData.username" ref="inputRef" :disabled="isSubmitComplete"
                        class="input" :class="{ 'submit': isSubmitComplete }">
                    <div class="clear-username" v-show="formData.username && !isSubmitComplete">
                        <button @click="resetUsername">
                            <i class="iconfont icon-close"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 表单内容部分 -->
            <div class="form-body">
                <!-- 附件部分 -->
                <template v-if="shouldShowAttachments">
                    <label>{{ attachedLabel }}</label>
                    <div class="body-file">
                        <div class="file-list" :class="{ 'submit': isSubmitComplete }" v-if="hasAttachments">
                            <div v-for="(file, index) in formData.attachments" :key="index" class="file-item">
                                <span>{{ file.name }}</span>
                                <button @click="removeFile(index)" class="remove-btn" v-if="!isSubmitComplete">
                                    <i class="iconfont icon-close"></i>
                                </button>
                            </div>
                            <div class="add-clear-btn" v-if="!isSubmitComplete">
                                <button @click="triggerFileUpload" class="add-more-btn">添加更多</button>
                                <button @click="clearFile" class="clear-btn">重置上传</button>
                            </div>
                        </div>
                        <div class="upload-box" @click="triggerFileUpload" v-else>
                            <div class="upload-icon">
                                <i class="iconfont icon-add"></i>
                            </div>
                        </div>
                        <input type="file" hidden multiple @change="handleFileUpload" ref="fileUploadInput" />
                    </div>
                </template>

                <!-- 内容/消息部分 -->
                <template v-if="shouldShowContent">
                    <label>{{ contentLabel }}</label>
                    <div class="body-content" :class="{ 'submit': isSubmitComplete }">
                        <div class="button-container" v-if="formData.content && !isSubmitComplete">
                            <button class="clear-content-btn" @click="resetContent">重置</button>
                        </div>
                        <textarea v-model="formData.content" placeholder="请输入您的反馈内容..." @input="autoResize"
                            ref="feedbackTextarea" :disabled="isSubmitComplete"></textarea>
                    </div>
                </template>
            </div>
        </div>

        <!-- 提交部分 -->
        <div class="feedback-submit">
            <div class="submit-btn" v-if="!isSubmit">
                <button @click="submitForm">发送</button>
                <button @click="resetForm">重置</button>
            </div>
            <div class="submit-success" :style="{ 'padding': !isArrived ? '10px 0' : '0' }" v-else>
                <span class="airplane" @animationend="handleAnimationEnd" v-if="!isArrived">{{ sendIcon }}</span>
                <span class="success-text" v-else>{{ submitResult.message }}</span>
                <button @click="submitForm" v-if="isSubmitComplete">{{ submitResult.result ? "撤销" : "重新发送" }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 接收父组件的数据
const props = defineProps({
    formData: {
        type: Object,
        required: true, // 确保父组件必须传递 formData
    },
    feedbackType: {
        type: String,
        required: true,
    },
    defaultUsername: {
        type: String,
        default: "",
    },
    hasLogin: {
        type: Boolean,
        default: false
    },
    isSubmit: {
        type: Boolean,
        deault: false
    },
    submitResult: {
        type: Object,
        deault: () => {
            return {
                result: false,//提交反馈的结果
                message: ""//提交反馈结果后的提示
            }
        }
    }
});

// 向父组件传递数据的事件
const emit = defineEmits(['update-form', 'reset-form', 'submit-form', 'show-tip', 'set-anonymous']);

// 直接使用父组件传递的 formData
const formData = props.formData;

// 计算属性
const hasAttachments = computed(() => formData.attachments.length !== 0);
const shouldShowAttachments = computed(() => hasAttachments.value || !isSubmitComplete.value);
const shouldShowContent = computed(() => formData.content || !isSubmitComplete.value);
const isArrived = ref(false);
const isSubmitComplete = computed(() => isArrived.value && props.submitResult.result);
// 处理用户名
onMounted(() => {
    if (props.submitResult.result) {
        isArrived.value = true;
    }
    // 初始调整大小
    autoResize();

    // 添加窗口大小变化监听，确保在屏幕尺寸变化时重新计算
    window.addEventListener('resize', autoResize);
});

// 在组件卸载时移除监听器
onUnmounted(() => {
    window.removeEventListener('resize', autoResize);
});

// 重置用户名
const inputRef = ref(null);
const resetUsername = () => {
    formData.username = '';
    inputRef.value.focus();
};

// 处理附加文件
const fileUploadInput = ref(null);
// 触发上传输入框
const triggerFileUpload = () => {
    fileUploadInput.value.click();
};
// 监听文件上传
const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    formData.attachments = [...formData.attachments, ...files];
};

// 移除某个上传的文件
const removeFile = (index) => {
    formData.attachments.splice(index, 1);
};
// 清除所有上传的文件
const clearFile = () => {
    formData.attachments = [];
};

// 处理反馈内容
const feedbackTextarea = ref(null);

// 重置输入的反馈内容
const resetContent = () => {
    formData.content = '';
    feedbackTextarea.value.focus();
    resetTextarea();
};

//填充匿名名称
const setAnonymous = () => {
    emit('set-anonymous')
}

// 自动设置textarea高度
const autoResize = () => {
    const textarea = feedbackTextarea.value;
    if (textarea) {
        // 先重置高度，确保正确计算
        textarea.style.height = 'auto';

        // 获取内容高度
        const scrollHeight = textarea.scrollHeight;

        // 设置新高度，确保不超过最大高度
        const maxHeight = 500; // 与CSS中的max-height保持一致

        if (scrollHeight > maxHeight) {
            textarea.style.height = maxHeight + 'px';
            textarea.style.overflowY = 'auto'; // 内容超出时启用滚动
        } else {
            textarea.style.height = scrollHeight + 'px';
            textarea.style.overflowY = 'hidden'; // 内容未超出时隐藏滚动条
        }
    }
};

// 重置textarea的高度
const resetTextarea = () => {
    if (feedbackTextarea.value) {
        feedbackTextarea.value.style.height = 'auto';
    }
};

// 提交表单
const submitForm = () => {
    if (!props.hasLogin) {
        emit('show-tip', "你还没有登录，请先登录！");
        return
    }
    if (!formData.content && formData.attachments.length === 0) {
        emit('show-tip', "请您输入反馈内容或上传附件!🤨");
        return;
    }
    emit('submit-form');
    console.log("反馈数据是否提交成功", props.submitResult.result);

};

// 重置表单
const resetForm = () => {
    formData.username = "";
    formData.attachments = [];
    formData.content = "";
    resetTextarea();
    emit('reset-form');
};

// 监听飞机动画完成
const handleAnimationEnd = () => {
    setTimeout(() => {
        isArrived.value = true;
        setTimeout(() => {
            isArrived.value = true;
        }, 300);
    }, 100);
};

// 表单里的标签
// const cardLabel = ref("📑反馈卡片");
const nameLabel = ref("🧸用户名称：");
const attachedLabel = ref("📜附加文件：");
const contentLabel = ref("📝反馈内容：");
const sendIcon = ref("🦟")

//根据反馈类型设置cardLabel的标签
const cardLabel = computed(() => {
    let icon = ''
    switch (props.feedbackType) {
        case "有意见或建议":
            icon = '💡'
            sendIcon.value = '🚁'
            break
        case "提交应用 Bug":
            icon = '🐞'
            sendIcon.value = '🚗'
            break
        case "有功能需求":
            icon = '⚙️'
            sendIcon.value = '🛵'
            break
        case "其他":
            icon = '🦉'
            sendIcon.value = '🚴'
            break
        default:
            icon = '📑'
            break
    }

    return icon + " 反馈卡片"

})
</script>

<style scoped lang="scss">
@use "@/assets/styles/feedback/form.scss" as *;
</style>