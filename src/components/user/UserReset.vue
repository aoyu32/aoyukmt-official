<template>
    <div class="modal-overlay">
        <div class="user-reset">
            <div class="reset-header">
                <div class="header-left">
                    <h4>😉Hi,请重置密码</h4>
                </div>
                <div class="header-right">
                    <button class="close-button" @click="closeReset">
                        <i class="iconfont icon-close-bold"></i>
                    </button>
                </div>
            </div>
            <div class="reset-body">
                <div class="body-title">
                    <h2><span>AOYUKMT重置密码</span></h2>
                </div>
                <form class="reset-form">
                    <!-- 邮箱 -->
                    <FormInput placeholder="📧 请输入您的邮箱" v-model="resetFormData.email" :pattern="emailPattern"
                        :message="tipMessages.emailTipMessage" ref="emailRef" @validate="validResult.email = $event" />
                    <div class="form-verfiy-code">
                        <FormInput placeholder="🔑 请输入验证码" v-model="resetFormData.emailVerifyCode"
                            :pattern="vcodePattern" :message="tipMessages.vcodeTipMessage" ref="vcodeRef"
                            @validate="validResult.emailVerifyCode = $event" />
                        <button class="send-btn" @click="getCode" :disabled="isDisable">{{ vcodeBtnContext }}</button>
                    </div>

                    <!-- 新密码 -->
                    <FormInput type="password" placeholder="🔒 新密码" icon="icon-browse"
                        v-model="resetFormData.newPassword" :pattern="newPassowrdPattern"
                        :message="tipMessages.newTipMessages" ref="newPasswordRef"
                        @validate="validResult.newPassword = $event" />

                    <!-- 确认新密码 -->
                    <FormInput type="password" placeholder="🔐 确认新密码" icon="icon-browse"
                        v-model="resetFormData.confirmNewPassword" :validator="confirmValidator"
                        :message="tipMessages.confirmTipMessage" ref="confirmPasswordRef"
                        @validate="validResult.confirmNewPassword = $event" />

                </form>
            </div>
            <div class="reset-footer">
                <div class="footer-submit">
                    <button @click="submitReset">{{ resetButtonText }}</button>
                </div>
            </div>
        </div>
    </div>
    <VerifyWindow @on-success="handleVerifySuccess" @on-close="handleVerifyClose" v-if="isShowSliderCaptcha" />
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import FormInput from '../common/FormInput.vue'
import VerifyWindow from '../verifition/VerifyWindow.vue'
const isDisable = ref(false)
const emit = defineEmits(["close-reset"])


const isShowSliderCaptcha = ref(false)
const resetButtonText = ref("重置")
const vcodeBtnContext = ref("获取验证码")


//表单ref
const emailRef = ref(null)
const vcodeRef = ref(null)
const newPasswordRef = ref(null)
const confirmPasswordRef = ref(null)

//重置密码表单数据
const resetFormData = reactive({
    email: "",
    emailVerifyCode: "",
    newPassword: "",
    confirmNewPassword: ""
})

//表单校验规则
const emailPattern = ref(new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))//邮箱校验规则
const vcodePattern = ref(new RegExp(/^\d{6}$/))//验证码校验规则
const newPassowrdPattern = ref(new RegExp(/^[a-zA-Z0-9_]{8,16}$/))
const confirmValidator = () => {
    return resetFormData.newPassword === resetFormData.confirmNewPassword
}

//表单校验提示消息
const tipMessages = reactive({
    emailTipMessage: {
        prompt: "",
        success: "邮箱格式正确✅",
        error: "邮箱格式不正确❌"
    },

    vcodeTipMessage: {
        prompt: "",
        success: "",
        error: "请输入6位数字验证码❌"
    },
    // 密码输入框提示文本
    newTipMessages: {
        prompt: "",
        success: "密码符合要求啦✅",
        error: "密码要是8~16位，数字字母下划线哦❌"
    },
    // 确认密码输入框提示文本
    confirmTipMessage: {
        prompt: "",
        success: "密码确认成功✅",
        error: "两次输入的密码不一致!❌"
    }
})

//表单项校验结果
const validResult = reactive({
    email: false,
    emailVerifyCode: false,
    newPassword: false,
    confirmNewPassword: false
})

//监听输入密码
watch(() => resetFormData.newPassword, (newPassword) => {
    if (!newPassword || !resetFormData.confirmNewPassword) return
    confirmPasswordRef.value.validate()
})

const closeReset = () => {
    emit("close-reset")
}

//滑块验证码验证成功事件
const handleVerifySuccess = (param) => {
    const code = param.captchaVerification
    console.log(code);

}

//滑块验证关闭
const handleVerifyClose = () => {
    isShowSliderCaptcha.value = false
}

//校验表单项是不是都通过校验
const allValid = () => {
    return Object.values(validResult).every(Boolean)
}

//获取邮箱验证码
const getCode = (e) => {
    e.preventDefault()
    if (!validResult.email) {
        return
    }
    vcodeTimer("已发送", 60)
}

//提交表单
const submitReset = () => {
    if (!allValid()) {
        resetButtonText.value = "请完善重置信息！"
        setTimeout(() => {
            resetButtonText.value = "重置"
        }, 1500)
        return
    }
    isShowSliderCaptcha.value = true
}


//请求重置密码
const requestReset = () => {

}

//计时器
let timer = null
const vcodeTimer = (text, initialCount) => {
    isDisable.value = true;
    let count = initialCount;
    vcodeBtnContext.value = text ? `${text}(${count}s)` : `${count}s`;

    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        count--;
        vcodeBtnContext.value = text ? `${text}(${count}s)` : `${count}s`;

        if (count <= 0) {
            clearInterval(timer);
            isDisable.value = false;
            vcodeBtnContext.value = "获取验证码";
        }
    }, 1000);
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/reset.scss" as *;
</style>