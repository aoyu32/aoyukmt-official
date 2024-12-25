<template>
    <div class="document">
        <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle Sidebar">
            <i class="iconfont icon-a-1you_right" id="sidebar-button" style="font-size: 24px;"></i>
        </button>
        <div class="main-content">
            <div class="document-sidebar">
                <DocumentSideBar :menu-data="menuData" />
            </div>
            <div class="document-content">
                <div class="document-markdown">
                    <!-- 文档内容 -->
                    <div class="markdown-body" id="document-content">
                        <!-- 传递Markdown文本或文件路径 -->
                        <MarkdownViewer :filePath="filePath" />
                    </div>

                    <nav class="markdown-page">
                        <a class="pre-page" id="pre-page">
                            <p class="pre">
                                <i class="iconfont icon-shangyiye"></i>
                                <span>快速开始</span>
                            </p>
                        </a>
                        <a class="next-page" id="next-page">
                            <p class="next">
                                <span>字符输入映射</span>
                                <i class="iconfont icon-xiayiye"></i>
                            </p>
                        </a>
                    </nav>
                </div>
                <div class="markdown-outline">

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import DocumentSideBar from '@/components/document/DocumentSideBar.vue';
import MarkdownViewer from '@/components/document/MarkdownViewer.vue';
import { menuData } from '@/utils/sidebar';
import { ref } from 'vue'
const filePath = ref('/docs/start.md')


</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/constant.scss" as *;
@use "@/assets/styles/document/siderbar.scss";

.document {
    width: 100%;
    height: 100%;
    padding-top: 72px;
    display: flex;
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
    position: relative;
    width: 95%;
  
    margin: 0 auto;

    .document-content {
        width: 100%;
        height: 100%;
        margin-left: 250px;
        display: flex;

        .document-markdown {
            width: 80%;
            padding: 1rem 5rem;

            .markdown-body {
                width: 100%;
            }

            .markdown-page {
                width: 100%;
                height: 40px;
            }

        }

        .markdown-outline {
            background-color: antiquewhite;
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