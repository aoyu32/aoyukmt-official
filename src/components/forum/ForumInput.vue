<template>
    <div class="forum-input" v-aos="{
        animation: 'slide-up',
        duration: 300,
    }">
        <FilePreview :fileList="forumStore.uploadFiles" @removeFile="handleRemoveFile" />
        <!-- 输入区域 -->
        <div class="input-container">
            <!-- 图标区域（左上角） -->
            <div class="input-icons">
                <div class="icons">
                    <span class="icon emoji">😀</span>
                    <span class="icon more" @click="triggerUploadFile">🗂️</span>
                    <input type="file" :accept="acceptFile" multiple hidden @change="handleUpload" ref="uploadInputRef"
                        @paste="handleImagePaste">
                </div>
                <div class="font-counter">
                    <div class="eye">
                        🧿
                    </div>
                    <div class="number">
                        <span>{{ charNumber }}</span>
                    </div>

                </div>
            </div>
            <!-- 输入框区域 -->
            <div class="input-textarea">
                <!-- 文本输入区域 -->
                <textarea placeholder="请输入内容..." class="textarea" ref="textareaRef" @input="handleInput"
                    v-model="userInputText"></textarea>
            </div>
            <!-- 发送按钮区域 -->
            <div class="input-send">
                <button>
                    发送
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FilePreview from '../common/FilePreview.vue';
import { useForumStore } from '@/stores/forum';
const forumStore = useForumStore()
//输入框
const textareaRef = ref(null)
//上传文件的类型
const acceptFile = ref("image/*,.md")


//监听输入框输入
const userInputText = ref("")
const handleInput = () => {
    adjustHeight()
}

//计算输入内容的字符数
const charNumber = computed(() => {
    if (!userInputText.value) {
        return
    }

    if (Array.from(userInputText.value).length > 15000) {
        return '字数超过上限'
    }
    return Array.from(userInputText.value).length;
})

const uploadInputRef = ref(null)
//触发文件上传
const triggerUploadFile = () => {
    console.log(uploadInputRef);

    uploadInputRef.value.click()
}

//文件上传
const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    // 遍历每个选中的文件
    Array.from(files).forEach((file) => {
        handleUploadFile(file)
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
            handleUploadFile(file)
        }
    }
}


//处理上传的图片文件，并存入store
const handleUploadFile = (file) => {
    if (!file.type.startsWith("image")) {
        forumStore.setUploadFiles({
            type: "file",
            value: file.name
        })
        return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
        forumStore.setUploadFiles({
            type: "image",
            value: e.target.result
        })
    }
    reader.readAsDataURL(file)
}

//移除某个index位置的文件
const handleRemoveFile = (index) => {
    forumStore.removeUploadFiles(index)
}

//动态调整输入框的高度
const adjustHeight = () => {
    if (textareaRef.value) {
        // 先重置高度，确保正确计算
        textareaRef.value.style.height = 'auto';

        // 获取内容高度
        const scrollHeight = textareaRef.value.scrollHeight;

        // 设置新高度，确保不超过最大高度
        const maxHeight = 90;

        if (scrollHeight > maxHeight) {
            textareaRef.value.style.height = maxHeight + 'px';
            textareaRef.value.style.overflowY = 'auto';
        } else {
            textareaRef.value.style.height = scrollHeight + 'px';
            textareaRef.value.style.overflowY = 'hidden'; // 内容未超出时隐藏滚动条
        }
    }
}

</script>
<style lang="scss" scoped>
@use "@/assets/styles/forum/input.scss" as *;
</style>