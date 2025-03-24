<template>
    <div class="forum-input" v-aos="{
        animation: 'slide-up',
        duration: 300,
    }">
        <div id="preview-container" class="preview-container" ref="previewContainer">
        </div>
        <!-- 输入区域 -->
        <div class="input-container">
            <!-- 图标区域（左上角） -->
            <div class="input-icons">
                <div class="icons">
                    <span class="icon emoji">😀</span>
                    <span class="icon more" @click="triggerUploadFile">🗂️</span>
                    <input type="file" multiple hidden @change="handleUpload" ref="uploadInputRef" @paste="handleImagePaste">
                </div>
                <div class="font-counter">
                    <span><span class="eye">🧿</span>{{ charNumber }}</span>
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
const textareaRef = ref(null)

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
        createImageWrapper(file)
    });

}

//图片预览
const previewContainer = ref(null)

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

//创建文件预览
const createImageWrapper = (file) => {
    console.log("选择的文件:", file);

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

        // 创建删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<i class="iconfont icon-close"></i>'; // 删除按钮的内容
        deleteBtn.addEventListener('click', () => {
            imageWrapper.remove(); // 删除整个图片和按钮的容器
        });

        // 将图片和删除按钮添加到容器
        imageWrapper.appendChild(img);
        imageWrapper.appendChild(deleteBtn)

        // 将图片容器添加到预览区
        previewContainer.value.appendChild(imageWrapper);
    };


    reader.readAsDataURL(file); // 读取文件并生成预览
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
<style lang="scss">
@use "@/assets/styles/forum/input.scss" as *;
</style>