<template>
    <div class="feedback-card">
        <div class="feedback-form">
            <!-- 表单头部，显示下边框，实现分割线 -->
            <div class="form-header">
                <div class="card-title">
                    <h3>{{ cardLabel }}</h3>
                    <!-- 反馈类型，靠右 -->
                    <div class="option-type">
                        {{ feedbackType }}
                    </div>
                </div>
            </div>
            <div class="user-info">
                <label>{{ nameLabel }}</label>
                <div class="sname-input submit">
                    <input type="text" v-model="localFormData.userName" ref="inputRef">
                    <div class="clear-username" v-show="localFormData.userName">
                        <button @click="resetUserName">
                            <i class="iconfont icon-close"></i>
                        </button>
                    </div>
                </div>
            </div>
            <!-- 表单内容 -->
            <div class="form-body">
                <label>{{ attachedLabel }}</label>
                <!-- 用户上传的附加文件，没上传时显示一个上传盒子，里面有个加号图标，上传时显示文件名称列表，响应式的，适应盒子大小 -->
                <div class="body-file">
                    <div class="file-list" v-if="localFormData.attachments.length !== 0">
                        <div v-for="(file, index) in localFormData.attachments" :key="index" class="file-item">
                            <span>{{ file.name }}</span>
                            <button @click="removeFile(index)" class="remove-btn">
                                <i class="iconfont icon-close"></i>
                            </button>
                        </div>
                        <div class="add-clear-btn">
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
                <!-- 用户输入的消息，这里没有输入框，只是实时显示用户在输入框中输入的内容 -->
                <label>{{ contentLabel }}</label>
                <div class="body-content">
                    <div class="button-container" v-if="localFormData.content">
                        <button class="clear-content-btn" @click="resetContent">重置</button>
                    </div>
                    <textarea v-model="localFormData.content" placeholder="请输入您的反馈内容..." @input="autoResize"
                        ref="feedbackTextarea"></textarea>
                </div>
            </div>
        </div>
        <div class="feedback-submit">
            <div class="submit-btn" v-if="!isSubmit">
                <button @click="submitForm">发送</button>
                <button @click="resetForm">重置</button>
            </div>
            <div class="submit-success" v-else :style="{ 'padding': !isArrived ? '10px 0' : '0' }">
                <span class="airplane" @animationend="handleAnimationEnd" v-if="!isArrived">🚁</span>
                <span class="success-text" v-else>你的反馈卡片已经成功送达✅</span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, watch, onMounted } from 'vue'

//接收父组件的数据
// 接收父组件的数据
const props = defineProps({
    formData: {
        type: Object,
        default: () => ({
            userName: "",
            attachments: [],
            content: ""
        })
    },
    feedbackType: {
        type: String,
        required: true
    },
    defaultUserName: {
        type: String,
        default: ""
    }
});

//本地表单数据
const localFormData = reactive({
    userName: "",
    attachments: [],
    content: ""
});

//向父组件传递数据的事件
const emit = defineEmits(['update-form', 'reset-form', 'submit-form', 'show-tip']);

//处理用户名
onMounted(() => {
    localFormData.userName = props.defaultUserName;
});

//重置用户名
const inputRef = ref(null)
const resetUserName = () => {
    localFormData.userName = ''
    inputRef.value.focus();

}


//处理附加文件
//上传输入框
const fileUploadInput = ref(null)
//触发上传输入框
const triggerFileUpload = () => {
    fileUploadInput.value.click()
}
//监听文件上传
const handleFileUpload = (event) => {
    console.log(event.target.files);
    //保存文件数据
    const files = Array.from(event.target.files)
    localFormData.attachments = [...localFormData.attachments, ...files];
}

//移除某个上传的文件
const removeFile = (index) => {
    localFormData.attachments.splice(index, 1);
}
//清除所有上传的文件
const clearFile = () => {
    localFormData.attachments = []
}

//处理反馈内容
const feedbackTextarea = ref(null)

//重置输入的反馈内容
const resetContent = () => {
    localFormData.content = ''
    feedbackTextarea.value.focus()
    resetTextarea()
}


//自动设置textarea高度
const autoResize = () => {
    const textarea = feedbackTextarea.value;
    if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
}

// 重置textarea的高度
const resetTextarea = () => {
    if (feedbackTextarea.value) {
        feedbackTextarea.value.style.height = 'auto';
    }
}

//提交表单
const isSubmit = ref(false)
const submitForm = () => {
    if (!localFormData.content && localFormData.attachments.length === 0) {
        emit('show-tip', "请您输入反馈内容或上传附件!🤨")
        return
    }
    emit('submit-form');
    isSubmit.value = true
}

// 重置表单
const resetForm = () => {
    localFormData.userName = "";
    localFormData.attachments = [];
    localFormData.content = "";
    resetTextarea()
    emit('reset-form');
};

//监听表单数据变化通知父组件更新数据
watch(
    () => ({ ...localFormData }),
    (newData) => {
        emit("update-form", newData);
    },
    { deep: true }
);

//监听飞机是否飞到最左边
const isArrived = ref(false)
const handleAnimationEnd = (event) => {
    setTimeout(() => {
        isArrived.value = true;  // 确保动画完成后隐藏
    }, 100); // 500ms 是动画时长
}

//表单里的标签
const cardLabel = ref("📑反馈卡片")
const nameLabel = ref("🧸用户名称：")
const attachedLabel = ref("📜附加文件：")
const contentLabel = ref("📝反馈内容：")
</script>
<style scoped lang="scss">
@use "@/assets/styles/feedback/form.scss" as *;
</style>