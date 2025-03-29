<template>
    <div class="file-preview">
        <div id="preview-container" class="preview-container" ref="previewContainer">
            <!-- 图片类型预览 -->
            <div class="image-wrapper" v-for="(img, index) in imgList" :key="index">
                <img :src="img">
                <button class="delete-btn" @click="removeFile('img', index)">
                    <i class="iconfont icon-close"></i>
                </button>
            </div>

            <!-- 文件类型预览 -->
            <div class="file-wrapper" v-for="(file, index) in fileList" :key="index">
                <div class="file-name">
                    <i class="iconfont icon-wenjianicon-md"></i>{{ file.name }}
                </div>
                <button class="delete-btn" @click="removeFile('file', index)">
                    <i class="iconfont icon-close"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// 接收外部传入的文件列表
const props = defineProps({
    fileList: {
        type: Array,
        default: () => []
    },
    imgList: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['remove-file'])
//移除文件
const removeFile = (type, index) => {
    emit('remove-file', type, index)
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.file-preview {
    width: 100%;
    position: absolute;
    bottom: 100%;
    left: 10px;
    right: 10px;
    z-index: 10;

    .preview-container {
        display: grid;
        margin-right: 10px;
        grid-template-columns: repeat(auto-fill, $assistant-preview-width);
        gap: $assistant-preview-gap;
        margin-bottom: 5px;

        .image-wrapper {
            position: relative;
            width: $assistant-preview-width;
            height: $assistant-preview-height;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 8px;
            }
        }

        .file-wrapper {
            position: relative;
            padding: 0 10px;
            height: $assistant-preview-height;
            background-color: $theme-secondary-lt;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;

            .file-name {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                color: $theme-font-gray;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .iconfont {
                    font-size: 20px;
                    margin-right: 5px;
                    flex-shrink: 0;
                }
            }
        }

        .delete-btn {
            position: absolute;
            top: -3px;
            right: -3px;
            background-color: $theme-font-gray;
            color: $theme-font-light;
            border: none;
            border-radius: 50%;
            width: $assistant-preview-dtn;
            height: $assistant-preview-dtn;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            transition: background-color 0.5s ease-in-out;

            .iconfont {
                font-size: 10px;
            }

            &:hover {
                background-color: $theme-background-dt;
            }
        }

        .image-wrapper:hover .delete-btn,
        .file-wrapper:hover .delete-btn {
            display: flex;
        }
    }
}
</style>