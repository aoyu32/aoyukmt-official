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
                    <FormInput label="请输入您的账号：" placeholder="🐧 用户名/邮箱" v-model="loginFormData.account"
                        @icon-click="loginFormData.account = ''" />
                    <FormInput label="请输入您账号的密码：" placeholder="🔐 登录密码" v-model="loginFormData.password"
                        :type="showPassword ? 'text' : 'password'" icon="icon-browse"
                        autocomplete-text="current-password" @icon-click="showPassword = !showPassword"
                        :icon-active="showPassword ? 'active' : ''" />
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
    <div class="aj-captcha" v-if="isShowSliderCaptcha">
        <Verify @success="success" :mode="'fixed'" :captchaType="'blockPuzzle'"
            :imgSize="{ width: '330px', height: '155px' }"></Verify>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import FormInput from '../common/FormInput.vue';
import Verify from '../verifition/Verify.vue';
const loginText = ref("登录")
const isShowSliderCaptcha = ref(false)
const showPassword = ref(false)

const success = (param)=>{
    console.log(param);
    
}

//表单数据
const loginFormData = reactive({
    account: "",
    password: ""
})

const submitLogin = () => {

    const errorMessage =
        !loginFormData.account && !loginFormData.password
            ? "请输入账号和密码!😑"
            : !loginFormData.account
                ? "账号不能为空!😑"
                : !loginFormData.password
                    ? "请输入密码!😑"
                    : "";

    if (errorMessage) {
        modifyLoginText(errorMessage);
        return;
    }

    isShowSliderCaptcha.value = true

};

const modifyLoginText = (value) => {
    loginText.value = value
    setTimeout(() => {
        loginText.value = "登 录"
    }, 1500)
}



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