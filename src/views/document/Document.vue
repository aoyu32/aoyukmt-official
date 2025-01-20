<template>
    <div class="document">
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle Sidebar">
            <i class="iconfont icon-a-1you_right" id="sidebar-button" style="font-size: 24px;"></i>
        </button>
        <div class="main-content">
            <div class="document-sidebar">
                <DocumentSideBar :menuData="menuData" />
            </div>
            <div class="document-content">
                <div class="document-markdown">
                    <!-- 文档内容 -->
                    <!-- 传递Markdown文本或文件路径 -->
                    <MarkdownViewer />
                    <!-- 上一页/下一页 -->
                    <PageControl />
                </div>
                <MarkdownOutline />
            </div>

        </div>
    </div>
</template>
<script setup>
import DocumentSideBar from '@/components/document/DocumentSideBar.vue';
import MarkdownViewer from '@/components/document/MarkdownViewer.vue';
import PageControl from '@/components/document/PageControl.vue';
import MarkdownOutline from '@/components/document/MarkdownOutline.vue';
import { menuData } from '@/data/sidebar';
import { useDocumentStore } from '@/stores/document'
const store = useDocumentStore();
store.setMenuData(menuData)
</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/constant.scss" as *;
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
    top: 72px;
    z-index: 20;
    color: $primary-color;
    border: none;
    cursor: pointer;
    background-color: white;
    transition: background-color 0.3s ease;
}

.sidebar-toggle span {
    font-size: 1rem;
}

.sidebar-toggle:hover {
    color: rgb(188, 190, 191);
}

.main-content {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 95%;
    position: relative;
    top: 72px;


    .document-sidebar {
        width: 250px;
        overflow-y: auto;
        position: fixed;
        height: calc(100vh - 72px);
        z-index: 10;
        background: #f3f1f171;
    }

    .document-content {

        width: calc(100% - 500px);
        margin-left: 250px; // 留出左侧边栏空间
        padding: 1rem 5rem;
        position: relative;


        .document-markdown {
            width: 100%;
            height: 100%;
        }
    }


}


@media (max-width: 768px) {

    .document-sidebar {
        position: fixed;
        top: 72px;
        left: 0;
        width: 250px;
        height: calc(100vh - 72px);
        background-color: white;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        z-index: 15;
    }

    .main-content {

        .document-content {
            margin-left: 0;

            .document-outline {
                display: none;
            }
        }
    }

    .document-sidebar.show {
        transform: translateX(0);
    }

    .sidebar-toggle {
        display: block;
    }

}
</style>