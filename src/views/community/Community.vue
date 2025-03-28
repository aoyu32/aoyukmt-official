<template>
    <div class="community">
        <div class="main-content">
            <div class="community-nav">
                <!-- Nav content -->
                <div class="nav" :style="{ 'height': navHeight, 'border-radius': navBorderRadius }">
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
import { ref, watchEffect } from 'vue'
import CommunitySidebar from '@/components/community/CommunitySidebar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const navHeight = ref("95%")
const navBorderRadius = ref("12px")
watchEffect(() => {
    const currentRoute = route.path
    if (currentRoute === "/community/forum") {
        navHeight.value = '98%'
        navBorderRadius.value = '10px'
    }
    if (currentRoute === "/community/assistant") {
        navHeight.value = '95%'
        navBorderRadius.value = '12px'
    }

    if (currentRoute === "/community/feedback") {
        navHeight.value = '95%'
        navBorderRadius.value = '0'
    }

})


</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.community {
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: $theme-primary-lt;
    padding-top: $distance-top;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .main-content {
        width: 1300px;
        max-width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;

        .community-nav {

            width: 100px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-right: 10px;


            .nav {
                height: 100%;
                width: 100%;
                animation: fadeRight 0.3s ease-in-out;
                border-radius: 12px;
                border: 2px solid $theme-primary;
                background-color: $theme-background;
            }
        }

        .community-content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1; // 占据剩余空间
            height: 100%;

            .content {
                width: 100%;
                height: 100%;
            }
        }
    }
}

@media (max-width: 1300px) {
    .community {
        .main-content {
            padding: 0 16px;
        }
    }
}

@media (max-width: 768px) {
    .community {
        .main-content {
            .community-nav {
                display: none;
            }
        }
    }
}
</style>