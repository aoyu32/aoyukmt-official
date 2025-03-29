<template>
    <div class="forum">
        <div class="main-content">
            <Message :messageContent="tipContext" :isShowMessage="forumStore.showTip" :messagePosition="'absolute'" />
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
            <div class="forum-body" ref="forumBodyRef">
                <ForumWindow />
            </div>
            <div class="footer-control" v-if="!isHide">
                <button @click="isHide = true">🛥️</button>
            </div>
            <!-- 输入窗口  -->
            <div class="forum-footer" v-if="isHide">
                <ForumInput @setFooterHide="handleHidFooter" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import Message from '@/components/common/Message.vue'
import ForumInput from '@/components/forum/ForumInput.vue';
import ForumWindow from '@/components/forum/ForumWindow.vue';
import { useForumStore } from '@/stores/forum';
const forumStore = useForumStore()
const tipContext = ref("请先输入消息，不输入消息休想发送!😁")
const forumBodyRef = ref(null);
const isHide = ref(true)
//隐藏输入框
const handleHidFooter = (flag) => {
    isHide.value = flag
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
@use "@/assets/styles/mixins/_tooltip-mixins.scss" as *;

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
        overflow: hidden;
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
        }

        .footer-control {
            position: absolute;
            bottom: 5px;
            left: 5px;


            button {
                background-color: transparent;
                border: none;
                font-size: 20px;
                cursor: pointer;
                @include tooltip("点击显示输入框😶", left, 90%, bottom, 15px, auto, $theme-secondary-light);

            }

        }

        .forum-footer {
            width: 100%;
            background-color: transparent;
        }

        .show {
            position: absolute;
            bottom: 0;
        }
    }
}
</style>