<template>
    <div class="community">
        <button class="sidebar-toggle" :class="{ 'rotated': isShowNav }" @click="toggleNav">
            <i class="iconfont icon-arrow-right-bold"></i>
        </button>
        <div class="main-content">
            <div class="community-nav" :class="{ 'show': isShowNav }">
                <!-- 导航栏 -->
                <div class="nav" :style="{ 'height': navHeight, 'border-radius': navBorderRadius }">
                    <CommunitySidebar @display-user-card="isDisplay = true" />
                </div>
            </div>
            <!-- 界面 -->
            <div class="community-content">
                <!-- Content -->
                <div class="content">
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
        <div class="user-info-card">
            <UserIDCard :userData="user" @close-user-card="isDisplay = false" v-if="isDisplay" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import CommunitySidebar from '@/components/community/CommunitySidebar.vue';
import { useRoute } from 'vue-router';
import UserIDCard from '@/components/community/UserIDCard.vue';
import { userStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const userData = userStore()
const { user } = storeToRefs(userData)

//显示用户信息卡
const isDisplay = ref(false)
onMounted(() => {
    console.log(user);
})

//控制侧边栏高度
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

//控制显示隐藏导航栏
const isShowNav = ref(false)
const toggleNav = () => {
    isShowNav.value = !isShowNav.value


}



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
    position: relative;

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
            // display: none;
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
        .sidebar-toggle {
            display: block;
        }

        .main-content {
            .community-nav {
                display: none;
            }

            .show {
                display: flex;
                width: 55px;
            }

        }


    }


}

.sidebar-toggle {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    background-color: transparent;
    border: none;
    color: $theme-primary;
    cursor: pointer;

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
</style>