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
                <form class="register-form">
                    <!-- 用户名 -->
                    <FormInput label="请输入您的用户名：" placeholder="🐧 用户名" v-model="registerFormData.username"
                        @icon-click="registerFormData.username = ''" />
                    <!-- 设置密码 -->
                    <FormInput label="请输入您账号的密码：" placeholder="🔐 登录密码" v-model="registerFormData.password"
                        :type="showPassword ? 'text' : 'password'" icon="icon-browse"
                        autocomplete-text="current-password" @icon-click="showPassword = !showPassword"
                        :icon-active="showPassword ? 'active' : ''" />
                    <!-- 确认设置的密码 -->
                    <FormInput label="请再次输入您账号的密码：" placeholder="🔏 确认登录密码" v-model="registerFormData.confirmPassword"
                        :type="showConfirmPassword ? 'text' : 'password'" icon="icon-browse"
                        autocomplete-text="current-password" @icon-click="showConfirmPassword = !showConfirmPassword"
                        :icon-active="showConfirmPassword ? 'active' : ''" />
                </form>
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
import { ref, reactive } from 'vue'
import FormInput from '../common/FormInput.vue'
const registerText = ref("注 册")//注册按钮文本
const showPassword = ref(false)//是否显示输入的密码
const showConfirmPassword = ref(false)//是否显示输入的确认密码

//注册表单数据
const registerFormData = reactive({
    username: "",
    password: "",
    confirmPassword: ""
})

// 关闭注册窗口
const emit = defineEmits(["close-register"])
const closeRegister = () => {
    emit("close-register")
}

//提交注册
const submitRegister = () => {
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/register.scss" as *;
</style>
