<template>
    <div class="modal-overlay">
        <div class="user-login">
            <div class="login-header">
                <div class="header-left">
                    <h4>☺️Hi，欢迎登录呀</h4>
                </div>
                <button class="close-button" @click="closeLogin">
                    <i class="iconfont icon-close-bold"></i>
                </button>
            </div>
            <div class="login-body">
                <div class="body-title">
                    <h2><span>AOYUKMT交流中心</span></h2>
                </div>
                <form class="login-form">
                    <div class="form-group">
                        <label class="form-label">请输入您的账号:</label>
                        <div class="input-wrapper">
                            <input type="text" placeholder="🐧 用户名/邮箱" v-model="userData.userLoginForm.account">
                            <i class="iconfont icon-close clear-icon" @click="account = ''"></i>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">请输入您账号的密码：</label>
                        <div class="input-wrapper">
                            <input :type="sowPassword ? 'text' : 'password'" placeholder="🔐 登录密码"
                                v-model="userData.userLoginForm.password">
                            <i class="iconfont icon-browse password-icon" :class="{ 'active': showPassword }"
                                @click="showPassword = !showPassword"></i>
                        </div>

                    </div>
                    <SliderCaptcha />
                </form>
            </div>
            <div class="login-footer">
                <button class="submit-button" @click="submitLogin">{{ loginText }}</button>
                <div class="footer-links">
                    <button class="link-button" @click="toRegister">🤓我要去注册账号</button>
                    <button class="link-button" @click="toResetPassword">😠我的密码忘记了</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { userStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import SliderCaptcha from '../common/SliderCaptcha.vue';
const userData = userStore()
const account = ref('');
const password = ref('');
const showPassword = ref(false);
const loginText = ref("登录")



const submitLogin = () => {
    console.log("表单提交成功！");
};


//关闭登录窗口
const emit = defineEmits(["close-login", "display-register", "display-reset"])
const closeLogin = () => {
    emit("close-login")
}

//去注册点击事件
const toRegister = () => {
    emit("display-register")
}

//忘记密码点击事件
const toResetPassword = () => {
    emit("display-reset")
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/login.scss" as *;
</style>