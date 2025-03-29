<template>
    <div class="assistant-input">
        <FilePreview :imgList="assistantStore.images" @remove-file="handleRemoveFile" />
        <div class="chat-input-area" id="chat-input-area" ref="chatInputBox">
            <textarea id="chat-input" :placeholder="placeholderValue" rows="1" @focus="textareaFocus"
                @blur="textareaBlur" @input="handleInput" @paste="handleImagePaste" ref="chatTextarea"
                v-model="message"></textarea>
            <div class="upload">
                <input type="file" id="image-upload" multiple accept="image/*" hidden ref="imageUploadInput"
                    @change="handleImageSelection" />
                <label for="image-upload" class="upload-icon" @mouseenter="handleHover(1)"
                    @mouseleave="handleHover(0)">{{ lableText }}</label>
                <button id="send-button" @mouseenter="handleHover(2)" @mouseleave="handleHover(0)"
                    @click="assistantStore.replying ? stopReplyingMessage() : sendMessage()" ref="sendButton"
                    :class="{ 'breathing-border': assistantStore.replying }" :data-tooltip="tooltipText">
                    {{ buttonText }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import FilePreview from '../common/FilePreview.vue'
import { useAssistantStore } from '@/stores/assistant'
import Tools from '@/utils/tools'
const assistantStore = useAssistantStore()
//接收拖动到父组件的图片
const props = defineProps({
    files: {
        type: Array,
        default: []
    }
})



//输入框内文本
const placeholderValue = "你可以向我咨询任何应用有关问题..."

//动态控制发送按钮的hover效果
const tooltipText = computed(() => {
    return assistantStore.replying ? '点击停止回答!🙃' : '点击发送消息或按下Shift+Enter发送!😊'
})


//输入框获取焦点改变给输入框添加红色盒子阴影
const chatInputBox = ref(null)
//输入框获取焦点事件
const textareaFocus = () => {
    chatInputBox.value.classList.add('focused')
}
//输入框失去焦点事件
const textareaBlur = () => {
    chatInputBox.value.classList.remove('focused')
}

//监听用户输入调整输入框高度
const chatTextarea = ref(null)
//输入框输入监听
const handleInput = (event) => {
    //动态调整输入框高度
    adjustHeight(event.target.value)
}
//调整输入框的高度的函数
const adjustHeight = (value) => {
    const lines = value.split('\n').length; // 获取当前行数
    // 如果是单行，设置行高为40px
    if (lines === 1) {
        chatTextarea.value.style.lineHeight = '40px'; // 单行时设置行高为40px
    } else {
        chatTextarea.value.style.lineHeight = ''; // 多行时移除行高样式，恢复默认
    }

    // 重置高度，并根据内容调整高度
    chatTextarea.value.style.height = 'auto';
    chatTextarea.value.style.height = `${chatTextarea.value.scrollHeight}px`;

    // 控制是否显示滚动条
    chatTextarea.value.style.overflowY = chatTextarea.value.scrollHeight > chatTextarea.value.clientHeight ? 'auto' : 'hidden';
}

//重置高度
const resetHeight = () => {
    chatTextarea.value.style.lineHeight = '40px'; // 单行时设置行高为40px
    chatTextarea.value.style.height = '40px';
}

//鼠标悬浮改变上传图标或发送按钮的图标字体
const lableText = ref("🔗")
const buttonText = ref("🍥")
//鼠标悬浮在上传图标或发送按钮改变图标
const handleHover = (isHover) => {
    lableText.value = isHover === 1 ? "🖼️" : "🔗"
    if (!assistantStore.replying) {
        buttonText.value = isHover === 2 ? "👻" : "🍥"
    }
}

//图片预览
const imageUploadInput = ref(null)

//监听文件选择
const handleImageSelection = () => {
    const files = event.target.files;
    // 遍历每个选中的文件
    Array.from(files).forEach((file) => {
        handleUploadFile(file)
    });
    imageUploadInput.value.value = ''
}

//监听文件粘贴
const handleImagePaste = (event) => {
    const items = event.clipboardData.items;
    // 遍历粘贴的内容，查找是否包含图片
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile(); // 获取粘贴的图片文件
            handleUploadFile(file)
        }
    }
    imageUploadInput.value.value = ''
}

//处理父组件文件拖动事件
// 监听props.files的变化，当有新文件时处理它们
watch(() => props.files, (newFiles) => {
    if (newFiles && newFiles.length > 0) {
        // 处理每个新文件
        newFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                handleUploadFile(file)
            }
        });
        imageUploadInput.value.value = ''
    }
}, { deep: true });

//发送消息
const message = ref('')//用户输入
const sendButton = ref(null)
const emit = defineEmits(['receiveUserMessage'])
const sendMessage = async () => {

    if (assistantStore.isEmpty(message.value)) {
        assistantStore.SetShowTip()
        return
    }
    // 发送消息并自动触发官方回复
    assistantStore.addUserMessage({
        img: assistantStore.images,
        text: message.value,
        date: Tools.getFormatDate('yyyy-mm-dd')
    });

    //将发送的消息传递给父组件
    emit('receiveUserMessage', message.value)

    assistantStore.isReplaying(true)
    //清空输入的数据 
    message.value = ''
    assistantStore.clearAll()
    textareaBlur()
    resetHeight()
    imageUploadInput.value = ''

}

//停止回复
const stopReplyingMessage = () => {
    assistantStore.isReplaying(false)
    assistantStore.currentOfficialMessageIndex = -1
}

//监听官方消息是否回复完成
watch(() => assistantStore.replying, (newValue) => {
    if (newValue) {
        buttonText.value = '🤖'
    } else {
        buttonText.value = '🍥'
    }
})


//发送消息快捷键注册
const handleKeyDown = (event) => {
    if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault()
        sendButton.value.click()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})

//读取上传的图片文件
const handleUploadFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        assistantStore.addImage(e.target.result)
    }
    reader.readAsDataURL(file)
}

//移除图片
const handleRemoveFile = (index) => {
    assistantStore.removeImage(index)
}
</script>
<style lang="scss">
@use "@/assets/styles/assistant/input.scss" as *;
</style>