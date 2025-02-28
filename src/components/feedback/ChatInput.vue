<template>
    <div class="input-box">
        <div id="preview-container" class="preview-container" ref="previewContainer"></div>
        <div class="chat-input-area" id="chat-input-area" ref="chatInputBox">
            <textarea id="chat-input" :placeholder="placeholderValue" rows="1" @focus="textareaFocus"
                @blur="textareaBlur" @input="handleInput" @paste="handleImagePaste" ref="chatTextarea"
                v-model="message"></textarea>
            <div class="upload">
                <input type="file" id="image-upload" multiple accept="image/*" hidden ref="imageUploadInput"
                    v-on:change="handleImageSelection" />
                <label for="image-upload" class="upload-icon" @mouseenter="handleHover(1)"
                    @mouseleave="handleHover(0)">{{ lableText }}</label>
                <button id="send-button" @mouseenter="handleHover(2)" @mouseleave="handleHover(0)"
                    @click="feedbackStore.replying ? stopReplyingMessage() : sendMessage()" ref="sendButton"
                    :class="{ 'breathing-border': feedbackStore.replying }" :data-tooltip="tooltipText">
                    {{ buttonText }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useFeedbackStore } from '@/stores/feedback'
import Tools from '@/utils/tools'
// import { callDashScope } from '@/api/aliyun'
// import SparkAIService from '../../api/spark'
const feedbackStore = useFeedbackStore()
//接收拖动到父组件的图片
const props = defineProps({
    files: {
        type: Array,
        default: []
    }
})

//输入框内文本
const placeholderValue = "请输入您的反馈或意见..."

//动态控制发送按钮的hover效果
const tooltipText = computed(() => {
    return feedbackStore.replying ? '点击停止回答!🙃' : '点击发送消息或按下Shift+Enter发送!😊'
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
    if (!feedbackStore.replying) {
        buttonText.value = isHover === 2 ? "👻" : "🍥"
    }
}

//图片预览
const previewContainer = ref(null)
const imageUploadInput = ref(null)

//监听文件选择
const handleImageSelection = () => {
    const files = event.target.files;
    // 遍历每个选中的文件
    Array.from(files).forEach((file) => {
        createImageWrapper(file)
    });
}

//监听文件粘贴
const handleImagePaste = (event) => {
    const items = event.clipboardData.items;
    // 遍历粘贴的内容，查找是否包含图片
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile(); // 获取粘贴的图片文件
            createImageWrapper(file)
        }
    }
}

//处理父组件文件拖动事件
// 监听props.files的变化，当有新文件时处理它们
watch(() => props.files, (newFiles) => {
    if (newFiles && newFiles.length > 0) {
        // 清空已有的预览
        // previewContainer.value.innerHTML = '';

        // 处理每个新文件
        newFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                createImageWrapper(file);
            }
        });
    }
}, { deep: true });

//创建图片预览
const createImageWrapper = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper'); // 包裹图片和删除按钮

        const img = document.createElement('img');
        img.src = e.target.result; // 将文件转为图片地址

        // 图片加载完成后移除灰度和遮罩效果
        img.onload = () => {
            img.style.filter = 'grayscale(0%)';
            img.style.maskImage = 'none';
            img.style.webkitMaskImage = 'none';
        };

        // 添加图片到store
        const imageIndex = feedbackStore.addImage({
            src: e.target.result,
            type: file.type,
            size: file.size
        });
        imageWrapper.dataset.storeIndex = imageIndex;
        // 创建删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '×'; // 删除按钮的内容
        deleteBtn.addEventListener('click', () => {

            feedbackStore.removeImage(imageIndex)
            imageWrapper.remove(); // 删除整个图片和按钮的容器


        });

        // 将图片和删除按钮添加到容器
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(deleteBtn);

        // 将图片容器添加到预览区
        previewContainer.value.appendChild(imageWrapper);
    };


    reader.readAsDataURL(file); // 读取文件并生成预览
}

// // 初始化星火API服务
// const sparkService = new SparkAIService({
//     appId: 'fb918983',
//     apiKey: '18138a8d8a482d9e4fbb9cca2c5218a7',
//     apiSecret: 'Mjg3Mjk5Njc2Y2U4MWE5ODA2ZDQxMzdi',
//     domain: '4.0Ultra',  // 使用Max版本
//     url: 'wss://spark-api.xf-yun.com/v4.0/chat'
// });

//发送消息
const message = ref('')//用户输入
const sendButton = ref(null)
const emit = defineEmits(['receiveUserMessage'])
const sendMessage = async () => {

    // callDashScope()
    // try {
    //     // 发送请求并获取回复
    //     const response = await sparkService.chat(
    //         "你都有哪些功能",
    //         { temperature: 0.7, maxTokens: 2048 }
    //     );
    //     console.log(response);

    //     console.log('Token使用情况:', response.usage);
    // } catch (error) {
    //     console.error('请求失败:', error);
    // } finally {

    // }


    if (feedbackStore.isEmpty(message.value)) {
        feedbackStore.SetShowTip()
        return
    }
    // 发送消息并自动触发官方回复
    feedbackStore.addUserMessage({
        img: feedbackStore.images,
        text: message.value,
        date: Tools.getFormatDate('yyyy-mm-dd')
    });

    //将发送的消息传递给父组件
    emit('receiveUserMessage', message.value)

    feedbackStore.isReplaying(true)
    //清空输入的数据 
    message.value = ''
    previewContainer.value.innerHTML = ''
    feedbackStore.clearAll()
    textareaBlur()
    resetHeight()

}

const stopReplyingMessage = () => {

    feedbackStore.isReplaying(false)
    feedbackStore.currentOfficialMessageIndex = -1

}

//监听官方消息是否回复完成
watch(() => feedbackStore.replying, (newValue) => {
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

</script>
<style lang="scss">
@use "@/assets/styles/feedback/input.scss" as *;
</style>