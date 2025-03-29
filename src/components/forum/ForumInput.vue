<template>
    <div class="forum-input" v-aos="{
        animation: 'slide-up',
        duration: 300,
    }">
        <FilePreview :imgList="forumStore.uploadImages" :fileList="forumStore.uploadDocuments"
            @removeFile="handleRemoveFile" />
        <!-- 表情列表区域 -->
        <div class="emoji-list" v-show="showEmojiList">
            <div class="emoji-box">
                <span v-for="(item, index) in emojisArray" @click="inputEmoji(item)">{{ item }}</span>
            </div>
        </div>
        <!-- 输入区域 -->
        <div class="input-container">
            <!-- 图标区域（左上角） -->
            <div class="input-icons" @mousedown.prevent>
                <div class="icons">
                    <button class="icon" id="hide-input" @click="hiddenInput">⚓</button>
                    <button class="icon" id="show-emoji" @click="handleDisplayEmojiList">😀</button>
                    <button class="icon" id="file-upload" @click="triggerUploadFile">🗂️</button>
                    <input type="file" :accept="acceptFile" multiple hidden @change="handleUpload" ref="uploadInputRef"
                        @paste="handleImagePaste">
                </div>
                <div class="font-counter">
                    <div class="eye" @click="userInputText = ''">
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
                    v-model="userInputText" @keydown="handleSendKeyDown"></textarea>
            </div>
            <!-- 发送按钮区域 -->
            <div class="input-send" @mousedown.prevent>
                <div class="input-control">
                    <label class="mini-switch">
                        <input type="checkbox" v-model="isSwitchOn" hidden>
                        <span class="slider">
                            <span class="slider-dot"></span>
                        </span>
                    </label>
                </div>
                <div class="send-button">
                    <button @click="sendMessage" ref="sendMsgBtnRef">发送</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import FilePreview from '../common/FilePreview.vue';
import { useForumStore } from '@/stores/forum';
import { emojis } from '@/data/emojis';
import { userStore } from "@/stores/user";

const userInfo = userStore()
const isSwitchOn = ref(false);
const emojisArray = ref(emojis);
const forumStore = useForumStore();
const textareaRef = ref(null);
const acceptFile = ref("image/*,.md");
const userInputText = ref("");
const uploadInputRef = ref(null);


//点击发送消息
const sendMessage = () => {

    //判断是否上传文档或输入消息
    if (userInputText.value.trim() === '' && forumStore.isuploadDocumentEmpty && forumStore.isUploadImageEmpty) {
        forumStore.setShowTip()
        return
    }

    //判断是否上传了文档
    if (!forumStore.isuploadDocumentEmpty) {
        forumStore.uploadDocuments.forEach((el) => {
            forumStore.addMessage({
                user: userInfo.user,
                content: {
                    type: 'docs',
                    docs: el,
                    text: userInputText.value.trim()
                }
            })
        })
    }

    //判断是否上传了图片或输入了消息
    if (userInputText.value.trim() !== '' || !forumStore.isUploadImageEmpty) {
        forumStore.addMessage({
            user: userInfo.user,
            content: {
                type: 'img',
                img: forumStore.uploadImages,
                text: userInputText.value.trim()
            },
        })
    }


    resetInput()//重置输入框
    forumStore.clearUploadFiles()//清理上传的文件
}

//按下shift+enter发送消息
const sendMsgBtnRef = ref(null)
const handleSendKeyDown = (e) => {
    if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault()
        sendMsgBtnRef.value.click()
    }
}

//重置输入框
const resetInput = () => {
    userInputText.value = ''
    adjustHeight()
}

//显示表情列表
const showEmojiList = ref(false);
const handleDisplayEmojiList = () => {
    showEmojiList.value = !showEmojiList.value
}

const handleInput = () => {
    adjustHeight()
}

const charNumber = computed(() => {
    if (!userInputText.value) {
        return
    }
    if (Array.from(userInputText.value).length > 15000) {
        return '字数超过上限'
    }
    return Array.from(userInputText.value).length;
})

const triggerUploadFile = () => {
    uploadInputRef.value.click()
}

const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    Array.from(files).forEach((file) => {
        handleUploadFile(file)
    });
    uploadInputRef.value.value = '';
}

const handleUploadFile = (file) => {
    if (!file.type.startsWith("image")) {
        forumStore.addDocument(file)
        return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
        const image = e.target.result
        forumStore.addImage(image)
    }
    reader.readAsDataURL(file)
}

const adjustHeight = () => {
    if (textareaRef.value) {
        textareaRef.value.style.height = 'auto';
        const scrollHeight = textareaRef.value.scrollHeight;
        const maxHeight = 90;

        if (scrollHeight > maxHeight) {
            textareaRef.value.style.height = maxHeight + 'px';
            textareaRef.value.style.overflowY = 'auto';
        } else {
            textareaRef.value.style.height = scrollHeight + 'px';
            textareaRef.value.style.overflowY = 'hidden';
        }
    }
}

//插入表情
const inputEmoji = (value) => {
    const start = textareaRef.value.selectionStart;
    const end = textareaRef.value.selectionEnd;

    const startPart = userInputText.value.slice(0, start)
    const endPart = userInputText.value.slice(end)

    userInputText.value = startPart + value + endPart
    // 移动光标
    const newPos = start + value.length;
    nextTick(() => {
        textareaRef.value.focus();
        textareaRef.value.setSelectionRange(newPos, newPos);
    });

    showEmojiList.value = false;
}

//删除预览图片或文档
const handleRemoveFile = (type, index) => {
    if (type === 'img') {
        forumStore.removeImage(index)
    }
    if (type === 'file') {
        forumStore.removeDocument(index)
    }
}

//隐藏输入框
const emit = defineEmits(["set-footer-hide"])
const hiddenInput = () => {
    emit('set-footer-hide', false)
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/forum/input.scss" as *;
</style>