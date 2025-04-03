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
                    <FormInput placeholder="📧 请输入您的邮箱" v-model="resetFormData.email"
                        @icon-click="resetFormData.email = ''" :tip-content="validationTips.email"
                        @blur="validateEmail" />

                    <div class="form-verfiy-code">
                        <!-- 六位验证码 -->
                        <FormInput placeholder="🔑 请输入验证码" v-model="resetFormData.verifyCode"
                            @icon-click="resetFormData.verifyCode = ''" :tip-content="validationTips.verifyCode"
                            @blur="validateVerifyCode" />
                        <button class="send-btn" @click.prevent="sendVerifyCode" :disabled="isSending">
                            {{ sendButtonText }}
                        </button>
                    </div>

                    <!-- 新密码 -->
                    <FormInput placeholder="🔐 请输入新密码" v-model="resetFormData.newPassword"
                        :type="showNewPassword ? 'text' : 'password'" icon="icon-browse"
                        autocomplete-text="new-password" @icon-click="showNewPassword = !showNewPassword"
                        :icon-active="showNewPassword ? 'active' : ''" :tip-content="validationTips.newPassword"
                        @blur="validateNewPassword" />

                    <!-- 确认新密码 -->
                    <FormInput placeholder="🔏 请确认新密码" v-model="resetFormData.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'" icon="icon-browse"
                        autocomplete-text="new-password" @icon-click="showConfirmPassword = !showConfirmPassword"
                        :icon-active="showConfirmPassword ? 'active' : ''" :tip-content="validationTips.confirmPassword"
                        @blur="validateConfirmPassword" />
                </form>
            </div>
            <div class="reset-footer">
                <div class="footer-submit">
                    <button @click="submitReset">{{ resetText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import FormInput from '../common/FormInput.vue'

const showNewPassword = ref(false) // 是否显示新密码
const showConfirmPassword = ref(false) // 是否显示确认密码
const resetText = ref("重 置")//注册按钮文本

// 验证码发送状态
const isSending = ref(false)
const countdown = ref(0)
const sendButtonText = ref("获取验证码")

// 重置密码表单数据
const resetFormData = reactive({
    email: "",
    verifyCode: "",
    newPassword: "",
    confirmPassword: ""
})

// 验证结果和提示信息
const validationResults = reactive({
    email: false,
    verifyCode: false,
    newPassword: false,
    confirmPassword: false
})

const validationTips = reactive({
    email: "",
    verifyCode: "",
    newPassword: "",
    confirmPassword: ""
})

// 关闭重置密码窗口
const emit = defineEmits(["close-reset"])
const closeReset = () => {
    emit("close-reset")
}

// 验证邮箱
const validateEmail = () => {
    if (!resetFormData.email) {
        validationResults.email = false;
        validationTips.email = "";
        return;
    }

    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(resetFormData.email);
    validationResults.email = isValid;
    validationTips.email = isValid ? "邮箱格式正确" : "邮箱格式不正确！";
}

// 验证验证码
const validateVerifyCode = () => {
    if (!resetFormData.verifyCode) {
        validationResults.verifyCode = false;
        validationTips.verifyCode = "";
        return;
    }

    const isValid = /^\d{6}$/.test(resetFormData.verifyCode);
    validationResults.verifyCode = isValid;
    validationTips.verifyCode = isValid ? "验证码格式正确" : "验证码必须是6位数字！";
}

// 验证新密码
const validateNewPassword = () => {
    if (!resetFormData.newPassword) {
        validationTips.newPassword = "";
        validationResults.newPassword = false;
        return;
    }

    const isValid = /^[a-zA-Z0-9_]{8,16}$/.test(resetFormData.newPassword);
    validationResults.newPassword = isValid;
    validationTips.newPassword = isValid ? "密码格式正确" : "密码不符合要求，需要8~16位数字、字母或下划线！";

    // 如果确认密码已填写，重新验证确认密码
    if (resetFormData.confirmPassword) {
        validateConfirmPassword();
    }
}

// 验证确认密码
const validateConfirmPassword = () => {
    if (!resetFormData.confirmPassword) {
        validationTips.confirmPassword = "";
        validationResults.confirmPassword = false;
        return;
    }

    const isValid = resetFormData.confirmPassword === resetFormData.newPassword;
    validationResults.confirmPassword = isValid;
    validationTips.confirmPassword = isValid ? "两次密码输入一致" : "两次输入的密码不一致";
}

// 监听值变化进行实时验证
watch(() => resetFormData.email, (newVal) => {
    if (!newVal)
        validateEmail()
    // 可以添加防抖处理
    const debounceTimer = setTimeout(() => {
        validateEmail();
    }, 500);
    return () => clearTimeout(debounceTimer);
})

watch(() => resetFormData.verifyCode, (newVal) => {
    if (!newVal)
        validateVerifyCode()
    const debounceTimer = setTimeout(() => {
        validateVerifyCode();
    }, 500);
    return () => clearTimeout(debounceTimer);
})

watch(() => resetFormData.newPassword, (newVal) => {
    if (newVal) {
        const debounceTimer = setTimeout(() => {
            validateNewPassword();
        }, 500);
        return () => clearTimeout(debounceTimer);
    }
})

watch(() => resetFormData.confirmPassword, (newVal) => {
    if (newVal) {
        const debounceTimer = setTimeout(() => {
            validateConfirmPassword();
        }, 500);
        return () => clearTimeout(debounceTimer);
    }
})

// 发送验证码
const sendVerifyCode = () => {
    // 先验证邮箱
    validateEmail();
    if (!validationResults.email) {
        return;
    }

    // 防止重复发送
    if (isSending.value) return;

    // 实际应用中这里应该调用API发送验证码
    isSending.value = true;
    countdown.value = 60;

    // 倒计时
    const timer = setInterval(() => {
        countdown.value--;
        sendButtonText.value = `${countdown.value}秒后重发`;

        if (countdown.value <= 0) {
            clearInterval(timer);
            isSending.value = false;
            sendButtonText.value = "获取验证码";
        }
    }, 1000);

    // 模拟API调用
    console.log(`向 ${resetFormData.email} 发送验证码`);
}

// 提交重置密码
const submitReset = () => {
    // 提交前验证所有字段
    validateEmail();
    validateVerifyCode();
    validateNewPassword();
    validateConfirmPassword();

    // 检查是否所有验证都通过
    const allValid = validationResults.email &&
        validationResults.verifyCode &&
        validationResults.newPassword &&
        validationResults.confirmPassword;

    if (allValid) {
        // 显示滑块验证
        console.log("验证通过，准备重置密码");
    } else {
        resetText.value = "请完善重置信息!😑"
        setTimeout(()=>{
            resetText.value = "重 置"
        },1500)
    }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/reset.scss" as *;
</style>