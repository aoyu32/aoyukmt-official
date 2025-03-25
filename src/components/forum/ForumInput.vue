<template>
    <div class="forum-input" v-aos="{
        animation: 'slide-up',
        duration: 300,
    }" v-if="isHidden">
        <FilePreview :fileList="forumStore.uploadFiles" @removeFile="handleRemoveFile"
            v-if="!forumStore.isUploadFilesEmpty" />
        <!-- 表情列表区域 -->
        <div class="emoji-list" v-show="showEmojiBox" @mouseenter="handleEmojiBoxEnter"
            @mouseleave="handleEmojiBoxLeave">
            <div class="emoji-box">
                <span v-for="(item, index) in emojisArray" @click="inputEmoji(item)">{{ item }}</span>
            </div>
        </div>
        <!-- 输入区域 -->
        <div class="input-container">
            <!-- 图标区域（左上角） -->
            <div class="input-icons">
                <div class="icons">
                    <button class="icon" @click="isHidden = false">⚓</button>
                    <button class="icon emoji" @mouseenter="handleEmojiButtonEnter" @mouseleave="handleEmojiButtonLeave"
                        @click="textareaRef.focus()">😀</button>
                    <button class="icon more" @click="triggerUploadFile">🗂️</button>
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
                    v-model="userInputText"></textarea>
            </div>
            <!-- 发送按钮区域 -->
            <div class="input-send">
                <div class="input-control">
                    <label class="mini-switch">
                        <input type="checkbox" v-model="isSwitchOn" hidden>
                        <span class="slider">
                            <span class="slider-dot"></span>
                        </span>
                    </label>
                </div>
                <div class="send-button">
                    <button>发送</button>
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

const isSwitchOn = ref(false);
const emojisArray = ref(emojis);
const forumStore = useForumStore();
const textareaRef = ref(null);
const acceptFile = ref("image/*,.md");
const isHidden = ref(true);
const userInputText = ref("");
const uploadInputRef = ref(null);

// Emoji box control
const showEmojiBox = ref(false);
let emojiBoxTimeout = null;

const handleEmojiButtonEnter = () => {
    clearTimeout(emojiBoxTimeout);
    showEmojiBox.value = true;
};

const handleEmojiButtonLeave = () => {
    emojiBoxTimeout = setTimeout(() => {
        showEmojiBox.value = false;
    }, 300);
};

const handleEmojiBoxEnter = () => {
    clearTimeout(emojiBoxTimeout);
    showEmojiBox.value = true;
};

const handleEmojiBoxLeave = () => {
    showEmojiBox.value = false;
};

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
}

const handleImagePaste = (event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            handleUploadFile(file)
        }
    }
}

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

const handleRemoveFile = (index) => {
    forumStore.removeUploadFiles(index)
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

const inputEmoji = (value) => {
    const start = textareaRef.value.selectionStart;
    const end = textareaRef.value.selectionEnd;

    const startPart = userInputText.value.slice(0, start)
    const endPart = userInputText.value.slice(end)

    userInputText.value = startPart + value + endPart




    // 移动光标
    const newPos = start + value.length;
    nextTick(() => {
        textareaRef.value.setSelectionRange(newPos, newPos);
    });

    showEmojiBox.value = false;
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/forum/input.scss" as *;
</style>