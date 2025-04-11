<template>
    <div class="user">
        <div class="main-content">
            <div class="user-body">
                <UserWindow />
            </div>
        </div>
    </div>
</template>
<script setup>
import UserWindow from '@/components/user/UserWindow.vue';
</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.user {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .main-content {
        width: 100%;
        height: 95%;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: $theme-background;
        border-radius: 12px;
        border: 2px solid $theme-primary;
        position: relative;
        overflow: hidden;

        .user-header {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid $theme-primary;

            h2 {
                color: $theme-primary;
            }
        }

        .user-body {
            width: 100%;
            height: 100%;
        }

    }

}
</style>