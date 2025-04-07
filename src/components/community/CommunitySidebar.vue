<template>
    <div class="sidebar">
        <!-- 上半部分：头像和用户名 -->
        <div class="sidebar-top">
            <div class="user-info">
                <div class="avatar" @click="hanldeAvatarClick">
                    <img :src="userData.user.avatar" alt="User Avatar" />
                </div>
                <p class="username">{{ userData.user.nickname }}</p>
                <div class="login-button" @click="handleLoginButton"><button><i class="iconfont" :class="iconClass"
                            :tip="isLogin ? '退出登录' : '点击登录'"></i></button></div>
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
import { ref, onMounted, computed, watch } from 'vue'
import { userStore } from '@/stores/user';
const userData = userStore()
const currentIndex = ref(0)

// 菜单项数据
const menuItems = [
    { name: "人机客服🐔", icon: "🐻‍❄️", link: "/community/assistant" },
    { name: "意见反馈🐼", icon: "👻", link: "/community/feedback" },
    { name: "群聊论坛☠️", icon: "🐚", link: "/community/forum" },

];

//登录按钮
const iconClass = computed(() =>
    isLogin.value ? 'icon-tuichudenglu' : 'icon-denglu12'
);

//是否已登录
const isLogin = ref(false)
onMounted(() => {
    if (userData.token !== '') {
        isLogin.value = true
    } else {
        isLogin.value = false
    }
})

//显示用户身份证卡片
const emit = defineEmits(["display-user-card", "display-dialog", "display-login"])

//显示未登录对话框
const hanldeAvatarClick = () => {
    if (isLogin.value) {
        emit("display-user-card")
    } else {
        emit("display-dialog")
    }
}

watch(() => userData.token, (newVal) => {
    console.log('Token 变化:', newVal)
    isLogin.value = newVal != null && newVal !== ''
}, { immediate: true })

//去登录按钮
const handleLoginButton = () => {
    emit("display-login")
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/community/sidebar.scss" as *;
</style>