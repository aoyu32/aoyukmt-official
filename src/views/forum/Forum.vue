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
            <div class="forum-body">
                <ForumWindow />
            </div>
            <!-- 输入窗口  -->
            <div class="forum-footer">
                <ForumInput />
                <!-- <AssistantInput/> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import AssistantInput from '@/components/assistant/AssistantInput.vue';
import ForumInput from '@/components/forum/ForumInput.vue';
import ForumWindow from '@/components/forum/ForumWindow.vue';


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
            flex: 9;
        }

        .forum-footer {
            width: 100%;
        }
    }
}
</style>