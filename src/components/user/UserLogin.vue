<template>
    <div class="modal-overlay">
        <div class="user-login">
            <div class="login-header">
                <div class="header-left">
                    <h4>☺️Hi，欢迎登录呀</h4>
                </div>
                <div class="header-right">
                    <button class="close-button" @click="closeLogin">
                        <i class="iconfont icon-close-bold"></i>
                    </button>
                </div>
            </div>
            <div class="login-body">
                <div class="body-title">
                    <h2><span>AOYUKMT交流中心</span></h2>
                </div>
                <div class="body-form">
                    <form action="login-form">
                        <div class="form-account">
                            <div class="account-label">
                                <label>请输入您的账号:</label>
                            </div>
                            <div class="account-input">
                                <input type="text" placeholder="🐧 用户名/邮箱" v-model="account">
                                <i class="iconfont icon-close clear-icon" @click="account = ''"></i>
                            </div>
                        </div>
                        <div class="form-password">
                            <div class="password-label">
                                <label>请输入您账号的密码：</label>
                            </div>
                            <div class="password-input">
                                <input :type="showPassword ? 'text' : 'password'" placeholder="🔐 登录密码"
                                    v-model="password">
                                <i class="iconfont icon-browse password-icon" @click="showPassword = !showPassword"></i>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="login-footer">
                <div class="footer-submit">
                    <button>登录</button>
                </div>
                <div class="footer-register-reset">
                    <div class="register">
                        <button>🤓我要去注册账号</button>
                    </div>
                    <div class="reset">
                        <button>😠我的密码忘记了</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const account = ref('');
const password = ref('');
const showPassword = ref(false);

//关闭登录窗口
const emit = defineEmits(["close-login"])
const closeLogin = ()=>{
    emit("close-login")
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/login.scss" as *;
</style>