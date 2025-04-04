<template>
    <div class="document">
        <button class="sidebar-toggle" :class="{ 'rotated': !isShowSidebar }" @click="toggleSidebar">
            <i class="iconfont icon-toggle-right"></i>
        </button>
        <button class="outline-toggle" :class="{ 'rotated': !isShowOutline }" @click="toggleOutline">
            <i class="iconfont icon-toggle-left"></i>
        </button>
        <div class="loadding-box" v-if="store.isMenuDataEmpty">
            <Loadding :text="loaddingText" fontSize="35px" animationType="jump-up" :fullScreen="false" />
        </div>
        <div class="main-content" v-if="!store.isMenuDataEmpty">
            <div class="document-sidebar" :class="{ 'show': !isShowSidebar }">
                <DocumentSidebar @hideSidebar="handleHideSidebar" />
            </div>
            <div class="document-content" @click="hideSidebarOrOutline">
                <div class="document-markdown">
                    <!-- 文档内容 -->
                    <!-- 传递Markdown文本或文件路径 -->
                    <MarkdownViewer :markdown-url="store.activeDocsUrl" @getHeadings="handleHeadings" v-aos="{
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
import MarkdownViewer from '@/components/common/MarkdownViewer.vue';
import PageControl from '@/components/document/PageControl.vue';
import MarkdownOutline from '@/components/document/MarkdownOutline.vue';
import Loadding from '@/components/common/Loadding.vue';
import { apis } from '@/api/api';
import { useDocumentStore } from '@/stores/document'

const store = useDocumentStore();
const menuData = ref([])

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
const loaddingText = ref('LOADDING')
onMounted(async () => {
    // 初始检查窗口大小
    checkWindowSize();
    // 监听窗口大小变化
    window.addEventListener('resize', checkWindowSize);
    //请求获取文档数据
    if (store.isMenuDataEmpty) {
        try {
            menuData.value = await apis.getDocumentData()
            store.setMenuData(menuData.value)
            store.setActiveDocsUrl(menuData.value[store.activeParentIndex].documents[store.activeChildIndex].docsUrl)
        } catch (error) {
            loaddingText.value = error.message
        }
    }


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
    width: 15px;
    height: 15px;
    z-index: 20;
    color: $theme-primary;
    border: none;
    text-align: center;
    left: 0;
    cursor: pointer;
    background-color: $theme-background;
    transition: all 0.3s ease;

    span {
        font-size: 1rem;
    }

    &:hover {
        color: $theme-primary-light;
        text-shadow: 0 0 5px $theme-primary-light,
            0 0 10px $theme-primary-dt,
            0 0 15px $theme-primary-lt;
    }

    .iconfont {
        font-size: 16px;
        transition: transform 0.3s ease;
        display: block;
    }

    &.rotated {
        .iconfont {
            transform: rotate(180deg);
        }
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
    transition: all 0.3s ease;

    span {
        font-size: 1rem;
    }

    &:hover {
        color: $theme-primary-light;
        text-shadow: 0 0 5px $theme-primary-light,
            0 0 10px $theme-primary-dt,
            0 0 15px $theme-primary-lt;
    }

    .iconfont {
        font-size: 16px;
        transition: transform 0.3s ease;
        display: block;
    }

    &.rotated {
        .iconfont {
            transform: rotate(-180deg);
        }
    }
}

.loadding-box {
    width: $percentage-width;
    height: calc(100vh - $distance-top);
    position: relative;
    top: $distance-top;
    display: flex;
    align-items: center;
    justify-content: center;
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
        transition: transform 0.3s ease;


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
            transition: transform 0.3s ease;
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