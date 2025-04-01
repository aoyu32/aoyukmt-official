<template>
    <div class="modal-overlay">
        <div class="user-register">
            <div class="register-header">
                <div class="header-left">
                    <h4>😉Hi，感谢注册呀</h4>
                </div>
                <div class="header-right">
                    <button class="close-button" @click="closeRegister">
                        <i class="iconfont icon-close-bold"></i>
                    </button>
                </div>
            </div>
            <div class="register-body">
                <div class="body-title">
                    <h2><span>AOYUKMT注册账户</span></h2>
                </div>
                <div class="body-form">
                    <form action="register-form">
                        <div class="form-group form-username">
                            <div class="form-label">
                                <label>请输入您的用户名:</label>
                            </div>
                            <div class="form-input">
                                <div class="input-wrapper">
                                    <input type="text" placeholder="🐧 用户名/邮箱" v-model="username"
                                        @blur="handleUsernameBlur">

                                    <i class="iconfont icon-close clear-icon" @click="username = ''"></i>
                                </div>
                                <div class="form-tip" :class="{ 'blink-name': isShowUsernameWarn }">
                                    <p>{{ usernameTip }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-password">
                            <div class="form-label">
                                <label>请输入您账号的密码：</label>
                            </div>
                            <div class="form-input">
                                <div class="input-wrapper">
                                    <input :type="showPassword ? 'text' : 'password'" placeholder="🔐 登录密码"
                                        @blur="handlePasswordBlur" v-model="password">
                                    <i class="iconfont icon-browse password-icon" :class="{ 'active': showPassword }"
                                        @click=" showPassword = !showPassword"></i>
                                </div>
                                <div class="form-tip" :class="{ 'blink-name': isShowPasswordWarn }">
                                    <p>{{ passwordTip }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-reset-password">
                            <div class="form-label">
                                <label>请再次输入您账号的密码：</label>
                            </div>
                            <div class="form-input">
                                <div class="input-wrapper">
                                    <input :type="showResetPassword ? 'text' : 'password'" placeholder="🔏 确认登录密码"
                                        v-model="resetPassword" @blur="handleResetPasswordBlur">



                                    <i class="iconfont icon-browse password-icon"
                                        :class="{ 'active': showResetPassword }"
                                        @click=" showResetPassword = !showResetPassword"></i>
                                </div>
                                <div class="form-tip error-tip" :class="{ 'show': isShowResetWarn }">
                                    <p>两次密码不一致!😑</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="register-footer">
                <div class="footer-submit">
                    <button @click="submitRegister">{{ registerText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const registerText = ref("注 册")
const username = ref("") // 用户名
const password = ref("") // 密码
const resetPassword = ref("") // 重置密码
const showPassword = ref(false) // 是否显示密码
const showResetPassword = ref(false) // 是否显示确认密码
const isShowUsernameWarn = ref(false)//用户名是否校验通过
const isShowPasswordWarn = ref(false)//密码是否校验通过
const isShowResetWarn = ref(false) // 确认密码校验是否通过
const usernameTip = ref("用户名6~20个字符，字母数字下划线哦🙂")
const passwordTip = ref("密码要是8~16位，数字加字母组合哈🙂")

// 关闭注册窗口
const emit = defineEmits(["close-register"])
const closeRegister = () => {
    emit("close-register")
}

// 用户输入校验
const handleUsernameBlur = () => {
    if (username.value === '') {
        isShowUsernameWarn.value = false
        usernameTip.value = "用户名6~20个字符，字母数字下划线哦🙂"
        return
    }
    if (/^[a-zA-Z][a-zA-Z0-9_.]{5,19}$/.test(username.value) && username.value) {
        // 用户名验证通过
        isShowUsernameWarn.value = false
        usernameTip.value = "用户名符号要求啦😃"
    } else {
        isShowUsernameWarn.value = true
        usernameTip.value = "你的用户名不符合要求，换一个吧！🙁"
    }
}

const handlePasswordBlur = () => {
    if (password.value === '') {
        isShowPasswordWarn.value = false
        passwordTip.value = "密码要是8~16位，数字加字母组合哈🙂"
        return
    }
    if (/^(?=.*[A-Za-z])(?=.*\d|.*[^A-Za-z\d]).{8,16}$/.test(password.value)) {
        // 密码验证通过
        isShowPasswordWarn.value = false
        passwordTip.value = "密码符号要求啦😄"
    } else {
        isShowPasswordWarn.value = true
        passwordTip.value = "你的密码不符合要求，重新设置一个吧！🤭"
    }
    if (resetPassword.value !== '') {
        handleResetPasswordBlur()
    }
}

const handleResetPasswordBlur = () => {
    if (resetPassword.value === '') {
        isShowResetWarn.value = false
        return
    }
    isShowResetWarn.value = password.value !== resetPassword.value
}

//提交注册
const submitRegister = () => {
    if (!isShowPasswordWarn.value && !isShowResetWarn.value && !isShowPasswordWarn.value) {
        registerText.value = "请填写合规的数据！😡"
        setTimeout(() => {
            registerText.value = "注册"
        }, 1500)
        return
    }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/register.scss" as *;
</style>
