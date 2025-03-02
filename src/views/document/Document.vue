<template>
    <div class="document">
        <button class="sidebar-toggle" @click="toggleSidebar">
            <i class="iconfont icon-a-1you_right" id="sidebar-button" style="font-size: 24px;"></i>
        </button>
        <button class="outline-toggle" @click="toggleOutline">
            <i class="iconfont icon-a-1you_right" id="sidebar-button" style="font-size: 24px;"></i>
        </button>
        <div class="main-content">
            <div class="document-sidebar" :class="{ 'show': !isShowSidebar }">
                <DocumentSidebar :menuData="menuData" @hideSidebar="handleHideSidebar" />
            </div>
            <div class="document-content" @click="hideSidebarOrOutline">
                <div class="document-markdown">
                    <!-- 文档内容 -->
                    <!-- 传递Markdown文本或文件路径 -->
                    <MarkdownViewer :filePath="store.activeFilePath" @getHeadings="handleHeadings" v-aos="{
                        animation: 'fade-down',
                        duration: 250
                    }" />
                    <!-- 上一页/下一页 -->
                    <PageControl />
                </div>
            </div>
            <div class="document-outline" :class="{ 'show': !isShowOutline }">
                <MarkdownOutline @hideOutline="handleHideOutline" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DocumentSidebar from '@/components/document/DocumentSidebar.vue'
import MarkdownViewer from '@/components/document/MarkdownViewer.vue';
import PageControl from '@/components/document/PageControl.vue';
import MarkdownOutline from '@/components/document/MarkdownOutline.vue';
import { menuData } from '@/data/sidebar';
import { useDocumentStore } from '@/stores/document'

const store = useDocumentStore();
store.setMenuData(menuData)

// 控制侧边栏和标题侧边栏的显示状态
const isShowSidebar = ref(true); // 默认不显示
const isShowOutline = ref(true); // 默认不显示

// 检查窗口大小并设置状态
const checkWindowSize = () => {
    if (window.innerWidth >= 1000) {
        // 如果窗口宽度大于等于 1000px，隐藏侧边栏
        isShowSidebar.value = false;
        isShowOutline.value = false;
    } else {
        // 如果窗口宽度小于 1000px，保持当前状态
        // 用户需要通过点击按钮来展开侧边栏
        isShowSidebar.value = true;
        isShowOutline.value = true;
    }
}

onMounted(() => {
    // 初始检查窗口大小
    checkWindowSize();
    // 监听窗口大小变化
    window.addEventListener('resize', checkWindowSize);
});

// 获取标题
const handleHeadings = (headingsData) => {
    store.setHeadings(headingsData)
}

// 切换左侧边栏
const toggleSidebar = () => {
    if (!isShowOutline.value) {
        isShowOutline.value = true;
        isShowSidebar.value = !isShowSidebar.value
    } else {
        isShowSidebar.value = !isShowSidebar.value
    }
}

// 切换右侧标题侧边栏
const toggleOutline = () => {
    if (!isShowSidebar.value) {
        isShowSidebar.value = true
        isShowOutline.value = !isShowOutline.value
    } else {
        isShowOutline.value = !isShowOutline.value
    }
}

// 点击空白区域时隐藏侧边栏或大纲
const hideSidebarOrOutline = () => {
    if (!isShowSidebar.value || !isShowOutline.value) {
        isShowSidebar.value = true;
        isShowOutline.value = true;
    }
}

//隐藏侧边栏
const handleHideSidebar = () => {
    isShowSidebar.value = true
}
//隐藏标题栏
const handleHideOutline = () => {
    isShowOutline.value = true
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;
@use "@/assets/styles/document/siderbar.scss";

.document {
    display: flex;
    justify-content: center; // 居中子元素（水平）
    align-items: center; // 居中子元素（垂直）
    width: 100%;
}

.sidebar-toggle {
    display: none;
    position: fixed;
    top: $distance-top;
    z-index: 20;
    color: $theme-primary;
    border: none;
    left: 0;
    cursor: pointer;
    background-color: $theme-background;
    transition: background-color 0.3s ease;

    span {
        font-size: 1rem;
    }

    &:hover {
        color: $theme-primary-light;
    }
}

.outline-toggle {
    display: none;
    position: fixed;
    top: $distance-top;
    z-index: 20;
    color: $theme-primary;
    border: none;
    right: 0;
    cursor: pointer;
    background-color: $theme-background;
    transition: background-color 0.3s ease;

    span {
        font-size: 1rem;
    }

    &:hover {
        color: $theme-primary-light;
    }
}

.main-content {
    width: $percentage-width;
    position: relative;
    top: $distance-top;
    display: flex;


    .document-sidebar {
        width: $document-sidebar-lw;
        overflow-y: auto;
        position: fixed;
        height: calc(100vh - $distance-top);
        z-index: 10;
        background: $document-sidebar-background;
    }

    .document-content {

        width: $document-content-width;
        margin-left: $document-sidebar-lw; // 留出左侧边栏空间
        margin-right: $document-sidebar-rw; // 留出左侧边栏空间
        padding: 1rem 5rem;

        .document-markdown {
            width: 100%;
            height: 100%;
        }
    }

    .document-outline {
        width: $document-sidebar-rw;
        position: fixed;
        overflow-y: auto;
        position: fixed;
        height: calc(100vh - $distance-top);
        right: 2.5%;
        top: $distance-top;
        z-index: 10;
        padding: $document-sidebar-padding;
    }


}


@media (max-width: 1000px) {

    .document-sidebar {
        left: 0;
        transform: translateX(-100%);
        transition: transform 0.1s ease;


        &.show {
            transform: translateX(0);
            box-shadow: 2px 0 5px $theme-deep-shadow;
        }
    }

    .main-content {

        .document-content {
            width: 100%;
            padding: 0;
            margin-left: 0;
            margin-right: 0;
        }

        .document-outline {
            right: 0;
            transform: translateX(100%);
            transition: transform 0.1s ease;
            background: $document-sidebar-background;

            &.show {
                transform: translateX(0);
                box-shadow: 2px 0 5px $theme-deep-shadow;
            }
        }
    }

    .sidebar-toggle {
        display: block;
    }

    .outline-toggle {
        display: block;
    }

}
</style>