<template>
    <div class="forum">
        <div class="main-content">
            <!-- 聊天窗口头部 -->
            <div class="forum-header">
                <!-- 窗口标题 -->
                <div class="header-title">
                    <h4>🪹 群聊论坛</h4>
                </div>
                <!-- 窗口头部状态栏 -->
                <div class="header-status-bar">
                    <div class="search">
                        <span>🔎</span>
                    </div>
                    <div class="online">
                        <span>🪆123</span>
                    </div>
                </div>
            </div>
            <!-- 聊天窗口 -->
            <div class="forum-body" @scroll="handleScroll" ref="forumBodyRef">
                <ForumWindow />
            </div>
            <!-- 输入窗口  -->
            <div class="forum-footer" >
                <ForumInput />
            </div>

        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import ForumInput from '@/components/forum/ForumInput.vue';
import ForumWindow from '@/components/forum/ForumWindow.vue';
const forumBodyRef = ref(null);


const isScroll = ref(true)
const lastScrollTop = ref(0); // 记录上次滚动位置
//监听聊天窗口滚动
const handleScroll = () => {
    if (!forumBodyRef.value) return;
    const currentScrollTop = forumBodyRef.value.scrollTop;
    if (currentScrollTop > lastScrollTop.value) {
        isScroll.value = false
    } else if (currentScrollTop < lastScrollTop.value) {
        isScroll.value = true
    }
    lastScrollTop.value = currentScrollTop;
}

// 判断是否滚动到底部
const isScrolledToBottom = () => {
    if (!forumBodyRef.value) return false;
    const { scrollTop, scrollHeight, clientHeight } = forumBodyRef.value;
    return scrollTop + clientHeight >= scrollHeight - 1; // 允许 1px 误差
};

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.forum {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;


    .main-content {
        width: 100%;
        height: 98%;
        display: flex;
        border-radius: 10px;
        flex-direction: column;
        border: 2px solid $theme-primary;
        background: $theme-background;
        position: relative;




        .forum-header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            border-bottom: 1px solid $theme-primary;

            .header-title {
                h4 {
                    color: $theme-primary;
                }
            }

            .header-status-bar {
                display: flex;
                gap: 5px;

                .online {
                    color: $theme-font-gray;
                }
            }

        }

        .forum-body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            overflow-y: auto;
        }

        .footer-control {
            position: absolute;
            bottom: 10px;
            left: 16px;

            button {
                background-color: transparent;
                border: none;
                font-size: 20px;
                transition: all 0.2s ease-in-out;

                &:hover {
                    transform: scale(1.3);
                }
            }

        }

        .forum-footer {
            width: 100%;
        }

        .show {
            position: absolute;
            bottom: 0;
        }
    }
}
</style>