<template>
    <div class="file-preview">
        <div id="preview-container" class="preview-container" ref="previewContainer">
            <div class="wrapper" v-for="(item, index) in fileList" :key="index">
                <!-- 图片类型预览 -->
                <div class="image-wrapper" v-if="item.type === 'image'">
                    <img :src="item.value">
                    <button class="delete-btn" @click="removeFile(index)">
                        <i class="iconfont icon-close"></i>
                    </button>
                </div>
                <!-- 文件类型预览  -->
                <div class="file-wrapper" v-else>
                    <div class="file-name">
                        <i class="iconfont icon-wenjianicon-md"></i>{{ item.value }}
                    </div>
                    <button class="delete-btn" @click="removeFile(index)">
                        <i class="iconfont icon-close"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    // 接收外部传入的文件列表
    fileList: {
        type: Array,
        default: () => []
    },
    fileType: {
        type: String,
        default: 'img'
    }
});


const emit = defineEmits(['remove-file'])
//移除文件
const removeFile = (index) => {
    emit('remove-file', index)
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.file-preview {
    width: 100%;

    .preview-container {
        width: 100%;
        display: flex;
        margin-bottom: 5px;
        flex-wrap: wrap;
        gap: $assistant-preview-gap;

        .wrapper {

            transition: all 0.2s ease-in-out;

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

                .file-name {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    color: $theme-font-gray;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 100%; // 限制最大宽度，确保不会撑破容器

                    .iconfont {
                        font-size: 20px;
                        margin-right: 5px;
                        flex-shrink: 0; // 确保图标不会被压缩
                    }

                    span {
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        max-width: calc(100% - 25px); // 预留图标的空间
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

            &:hover {
                .delete-btn {
                    display: flex;
                }
            }
        }


    }

}
</style>