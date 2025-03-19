<template>
    <div class="community">
        <div class="main-content">
            <div class="community-nav">
                <!-- Nav content -->
                <div class="nav">
                    <CommunitySidebar />
                </div>
            </div>
            <div class="community-content">
                <!-- Content -->
                <div class="content">
                    <router-view>
                    </router-view>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import CommunitySidebar from '@/components/community/CommunitySidebar.vue';
import Assistant from '../assistant/Assistant.vue';

// Script logic
</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.community {
    display: flex;
    width: 100%;
    height: 100vh;
    // background-color: antiquewhite;
    background-color: $theme-primary-lt;
    padding-top: $distance-top;
    align-items: center;
    justify-content: center;

    .main-content {
        width: 100%; // 改为 100% 以填充父容器
        max-width: 1300px; // 限制最大宽度
        height: 100%;
        // background-color: rgb(97, 97, 97);
        display: flex;
        align-items: center;
        justify-content: center;

        .community-nav {
            width: 100px; // 固定宽度
            height: 95%;

            // background-color: rgb(77, 77, 76);
            flex-shrink: 0; // 防止 nav 被压缩
            padding-right: 10px;


            .nav {
                height: 100%;
                animation: fadeRight 0.3s ease-in-out;


            }
        }

        .community-content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1; // 占据剩余空间
            height: 100%;

            // background-color: aquamarine;
            .content {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>