<template>
    <div class="modal-overlay">
        <div class="user-id-card">
            <!-- 用户身份证头部 -->
            <div class="card-header">
                <!-- 头部左边 -->
                <div class="header-left">
                    <h3>🍪 用户身份证</h3>
                </div>
                <!-- 头部右边 -->
                <div class="header-right">
                    <button class="close-btn" @click="closeUserCard">
                        <i class="iconfont icon-close"></i>
                    </button>
                </div>
            </div>
            <!-- 用户身份证身体 -->
            <div class="card-body">
                <!-- 身体左边内容区域 -->
                <div class="body-left-content">
                    <div class="username-box">
                        <div class="name-lable">
                            <span>🐬 用户名</span>
                        </div>
                        <div class="username">
                            <span>{{ userData.name }}</span>
                        </div>
                    </div>
                    <div class="sex-box">
                        <div class="sex-lable">
                            <span>🦆 性别</span>
                        </div>
                        <div class="sex">
                            <span>{{ userData.sex }}</span>
                        </div>

                    </div>
                    <div class="create-time-box">
                        <div class="create-time-lable">
                            <span>⏳ 注册日期</span>
                        </div>
                        <div class="create-time">
                            <span>{{ userData.createTime }}</span>
                        </div>
                    </div>
                    <div class="resume-box">
                        <div class="resume-lable">
                            <span>🏅 个人简述</span>
                        </div>
                        <div class="resume">
                            <p>{{ userData.resume }}</p>
                        </div>
                    </div>
                </div>
                <!-- 身体右边头像区域 -->
                <div class="body-right-avatar">
                    <div class="avatar">
                        <img :src="userData.avatar" alt="">
                    </div>
                </div>
            </div>
            <!-- 用户身份证脚 -->
            <div class="card-footer">
                <div class="user-id-box">
                    <div class="user-id-lable">
                        🧬 我绑定的邮箱
                    </div>
                    <div class="user-id">
                        <!-- {{ userData.id }} -->
                        <!-- aoyu3399@gmail.com -->
                        未绑定
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'
const props = defineProps({
    userData: {
        type: Object,
    }
})

//关闭用户信息卡片
const emit = defineEmits(["close-user-card"])
const closeUserCard = () => {
    emit("close-user-card")
}

</script>
<style scoped lang="scss">
@use "@/assets/styles/user/card.scss" as *;
</style>