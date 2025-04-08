<template>
    <div class="modal-overlay">
        <div class="user-register">
            <Message :messageContent="tipContext" :isShowMessage="showTipMessage" :messagePosition="'absolute'" />
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
                        @icon-click="registerFormData.username = ''" :tip-content="validationTips.username"
                        usernameTipBlink @blur="validateUsername" :blink="tipBlink.usernameTipBlink" />
                    <!-- 设置密码 -->
                    <FormInput label="请输入您账号的密码：" placeholder="🔐 登录密码" v-model="registerFormData.password"
                        :type="showPassword ? 'text' : 'password'" icon="icon-browse"
                        autocomplete-text="current-password" @icon-click="showPassword = !showPassword"
                        :icon-active="showPassword ? 'active' : ''" :tip-content="validationTips.password"
                        @blur="validatePassword" :blink="tipBlink.passwordTipBlink" />
                    <!-- 确认设置的密码 -->
                    <FormInput label="请再次输入您账号的密码：" placeholder="🔏 确认登录密码" v-model="registerFormData.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'" icon="icon-browse"
                        autocomplete-text="current-password" @icon-click="showConfirmPassword = !showConfirmPassword"
                        :icon-active="showConfirmPassword ? 'active' : ''" :tip-content="validationTips.confirmPassword"
                        @blur="validateConfirmPassword" :blink="tipBlink.confirmTipBlink" />
                </form>
            </div>
            <div class="register-footer">
                <div class="footer-submit">
                    <button @click="submitRegister">{{ registerText }}</button>
                </div>
            </div>
            <VerifyWindow @on-success="handleVerifySuccess" @on-close="handleCloseVerify" v-if="isShowSliderCaptcha" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import FormInput from '../common/FormInput.vue'
import VerifyWindow from '../verifition/VerifyWindow.vue'
import { apis } from '@/api/api'
import Message from '../common/Message.vue'

const registerText = ref("注 册")//注册按钮文本
const showPassword = ref(false)//是否显示输入的密码
const showConfirmPassword = ref(false)//是否显示输入的确认密码
const isShowSliderCaptcha = ref(false)//是否显示滑块验证码
const showTipMessage = ref(false)//是否显示提示消息
const tipContext = ref("")

//校验成功
const handleVerifySuccess = (param) => {
    isShowSliderCaptcha.value = false
    register(param.captchaVerification)
}


const register = async (vcode) => {
    const { username, password } = registerFormData
    const data = {
        username: username,
        password: password,
        verifyCode: vcode
    }
    try {
        const resp = await apis.register(data)
        console.log(resp);
        tipContext.value = "注册成功啦" + "🥰"
        showTipMessage.value = true
        setTimeout(() => {
            //关闭注册成功消息
            showTipMessage.value = false
            //通知执行登录
            emit("auto-login", resp)
            //关闭注册窗口
            closeRegister()
        }, 1000)
    } catch (error) {
        if (error.code === 438) {
            validationTips.username = "用户名已存在！🫢"
            tipBlink.usernameTipBlink = true
            return
        }
        tipContext.value = error.message + "🫢"
        showTipMessage.value = true
        setTimeout(() => {
            showTipMessage.value = false
        }, 1500)
    }
}


//关闭校验
const handleCloseVerify = () => {
    isShowSliderCaptcha.value = false
}

//提示文本闪烁
const tipBlink = reactive({
    usernameTipBlink: false,
    passwordTipBlink: false,
    confirmTipBlink: false
})

//注册表单数据
const registerFormData = reactive({
    username: "",
    password: "",
    confirmPassword: ""
})

// 验证结果和提示信息
const validationResults = reactive({
    username: false,
    password: false,
    confirmPassword: false
})

const validationTips = reactive({
    username: "用户名要是6~20位字符，只能数字加字母哦",
    password: "密码要是8~16位，数字字母下划线哦",
    confirmPassword: " 确认您的密码"
})

// 关闭注册窗口
const emit = defineEmits(["close-register", "auto-login"])
const closeRegister = () => {
    emit("close-register")
}

// 验证用户名
const validateUsername = () => {
    if (!registerFormData.username) {
        validationResults.username = false;
        validationTips.username = "用户名要是6~20位字符，只能数字加字母哦"
        tipBlink.usernameTipBlink = false
        return;
    }

    const isValid = /^[a-zA-Z0-9]{6,20}$/.test(registerFormData.username);
    validationResults.username = isValid;
    validationTips.username = isValid ? "用户名合法了✅" : "用户名不合法!❌";
}

// 验证密码
const validatePassword = () => {
    if (!registerFormData.password) {

        validationTips.password = "密码要是8~16位，数字字母下划线哦";
        validationResults.password = false;
        tipBlink.passwordTipBlink = false
        return;
    }

    const isValid = /^[a-zA-Z0-9_]{8,16}$/.test(registerFormData.password);
    validationResults.password = isValid;
    validationTips.password = isValid ? "密码符合要求啦✅" : "密码不符合要求，重新设置一下吧!❌";

    // 如果确认密码已填写，重新验证确认密码
    if (registerFormData.confirmPassword) {
        validateConfirmPassword();
    }
}

const blinkTip = () => {

    tipBlink.usernameTipBlink = validationResults.username ? false : true
    tipBlink.passwordTipBlink = validationResults.password ? false : true
    tipBlink.confirmTipBlink = validationResults.confirmPassword ? false : true
}

// 验证确认密码
const validateConfirmPassword = () => {
    if (!registerFormData.confirmPassword) {
        validationTips.confirmPassword = "确认您的密码！";
        validationResults.confirmPassword = false;
        tipBlink.confirmTipBlink = false
        return;
    }

    const isValid = registerFormData.confirmPassword === registerFormData.password;
    validationResults.confirmPassword = isValid;
    validationTips.confirmPassword = isValid ? "密码确认成功✅" : "两次输入的密码不一致!❌";
}

// 监听值变化进行实时验证
watch(() => registerFormData.username, (newVal) => {
    if (!newVal)
        validateUsername()
    // 可以添加防抖处理
    const debounceTimer = setTimeout(() => {
        validateUsername();
        tipBlink.usernameTipBlink = false
    }, 500);
    return () => clearTimeout(debounceTimer);
})

watch(() => registerFormData.password, (newVal) => {
    if (newVal) {
        const debounceTimer = setTimeout(() => {
            validatePassword();
        }, 500);
        return () => clearTimeout(debounceTimer);
    }
})

watch(() => registerFormData.confirmPassword, (newVal) => {
    if (!newVal)
        return
    if (newVal) {
        const debounceTimer = setTimeout(() => {
            validateConfirmPassword();
        }, 500);
        return () => clearTimeout(debounceTimer);
    }
})

//提交注册
const submitRegister = () => {
    // 提交前验证所有字段
    validateUsername();
    validatePassword();
    validateConfirmPassword();

    // 检查是否所有验证都通过
    const allValid = validationResults.username &&
        validationResults.password &&
        validationResults.confirmPassword;

    if (allValid) {
        //开启人机校验
        isShowSliderCaptcha.value = true
    } else {
        blinkTip()
        modifyRegisterText("请完善注册信息呀！😑")
    }
}

//修改注册按钮文本
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
