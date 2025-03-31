<template>
    <div class="sidebar">
        <!-- 上半部分：头像和用户名 -->
        <div class="sidebar-top">
            <div class="user-info">
                <div class="avatar" @click="hanldeAvatarClick">
                    <img :src="userData.user.avatar" alt="User Avatar" />
                </div>
                <p class="username">{{ userData.user.name }}</p>
                <!-- <div class="login-button"><button><i class="iconfont icon-sign-out"></i></button></div> -->
                <div class="login-button"><button><i class="iconfont icon-tuichudenglu"></i></button></div>
            </div>
        </div>

        <div class="sidebar-middle"></div>

        <div class="sidebar-bottom">
            <router-link v-for="(item, index) in menuItems" :key="index" :to="item.link" class="menu-item"
                :title="item.name" :class="{ 'active': currentIndex === index }" @click="currentIndex = index">
                <div class="menu-icon"><span>{{ item.icon }}</span></div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/user';
const userData = userStore()
const currentIndex = ref(0)

// 菜单项数据
const menuItems = [
    { name: "人机客服🐔", icon: "🐻‍❄️", link: "/community/assistant" },
    { name: "意见反馈🐼", icon: "👻", link: "/community/feedback" },
    { name: "群聊论坛☠️", icon: "🐚", link: "/community/forum" },

];

//显示用户身份证卡片
const emit = defineEmits(["display-user-card", "display-dialog"])

//显示未登录对话框
const hanldeAvatarClick = () => {
    if (userData.token !== '') {
        emit("display-user-card")
    } else {
        emit("display-dialog")
    }
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/community/sidebar.scss" as *;
</style>