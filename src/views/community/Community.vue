<template>
    <div class="community">
        <button class="sidebar-toggle" :class="{ 'rotated': isShowNav }" @click="toggleNav">
            <i class="iconfont icon-arrow-right-bold"></i>
        </button>
        <div class="main-content">
            <div class="community-nav" :class="{ 'show': isShowNav }">
                <!-- 导航栏 -->
                <div class="nav" :style="{ 'height': navHeight, 'border-radius': navBorderRadius }">
                    <CommunitySidebar @display-user-card="isDisplayLogin = true" @display-dialog="isShowDialog = true"
                        @display-login="isDisplayLogin = true" />
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
            <UserIDCard :userData="user" @close-user-card="isDisplayUserCard = false" v-if="isDisplayUserCard" />
        </div>
        <div class="dialog" v-if="isShowDialog">
            <CommunityDialog @close-dialog="isShowDialog = false" @dialog-submit="handleDialogSubmit"
                :title="dialogTitle" :content="dialogContent" :cancel-btn="dialogCancelBtn"
                :submit-btn="dialogSubmitBtn" />
        </div>
        <div class="user-login" v-if="isDisplayLogin">
            <UserLogin @close-login="isDisplayLogin = false" @display-register="isDisplayRegister = true"
                @display-reset="isDisplayReset = true" />
        </div>
        <div class="user-register" v-if="isDisplayRegister">
            <UserRegister @close-register="isDisplayRegister = false" @auto-login="handleAutoLogin" />
        </div>
        <div class="user-reset" v-if="isDisplayReset">
            <UserReset @close-reset="isDisplayReset = false" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import CommunitySidebar from '@/components/community/CommunitySidebar.vue';
import { useRoute } from 'vue-router';
import UserIDCard from '@/components/user/UserIDCard.vue';
import { userStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import CommunityDialog from '@/components/community/CommunityDialog.vue';
import UserLogin from '@/components/user/UserLogin.vue';
import UserRegister from '@/components/user/UserRegister.vue';
import UserReset from '@/components/user/UserReset.vue';
const userDataStore = userStore()


//显示对话框
const dialogTitle = ref("📌 登录提示")
const dialogContent = ref("抱歉！您还未登录，麻烦您先登录或注册！")
const dialogCancelBtn = ref("我先再逛逛")
const dialogSubmitBtn = ref("我要登录/注册")
const isShowDialog = ref(false)//是否显示对话框
const isDisplayUserCard = ref(false)//是否显示用户卡片
const isDisplayRegister = ref(false)//是否显示注册窗口
const isDisplayLogin = ref(false)//是否显示登录窗口
const isDisplayReset = ref(false)//是否显示重置密码窗口


//监听是否点击对话框确认按钮
const handleDialogSubmit = () => {
    isDisplayLogin.value = true
    isShowDialog.value = false
}

//监听开始自动登录
const handleAutoLogin = (resp) => {
    isDisplayLogin.value = false
    const { token, ...userInfo } = resp
    //持久化token
    userDataStore.setToken(token)
    //设置用户信息
    userDataStore.setUser(userInfo)

}

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