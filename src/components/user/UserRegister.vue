<template>
    <div class="modal-overlay">
        <div class="user-register">
            <Message :messagePosition="'absolute'" ref="messageRef" />
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
                <form class="register-form">
                    <!-- 用户名 -->
                    <FormInput label="请输入您的用户名：" placeholder="🐧 用户名" v-model="registerFormData.username"
                        :message="usernameTipMessages" :pattern="usernamePattern"
                        @validate="validResults.username = $event" type="text" ref="usernameRef" />
                    <!-- 密码 -->
                    <FormInput label="请输入您账号的密码：" placeholder="🔐 登录密码" v-model="registerFormData.password"
                        :message="passwordTipMessages" :pattern="passowrdPattern"
                        @validate="validResults.password = $event" type="password" icon="icon-browse"
                        ref="passwordRef" />
                    <!-- 确认密码 -->
                    <FormInput label="请再次输入您账号的密码：" placeholder="🔏 确认登录密码" v-model="registerFormData.confirmPassword"
                        :message="confirmTipMessages" :validator="confirmValidator"
                        @validate="validResults.confirm = $event" type="password" icon="icon-browse"
                        ref="confirmPasswordRef" />
                </form>
            </div>
            <div class="register-footer">
                <div class="footer-submit">
                    <button @click="submitRegister">{{ registerText }}</button>
                </div>
            </div>
            <VerifyWindow @on-success="handleVerifySuccess" @on-close="isShowSliderCaptcha = false"
                v-if="isShowSliderCaptcha" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, watch, computed } from 'vue'
import FormInput from '../common/FormInput.vue'
import VerifyWindow from '../verifition/VerifyWindow.vue'
import { apis } from '@/api/api'
import Message from '../common/Message.vue'

const registerText = ref("注 册") // 注册按钮文本
const isShowSliderCaptcha = ref(false) // 是否显示滑块验证码
const usernameRef = ref(null) // 用户名输入框组件
const passwordRef = ref(null)//密码输入框组件
const confirmPasswordRef = ref(null) // 密码输入框组件
const messageRef = ref(null)


const emit = defineEmits(["auto-login", "close-register"])

// 用户名输入框提示文本
const usernameTipMessages = {
    prompt: "用户名要是6~20位字符，只能数字加字母哦",
    success: "用户名符合要求啦✅",
    error: "用户名不符合要求!❌"
}
// 密码输入框提示文本
const passwordTipMessages = {
    prompt: "密码要是8~16位，数字字母下划线哦",
    success: "密码符合要求啦✅",
    error: "密码不符合要求，重新设置一下吧!❌"
}
// 确认密码输入框提示文本
const confirmTipMessages = {
    prompt: "确认您的密码！",
    success: "密码确认成功✅",
    error: "两次输入的密码不一致!❌"
}

// 注册表单数据
const registerFormData = reactive({
    username: "",
    password: "",
    confirmPassword: ""
})

// 验证结果
const validResults = reactive({
    username: false,
    password: false,
    confirm: false
})



// 用户名校验规则
const usernamePattern = ref(new RegExp(/^[a-zA-Z0-9]{6,20}$/))
// 密码校验规则
const passowrdPattern = ref(new RegExp(/^[a-zA-Z0-9_]{8,16}$/))
// 确认密码校验规则
const confirmValidator = () => {
    return registerFormData.password === registerFormData.confirmPassword
}

// 滑块安全验证码校验成功
const handleVerifySuccess = (param) => {
    register(param.captchaVerification)
}

//关闭注册窗口
const closeRegister = () => {
    emit("close-register")
}

// 请求注册
const register = async (vcode) => {
    const { username, password } = registerFormData
    const data = {
        username: username,
        password: password,
        verifyCode: vcode
    }
    try {
        const resp = await apis.register(data)
        console.log("注册的响应结果：", resp);
        messageRef.value.show("注册成功啦🥰")
        setTimeout(() => {
            // 通知执行登录
            emit("auto-login", resp)
        }, 700)

    } catch (error) {
        if (error.code === 438) {
            usernameRef.value.setTip("用户名已存在！🫢")
            usernameRef.value.triggerTipBlink(true)
            return
        }
        messageRef.value.show(error.message)
    }
}


// 监听密码输入
watch(() => registerFormData.password, (newValue) => {
    if (!newValue || !registerFormData.confirmPassword) {
        return
    }
    confirmPasswordRef.value.validate(newValue)
}, { immediate: true })


// 是否所有输入项都校验成功
const allValid = computed(() => {
    return Object.values(validResults).every(Boolean)
})

// 提交注册
const submitRegister = () => {
    if (allValid.value) {
        isShowSliderCaptcha.value = true
    } else {
        blink()
        modifyRegisterText("请完善注册信息呀！😑")
    }
}

const blink = () => {
    if (!validResults.username && registerFormData.username)
        usernameRef.value.triggerTipBlink(true)
    if (!validResults.password && registerFormData.password)
        passwordRef.value.triggerTipBlink(true)
    if (!validResults.confirm && registerFormData.confirmPassword)
        confirmPasswordRef.value.triggerTipBlink(true)
}


// 修改注册按钮文本
const modifyRegisterText = (value) => {
    registerText.value = value
    setTimeout(() => {
        registerText.value = "注 册"
    }, 1500)
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/user/register.scss" as *;
</style>