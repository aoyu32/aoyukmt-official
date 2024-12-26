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
                    <!-- 传递Markdown文本或文件路径 -->
                    <MarkdownViewer :filePath="filePath" />

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
                    <ul>
                        <li>AOYUKMT是什么？</li>
                        <li>如何下载使用</li>
                        <li>模块功能简介</li>
                        <li>配置说明</li>
                        <li>AOYUKMT是什么？</li>
                        <li>如何下载使用</li>
                        <li>模块功能简介</li>
                        <li>配置说明</li>
                        <li>AOYUKMT是什么？</li>
                        <li>如何下载使用</li>
                        <li>模块功能简介</li>
                        <li>配置说明</li>
                        <li>AOYUKMT是什么？</li>

                    </ul>
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
            

            .markdown-page {
                height: 65px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                margin: 40px 0 20px 0;
                .pre-page,
                .next-page {
                    width: 500px;
                    border: 1px solid rgba(145, 142, 142, 0.676);
                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 0 15px;
                    transition: border-color 0.3s ease;
                }

                .pre-page {
                    margin-right: 10px;
                }

                .next-page {
                    margin-left: 10px;
                }

                /* 子元素样式调整 */
                .pre {
                    color: $primary-color;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    /* 垂直居中 */
                    justify-content: flex-start;
                    /* 水平靠左 */
                    width: 100%;
                    /* 占满父容器宽度 */
                }

                .next {
                    color: $primary-color;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    /* 垂直居中 */
                    justify-content: flex-end;
                    /* 水平靠右 */
                    width: 100%;
                    /* 占满父容器宽度 */
                }

            }

        }

        .markdown-outline {
            width: 250px;
            overflow-y: auto;
            position: fixed;
            height: calc(100vh - 72px);
            right: 2.5%;
            top: 72px;
            z-index: 10;
            padding: 2rem 2rem 2rem 0rem;

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                border-left: 1px solid $primary-color;
                padding: 0rem 1rem;
                color: rgb(87, 83, 83);
                font-size: 13px;

                li {
                    padding: 0.3rem;
                }
            }
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