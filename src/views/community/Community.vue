<template>
    <div class="community">
        <button class="sidebar-toggle" :class="{ 'rotated': isShowNav }" @click="toggleNav">
            <i class="iconfont icon-arrow-right-bold"></i>
        </button>
        <div class="main-content">
            <div class="community-nav" :class="{ 'show': isShowNav }">
                <!-- 导航栏 -->
                <div class="nav" :style="{ 'height': navHeight, 'border-radius': navBorderRadius }">
                    <CommunitySidebar @display-user-card="isDispalyUserCard = true"
                        @display-dialog="handleDisplayDialog" @display-login="isDisplayLogin = true" @logout="logout" />
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
            <UserIDCard @close-user-card="isDisplayUserCard = false" v-if="isDisplayUserCard" />
        </div>
        <div class="dialog" v-if="isDisplayDialog">
            <CommunityDialog @close-dialog="isDisplayDialog = false" @dialog-submit="handleDialogSubmit"
                :config="dialog" />
        </div>
        <div class="user-login" v-if="isDisplayLogin">
            <UserLogin @close-login="isDisplayLogin = false" @display-register="isDisplayRegister = true"
                @display-reset="isDisplayReset = true" @user-login="handleUserLogin" />
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
import CommunityDialog from '@/components/community/CommunityDialog.vue';
import UserLogin from '@/components/user/UserLogin.vue';
import UserRegister from '@/components/user/UserRegister.vue';
import UserReset from '@/components/user/UserReset.vue';
import { apis } from '@/api/api';
const userDataStore = userStore()


const loginDialog = {
    icon: '☺️',
    title: "📌 登录提示",
    content: "抱歉！您还未登录，麻烦您先登录或注册！",
    cancel: "我先再逛逛",
    submit: "我要登录/注册",
    event: "login"
}

const logoutDialog = {
    icon: '😶',
    title: "📌 退出登录",
    content: "你确定要退出登录吗？",
    cancel: "我不退出了",
    submit: "确定退出登录",
    event: "logout"
}


const dialog = ref(loginDialog)//对话框配置
const isDisplayDialog = ref(false)//是否显示对话框
const isDisplayUserCard = ref(false)//是否显示用户卡片
const isDisplayRegister = ref(false)//是否显示注册窗口
const isDisplayLogin = ref(false)//是否显示登录窗口
const isDisplayReset = ref(false)//是否显示重置密码窗口
const isDispalyUserCard = ref(false)//是否显示用户卡片

//监听登录和退出登录按钮点击事件
const handleDisplayDialog = () => {
    dialog.value = loginDialog
    isDisplayDialog.value = true
}

//监听是否点击对话框确认按钮
const handleDialogSubmit = (event) => {
    if (event === 'login') {
        //显示登录窗口
        isDisplayLogin.value = true
    }

    if (event === 'logout') {
        //退出登录操作
        //清除token
        userDataStore.clearToken()
        //清除用户数据
        userDataStore.clearUserData()
    }
    isDisplayDialog.value = false
}

//退出登录操作
const logout = () => {
    isDisplayDialog.value = true
    dialog.value = logoutDialog
}

//监听用户登录
const handleUserLogin = (resp) => {
    //关闭登录窗口
    isDisplayLogin.value = false
    //设置登录
    userDataStore.setToken(resp.token)
    //设置用户信息
    userDataStore.setUser(resp.userData)
}

onMounted(() => {
    console.log("是否登录：", userDataStore.hasLogin);
    console.log("是否有用户数据", !userDataStore.isUserInfoEmpty);
    if (!userDataStore.hasLogin || !userDataStore.isUserInfoEmpty)
        return
    //请求获取用户信息
    requestUserInfo()
})

//监听开始自动登录
const handleAutoLogin = async (data) => {
    isDisplayLogin.value = false
    //持久化token
    userDataStore.setToken(data)
    requestUserInfo()
}

//请求获取用户信息
const requestUserInfo = async () => {
    try {
        const resp = await apis.getUserInfo()
        //设置用户信息
        userDataStore.setUser(resp)
    } catch (error) {
        console.log(error.message);
    }
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