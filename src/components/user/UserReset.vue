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
                <div class="body-form">
                    <form>
                        <div class="form-group form-email">
                            <div class="form-input">
                                <div class="input-wrapper">
                                    <input type="text" placeholder="📧 邮箱" v-model="email">
                                    <i class="iconfont icon-close clear-icon" @click="email = ''"></i>
                                </div>
                                <div class="form-tip">
                                    <p>邮箱不存在！</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-verification">
                            <div class="form-input">
                                <div class="input-btn">
                                    <div class="input-wrapper">
                                        <input placeholder="🛡️ 验证码" v-model="verificationCode">
                                        <i class="iconfont icon-close clear-icon" @click="verificationCode = ''"></i>
                                    </div>
                                    <button class="send-btn">获取验证码</button>
                                </div>
                                <div class="form-tip">
                                    <p>验证码错误！</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-new-password">
                            <div class="form-input">
                                <div class="input-wrapper">
                                    <input :type="showNewPassword ? 'text' : 'password'" placeholder="🔐 新密码"
                                        v-model="newPassword">
                                    <i class="iconfont icon-browse password-icon"></i>
                                </div>
                                <div class="form-tip">
                                    <p>密码需8-16位，包含字母和数字</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-group form-confirm-password">
                            <div class="form-input">
                                <div class="input-wrapper">
                                    <input type='password' placeholder="🔏 确认密码">
                                    <i class="iconfont icon-browse password-icon"></i>
                                </div>
                                <div class="form-tip">
                                    <p>两次密码不一致！</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="reset-footer">
                <div class="footer-submit">
                    <button>重 置</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
//关闭重置密码窗口
const emti = defineEmits(["close-reset"])
const closeReset = () => {
    emti("close-reset")
}

</script>
<style lang="scss" scoped>
@use "@/assets/styles/user/reset.scss" as *;
</style>